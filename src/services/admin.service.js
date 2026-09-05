import api from './api';

export default {
  /**
   * GET /admin/facilities
   * Mengambil daftar fasilitas kesehatan.
   */
  getFacilities() {
    return api.get('/admin/facilities');
  },

  createFacility(data) {
    return api.post('/admin/facilities', data);
  },

  updateFacility(id, data) {
    return api.put(`/admin/facilities/${id}`, data);
  },

  deleteFacility(id) {
    return api.delete(`/admin/facilities/${id}`);
  },

  /**
   * GET /admin/nakes
   * Mengambil daftar tenaga kesehatan.
   */
  getNakesList() {
    return api.get('/admin/nakes');
  },

  updateNakes(id, data) {
    return api.put(`/admin/nakes/${id}`, data);
  },

  deleteNakes(id) {
    return api.delete(`/admin/nakes/${id}`);
  },

  /**
   * POST /auth/nakes
   * Mendaftarkan akun Nakes baru.
   * @param {Object} data - { username, email, password, facility_id }
   */
  createNakes(data) {
    return api.post('/auth/nakes', data);
  }
};
