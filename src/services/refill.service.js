import api from './api';

export default {
  getAll(params) {
    return api.get('/refill-requests', { params });
  },
  getById(id) {
    return api.get(`/refill-requests/${id}`);
  },
  approve(id, data) {
    return api.patch(`/refill-requests/${id}/approve`, data);
  },
  reject(id, data) {
    return api.patch(`/refill-requests/${id}/reject`, data);
  }
};
