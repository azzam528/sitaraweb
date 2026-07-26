import api from './api';

export default {
  getAll(params) {
    return api.get('/complaints', { params });
  },
  getById(id) {
    return api.get(`/complaints/${id}`);
  },
  updateStatus(id, data) {
    return api.patch(`/complaints/${id}/status`, data);
  },
  addFollowUp(id, data) {
    return api.post(`/complaints/${id}/follow-up`, data);
  }
};
