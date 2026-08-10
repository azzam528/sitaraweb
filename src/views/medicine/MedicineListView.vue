<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Logistik OAT - SITARA TB</h1>
      <p class="page-subtitle">Manajemen stok dan permintaan obat anti-tuberkulosis.</p>
    </div>

    <!-- Statistic Cards Row -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL STOK OAT</span>
          <span class="stat-value">2,450 <span class="stat-unit">Tabs</span></span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PERMINTAAN HARI INI</span>
          <span class="stat-value">4</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU SETUJU</span>
          <span class="stat-value">1</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DISETUJUI</span>
          <span class="stat-value">3</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DITOLAK</span>
          <span class="stat-value">0</span>
        </div>
      </div>
    </div>

    <!-- Filter Section -->
    <section class="filter-section card mb-6">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Permintaan Obat</h2>
      </div>

      <div class="filter-grid-simple">
        <!-- 1. Search Name / NIK -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            placeholder="Cari Nama / NIK Pasien..." 
            class="form-control"
          />
        </div>

        <!-- 2. Tipe Obat -->
        <div class="form-group">
          <label>Tipe Obat OAT</label>
          <select class="form-control">
            <option value="">Semua Tipe Obat</option>
            <option value="Kategori I">Kategori I</option>
            <option value="Kategori II">Kategori II</option>
            <option value="Anak">Anak</option>
          </select>
        </div>

        <!-- 3. Status Permintaan -->
        <div class="form-group">
          <label>Status Permintaan</label>
          <select class="form-control">
            <option value="">Semua Status</option>
            <option value="Pending">Pending (Menunggu)</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Main Table Section -->
    <div class="card table-card">
      <div class="card-header flex-between">
        <h2 class="card-title">Permintaan Pengambilan OAT</h2>
        <div class="pill-buttons">
          <button class="pill-btn active">Semua</button>
          <button class="pill-btn">Baru</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Pasien</th>
              <th>Nama PMO</th>
              <th>Tipe Obat</th>
              <th>Alasan</th>
              <th>Tgl Permintaan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in requests" :key="req.id">
              <td>
                <div class="font-medium">{{ req.pasien }}</div>
                <div class="text-xs text-muted">{{ req.pasienId }}</div>
              </td>
              <td>{{ req.pmo }}</td>
              <td><span :class="['type-pill', req.typeClass]">{{ req.tipeObat }}</span></td>
              <td>{{ req.alasan }}</td>
              <td>{{ req.tglPermintaan }}</td>
              <td>
                <span :class="['status-pill', req.statusClass]">
                  <span class="status-dot"></span>
                  {{ req.status }}
                </span>
              </td>
              <td class="actions relative text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(req.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === req.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendNotify(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Notifikasi</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteRequest(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="pagination-section">
        <span class="pagination-info">Menampilkan 1-10 dari 20 entri</span>
        <div class="pagination-controls">
          <button class="btn-page" disabled>Prev</button>
          <button class="btn-page active">1</button>
          <button class="btn-page">2</button>
          <button class="btn-page">Next</button>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-grid">
      <!-- Level Stok OAT -->
      <div class="card">
        <h2 class="card-title mb-4">Level Stok OAT</h2>
        <div class="stock-list">
          <div v-for="stock in stocks" :key="stock.name" class="stock-item">
            <div class="stock-header">
              <span class="stock-name">{{ stock.name }}</span>
              <span :class="['stock-badge', stock.badgeClass]">{{ stock.status }}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar" :style="{ width: stock.percentage + '%', backgroundColor: stock.color }"></div>
            </div>
            <div class="stock-footer">
              <span class="stock-subtext">{{ stock.subtext }}</span>
              <span class="stock-percentage">{{ stock.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Riwayat Distribusi -->
      <div class="card">
        <h2 class="card-title mb-4">Riwayat Distribusi</h2>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Pasien</th>
                <th>Tipe Obat</th>
                <th>Jumlah</th>
                <th>Petugas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hist in histories" :key="hist.id">
                <td class="whitespace-nowrap">{{ hist.tanggal }}</td>
                <td>{{ hist.pasien }}</td>
                <td>{{ hist.tipeObat }}</td>
                <td>{{ hist.jumlah }}</td>
                <td>{{ hist.petugas }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter();
const activeDropdown = ref(null);

const toggleDropdown = (id) => {
  activeDropdown.value = activeDropdown.value === id ? null : id;
};

const handleDocumentClick = () => {
  activeDropdown.value = null;
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});

const viewDetail = () => {
  router.push('/dashboard/refill-requests');
};

const sendNotify = (req) => {
  alert(`Mengirim notifikasi pengingat stok ke ${req.pasien}`);
};

const deleteRequest = (req) => {
  if (confirm(`Apakah Anda yakin ingin menghapus permintaan OAT ${req.pasien}?`)) {
    requests.value = requests.value.filter(r => r.id !== req.id);
  }
};

const requests = ref([
  {
    id: 1,
    pasien: 'Budi Santoso',
    pasienId: 'ID: TB-2026-089',
    pmo: 'Surya',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '28 Jul 2026',
    status: 'Pending',
    statusClass: 'status-pending'
  },
  {
    id: 2,
    pasien: 'Ratna Sari',
    pasienId: 'ID: TB-2026-112',
    pmo: 'Andi Wijaya',
    tipeObat: 'Kategori II',
    typeClass: 'type-cat-2',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '28 Jul 2026',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 3,
    pasien: 'Dedi Kurniawan',
    pasienId: 'ID: TB-2026-045',
    pmo: 'Lina Marlina',
    tipeObat: 'Kategori I',
    typeClass: 'type-cat-1',
    alasan: 'Stok Habis',
    tglPermintaan: '27 Jul 2026',
    status: 'Disetujui',
    statusClass: 'status-approved'
  },
  {
    id: 4,
    pasien: 'Ahmad Faisal',
    pasienId: 'ID: TB-2026-156',
    pmo: 'Rudi Hermawan',
    tipeObat: 'Anak',
    typeClass: 'type-child',
    alasan: 'Kontrol Rutin',
    tglPermintaan: '27 Jul 2026',
    status: 'Ditolak',
    statusClass: 'status-rejected'
  }
]);

const stocks = ref([
  {
    name: 'Rifampisin',
    status: 'Safe',
    badgeClass: 'badge-safe',
    percentage: 85,
    color: '#22C55E',
    subtext: '1,200 / 1,410 Tablet'
  },
  {
    name: 'Isoniazid',
    status: 'Thinning',
    badgeClass: 'badge-thinning',
    percentage: 42,
    color: '#F59E0B',
    subtext: '580 / 1,380 Tablet'
  },
  {
    name: 'Pirazinamid',
    status: 'Critical',
    badgeClass: 'badge-critical',
    percentage: 15,
    color: '#EF4444',
    subtext: '165 / 1,100 Tablet'
  }
]);

const histories = ref([
  { id: 1, tanggal: '28 Jul, 10:15', pasien: 'Ratna Sari', tipeObat: 'Kategori II', jumlah: '28 Tablet', petugas: 'Ns. Hendra' },
  { id: 2, tanggal: '27 Jul, 14:30', pasien: 'Dedi Kurniawan', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Ns. Hendra' },
  { id: 3, tanggal: '27 Jul, 09:20', pasien: 'Slamet Riyadi', tipeObat: 'Kategori I', jumlah: '56 Tablet', petugas: 'Dr. Anisa' },
  { id: 4, tanggal: '26 Jul, 16:45', pasien: 'Maya Putri', tipeObat: 'Anak', jumlah: '14 Tablet', petugas: 'Ns. Hendra' }
]);
</script>

<style scoped>
.page-container {
  padding: 1.5rem;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #334155;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.teal-circle { background-color: #E0F2FE; color: #0284C7; }
.green-circle { background-color: #DCFCE7; color: #16A34A; }
.orange-circle { background-color: #FEF3C7; color: #D97706; }
.red-circle { background-color: #FEE2E2; color: #DC2626; }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Filters */
.filter-section {
  padding: 20px;
}
.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #334155;
}
.filter-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.filter-grid-simple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .filter-grid-simple { grid-template-columns: 1fr; }
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}
.form-control {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
  color: #334155;
}
.form-control:focus {
  border-color: #006591;
}

.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  color: #64748B;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0F172A;
  margin: 0;
  line-height: 1.1;
}

.stat-unit {
  font-size: 0.875rem;
  font-weight: 500;
  color: #94A3B8;
}

.text-warning { color: #F59E0B; }
.text-success { color: #22C55E; }
.text-danger { color: #EF4444; }

/* Cards */
.card {
  background-color: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  padding: 1.25rem;
  margin-bottom: 2rem;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
}

.mb-4 { margin-bottom: 1rem; }
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pill-buttons {
  display: flex;
  gap: 0.5rem;
  background-color: #F1F5F9;
  padding: 0.25rem;
  border-radius: 20px;
}

.pill-btn {
  border: none;
  background: transparent;
  padding: 0.375rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-btn.active {
  background-color: #FFFFFF;
  color: #006591;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Table Dropdown Actions */
.action-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.btn-more-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #F1F5F9;
  color: #334155;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-more-actions:hover {
  background-color: #E2E8F0;
  color: #0F172A;
  border-color: #CBD5E1;
}

.dropdown-menu-floating {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 6px;
  min-width: 180px;
  background-color: #0F172A;
  border: 1px solid #334155;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 6px;
  z-index: 100;
  text-align: left;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #F8FAFC;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.dropdown-item.text-danger {
  color: #F87171;
}

/* Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-top: 1px solid #E2E8F0;
  flex-wrap: wrap;
  gap: 16px;
}
.pagination-info {
  font-size: 0.875rem;
  color: #64748B;
}
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  color: #006591;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-page:hover:not(:disabled):not(.active) {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}
.btn-page:disabled {
  color: #94A3B8;
  border-color: #E2E8F0;
  background-color: #FFFFFF;
  cursor: not-allowed;
  opacity: 0.75;
}
.btn-page.active {
  background-color: #006591;
  color: #FFFFFF;
  border-color: #006591;
  font-weight: 600;
}
.page-ellipsis {
  color: #006591;
  font-size: 14px;
  font-weight: 500;
  padding: 0 6px;
}

/* Table */
.table-responsive {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748B;
  border-bottom: 1px solid #E2E8F0;
  background-color: #F8FAFC;
}

.data-table td {
  padding: 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.font-medium { font-weight: 500; color: #0F172A; }
.text-xs { font-size: 0.75rem; }
.text-muted { color: #64748B; }
.whitespace-nowrap { white-space: nowrap; }

/* Pills & Badges */
.type-pill, .status-pill, .stock-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.type-cat-1 { color: #006591; background-color: #E0F2FE; }
.type-cat-2 { color: #7E22CE; background-color: #F3E8FF; }
.type-child { color: #EA580C; background-color: #FFEDD5; }

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 0.375rem;
}

.status-pending { color: #B45309; background-color: #FEF3C7; }
.status-pending .status-dot { background-color: #F59E0B; }

.status-approved { color: #15803D; background-color: #DCFCE7; }
.status-approved .status-dot { background-color: #22C55E; }

.status-rejected { color: #B91C1C; background-color: #FEE2E2; }
.status-rejected .status-dot { background-color: #EF4444; }

.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #f8fafc;
  color: #006591;
  border-color: #cbd5e1;
}

/* Bottom Grid */
.bottom-grid {
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 1.5rem;
}

/* Stock List */
.stock-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stock-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stock-name {
  font-weight: 500;
  color: #0F172A;
  font-size: 0.875rem;
}

.badge-safe { color: #15803D; background-color: #DCFCE7; }
.badge-thinning { color: #B45309; background-color: #FEF3C7; }
.badge-critical { color: #B91C1C; background-color: #FEE2E2; }

.progress-bar-bg {
  width: 100%;
  height: 8px;
  background-color: #F1F5F9;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
}

.stock-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.stock-subtext {
  color: #64748B;
}

.stock-percentage {
  font-weight: 600;
  color: #334155;
}
</style>
