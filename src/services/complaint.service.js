import api from './api';

export default {
  getAll(params) {
    return api.get('/complaints', { params });
  },
  getById(id) {
    return api.get(`/complaints/${id}`);
  },
  create(data) {
    return api.post('/complaints', data);
  },
  update(id, data) {
    return api.put(`/complaints/${id}`, data);
  },
  delete(id) {
    return api.delete(`/complaints/${id}`);
  }
};
