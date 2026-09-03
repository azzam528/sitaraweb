import { defineStore } from 'pinia';
import notificationService from '@/services/notification.service';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    loading: false,
    error: null,
  }),

  getters: {
    unreadCount: (state) => {
      return state.notifications.filter((n) => !n.is_read).length;
    },
    unreadNotifications: (state) => {
      return state.notifications.filter((n) => !n.is_read);
    },
  },

  actions: {
    async fetchNotifications() {
      const token = localStorage.getItem('sitara_token');
      if (!token) {
        this.notifications = [];
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await notificationService.getAll();
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];
        this.notifications = data;
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
        this.error = err.message || 'Gagal memuat notifikasi';
      } finally {
        this.loading = false;
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
