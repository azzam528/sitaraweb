import api from './api';

export default {
  getAll(params) {
    return api.get('/medicine-schedules', { params });
  },
  getById(id) {
    return api.get(`/medicine-schedules/${id}`);
  },
  create(data) {
    return api.post('/medicine-schedules', data);
  },
  update(id, data) {
    return api.put(`/medicine-schedules/${id}`, data);
  },
  delete(id) {
    return api.delete(`/medicine-schedules/${id}`);
  }
};
