import api from './api';

export default {
  // ==========================================
  // CONFIRMED API
  // ==========================================
  
  /**
   * Endpoint untuk mendaftarkan akun Nakes baru.
   * @param {Object} data - Payload: username, email, password, facility_id
   */
  createNakes(data) {
    return api.post('/auth/nakes', data);
  },

  // ==========================================
  // TODO / INTEGRATION POINTS
  // (API MASIH MEMBUTUHKAN BACKEND / BELUM TERSEDIA)
  // ==========================================

  /**
   * TODO: Menarik data statistik untuk Dashboard Admin
   * Jangan buat asumsi endpoint, ini hanya placeholder service.
   */
  getDashboardSummary() {
    // return api.get('/admin/dashboard');
    return Promise.resolve({
      data: {
        total_facilities: 0,
        total_nakes: 0,
        active_facilities: 0
      }
    });
  },

  /**
   * TODO: Menarik daftar fasilitas kesehatan.
   * Digunakan di halaman Manajemen Fasilitas dan Dropdown Form Tambah Nakes.
   */
  getFacilities(params) {
    // return api.get('/admin/facilities', { params });
    return Promise.resolve({
      data: {
        data: [] // Kosong karena API belum siap
      }
    });
  },

  /**
   * TODO: Menarik daftar Nakes.
   * Digunakan di halaman Manajemen Nakes.
   */
  getNakesList(params) {
    // return api.get('/admin/nakes', { params });
    return Promise.resolve({
      data: {
        data: [],
        total: 0
      }
    });
  }
};
