import api from './api';

export default {
  getAll(params) {
    return api.get('/notifications', { params });
  },
  getById(id) {
    return api.get(`/notifications/${id}`);
  },
  markAsRead(id) {
    return api.put(`/notifications/${id}/read`);
  },
  markAllAsRead() {
    return api.put('/notifications/read-all');
  },
  delete(id) {
    return api.delete(`/notifications/${id}`);
  }
};
