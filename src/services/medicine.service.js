import api from './api';

export default {
  getAll(params) {
    return api.get('/medicines', { params });
  },
  getById(id) {
    return api.get(`/medicines/${id}`);
  },
  create(data) {
    return api.post('/medicines', data);
  },
  update(id, data) {
    return api.put(`/medicines/${id}`, data);
  },
  getDistributionHistory(params) {
    return api.get('/medicines/distribution-history', { params });
  },
  getStockWarnings() {
    return api.get('/medicines/stock-warnings');
  }
};
