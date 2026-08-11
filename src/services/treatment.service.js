import api from './api';

export default {
  getAll(params) {
    return api.get('/treatments', { params });
  },
  getById(id) {
    return api.get(`/treatments/${id}`);
  },
  create(data) {
    return api.post('/treatments', data);
  },
  update(id, data) {
    return api.put(`/treatments/${id}`, data);
  },
  delete(id) {
    return api.delete(`/treatments/${id}`);
  }
};
