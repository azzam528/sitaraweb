import api from './api';

export default {
  getAll(params) {
    return api.get('/video-verifications', { params });
  },
  getById(id) {
    return api.get(`/video-verifications/${id}`);
  },
  approve(id, data) {
    return api.patch(`/video-verifications/${id}/approve`, data);
  },
  reject(id, data) {
    return api.patch(`/video-verifications/${id}/reject`, data);
  }
};
