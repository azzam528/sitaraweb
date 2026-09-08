import { defineStore } from 'pinia';
import notificationService from '@/services/notification.service';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    loading: false,
    error: null,
    // Coordinated Polling Event Triggers
    lastRefillEvent: 0,
    lastVideoEvent: 0,
    lastComplaintEvent: 0,
    // Track known notification IDs to detect brand new items
    knownNotificationIds: new Set(),
    isInitialLoad: true,
    // Concurrency guard for polling
    isFetching: false,
    // Track recently arrived entity IDs for visual feedback
    newEntityIds: {
      refill: new Set(),
      video: new Set(),
      complaint: new Set(),
    },
  }),

  getters: {
    unreadCount: (state) => {
      return state.notifications.filter((n) => !n.is_read).length;
    },
    unreadNotifications: (state) => {
      return state.notifications.filter((n) => !n.is_read);
    },
    isNewEntity: (state) => (type, id) => {
      return state.newEntityIds[type]?.has(id) || false;
    },
  },

  actions: {
    async fetchNotifications() {
      const token = localStorage.getItem('sitara_token');
      if (!token) {
        this.notifications = [];
        this.knownNotificationIds.clear();
        this.isInitialLoad = true;
        return;
      }

      // Concurrency guard: avoid overlapping network requests
      if (this.isFetching) {
        return;
      }
      this.isFetching = true;

      // Only show global loading spinner on initial fetch, not during background polling
      if (this.isInitialLoad) {
        this.loading = true;
      }
      this.error = null;

      try {
        const response = await notificationService.getAll();
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        if (this.isInitialLoad) {
          // First fetch: bootstrap known IDs without firing reload events
          data.forEach((n) => {
            if (n && n.id != null) {
              this.knownNotificationIds.add(n.id);
            }
          });
          this.isInitialLoad = false;
        } else {
          // Subsequent polls: detect new notifications
          let hasNewRefill = false;
          let hasNewVideo = false;
          let hasNewComplaint = false;

          data.forEach((n) => {
            if (n && n.id != null && !this.knownNotificationIds.has(n.id)) {
              this.knownNotificationIds.add(n.id);

              const type = (n.type || '').toLowerCase();
              const refType = (n.reference_type || '').toLowerCase();
              const refId = n.reference_id;

              if (type === 'refill' || refType === 'refill') {
                hasNewRefill = true;
                if (refId != null) {
                  this.newEntityIds.refill.add(refId);
                  setTimeout(() => {
                    this.newEntityIds.refill.delete(refId);
                  }, 5000);
                }
              } else if (type === 'video' || refType === 'video_verification') {
                hasNewVideo = true;
                if (refId != null) {
                  this.newEntityIds.video.add(refId);
                  setTimeout(() => {
                    this.newEntityIds.video.delete(refId);
                  }, 5000);
                }
              } else if (type === 'complaint' || refType === 'complaint') {
                hasNewComplaint = true;
                if (refId != null) {
                  this.newEntityIds.complaint.add(refId);
                  setTimeout(() => {
                    this.newEntityIds.complaint.delete(refId);
                  }, 5000);
                }
              }
            }
          });

          // Trigger reactive event counters if new notifications arrived
          if (hasNewRefill) this.lastRefillEvent++;
          if (hasNewVideo) this.lastVideoEvent++;
          if (hasNewComplaint) this.lastComplaintEvent++;
        }

        this.notifications = data;
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        this.error = err.message || 'Gagal memuat notifikasi';
      } finally {
        this.loading = false;
        this.isFetching = false;
      }
    },

    async markAsRead(id) {
      if (!id) return;

      // Optimistic update
      const target = this.notifications.find((n) => n.id === id);
      if (target) {
        target.is_read = true;
      }

      try {
        await notificationService.markAsRead(id);
      } catch (err) {
        console.error(`Failed to mark notification ${id} as read:`, err);
      }
    },

    async markAllAsRead() {
      // Optimistic update
      this.notifications.forEach((n) => {
        n.is_read = true;
      });

      try {
        await notificationService.markAllAsRead();
      } catch (err) {
        console.error('Failed to mark all notifications as read:', err);
      }
    },
  },
});
