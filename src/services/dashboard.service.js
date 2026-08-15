import api from './api';

export default {
  getDashboard() {
    return api.get('/dashboard');
  },
  getStatistics() {
    return api.get('/dashboard');
  },
  getRecentActivities() {
    return api.get('/dashboard');
  }
};
