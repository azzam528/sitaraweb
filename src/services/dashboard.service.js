import api from './api';

export default {
  getStatistics() {
    return api.get('/dashboard/statistics');
  },
  getComplianceChart() {
    return api.get('/dashboard/compliance-chart');
  },
  getTreatmentChart() {
    return api.get('/dashboard/treatment-chart');
  },
  getRecentActivities() {
    return api.get('/dashboard/recent-activities');
  },
  getPendingVideos() {
    return api.get('/dashboard/pending-videos');
  },
  getRecentComplaints() {
    return api.get('/dashboard/recent-complaints');
  },
  getMedicineWarnings() {
    return api.get('/dashboard/medicine-warnings');
  }
};
