import api from './api';

export default {
  getAll(params) {
    return api.get('/patients', { params });
  },
  getById(id) {
    return api.get(`/patients/${id}`);
  },
  getDetail(id) {
    return api.get(`/patients/${id}/detail`);
  },
  create(data) {
    return api.post('/patients', data);
  },
  update(id, data) {
    return api.put(`/patients/${id}`, data);
  },
  delete(id) {
    return api.delete(`/patients/${id}`);
  },
  getTreatmentHistory(id) {
    return api.get(`/patients/${id}/treatment-history`);
  },
  getPMO(id) {
    return api.get(`/patients/${id}/pmo`);
  },
  getVideoHistory(id) {
    return api.get(`/patients/${id}/videos`);
  }
};
