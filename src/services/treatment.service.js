import api from './api';

export default {
  getAll(params) {
    return api.get('/treatments', { params });
  },
  getById(id) {
    return api.get(`/treatments/${id}`);
  },
  getSchedule(patientId) {
    return api.get(`/treatments/${patientId}/schedule`);
  },
  getMedicationHistory(patientId) {
    return api.get(`/treatments/${patientId}/medication-history`);
  },
  getProgress(patientId) {
    return api.get(`/treatments/${patientId}/progress`);
  },
  getCompliance(patientId) {
    return api.get(`/treatments/${patientId}/compliance`);
  }
};
