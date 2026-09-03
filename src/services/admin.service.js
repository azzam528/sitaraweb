import api from './api';

export default {
  /**
   * GET /admin/facilities
   * Mengambil daftar fasilitas kesehatan.
   */
  getFacilities() {
    return api.get('/admin/facilities');
  },

  /**
   * GET /admin/nakes
   * Mengambil daftar tenaga kesehatan.
   */
  getNakesList() {
    return api.get('/admin/nakes');
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
