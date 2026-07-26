import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false
  }),
  actions: {
    async fetchNotifications() {
      this.loading = true;
      try {
        // API call to be implemented
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        this.loading = false;
      }
    },
    async markAsRead(id) {
      this.loading = true;
      try {
        // API call to be implemented
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        this.loading = false;
      }
    },
    async markAllAsRead() {
      this.loading = true;
      try {
        // API call to be implemented
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        this.loading = false;
      }
    },
    async fetchUnreadCount() {
      this.loading = true;
      try {
        // API call to be implemented
        await new Promise(resolve => setTimeout(resolve, 500));
      } finally {
        this.loading = false;
      }
    }
  }
});
