import api from './api';

export default {
  getAll(params) {
    return api.get('/video-verifications', { params });
  },
  getById(id) {
    return api.get(`/video-verifications/${id}`);
  },
  streamVideo(id) {
    return api.get(`/video-verifications/${id}/stream`, {
      responseType: 'blob',
    });
  },
  approve(id, data) {
    return api.put(`/video-verifications/${id}`, {
      status: 'verified',
      review_note: data?.notes || data?.review_note || null,
    });
  },
  reject(id, data) {
    return api.put(`/video-verifications/${id}`, {
      status: 'rejected',
      review_note: data?.notes || data?.review_note || null,
    });
  },
  update(id, data) {
    return api.put(`/video-verifications/${id}`, data);
  },
  delete(id) {
    return api.delete(`/video-verifications/${id}`);
  },
};
