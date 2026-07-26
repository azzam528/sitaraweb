import api from './api';

export default {
  getAll(params) {
    return api.get('/control-schedules', { params });
  },
  getById(id) {
    return api.get(`/control-schedules/${id}`);
  },
  create(data) {
    return api.post('/control-schedules', data);
  },
  update(id, data) {
    return api.put(`/control-schedules/${id}`, data);
  },
  delete(id) {
    return api.delete(`/control-schedules/${id}`);
  }
};
