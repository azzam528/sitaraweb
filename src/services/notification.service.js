import api from './api';

export default {
  getAll(params) {
    return api.get('/notifications', { params });
  },
  markAsRead(id) {
    return api.patch(`/notifications/${id}/read`);
  },
  markAllAsRead() {
    return api.patch('/notifications/read-all');
  },
  getUnreadCount() {
    return api.get('/notifications/unread-count');
  }
};
