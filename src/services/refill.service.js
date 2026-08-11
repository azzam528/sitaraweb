import api from './api';

export default {
  getAll(params) {
    return api.get('/refills', { params });
  },
  getById(id) {
    return api.get(`/refills/${id}`);
  },
  create(data) {
    return api.post('/refills', data);
  },
  update(id, data) {
    return api.put(`/refills/${id}`, data);
  },
  approve(id, nurse_note = '') {
    return api.put(`/refills/${id}`, {
      status: 'approved',
      nurse_note
    });
  },
  reject(id, nurse_note = '') {
    return api.put(`/refills/${id}`, {
      status: 'rejected',
      nurse_note
    });
  },
  delete(id) {
    return api.delete(`/refills/${id}`);
  }
};
