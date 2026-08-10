<template>
  <div class="video-list-view">
    <header class="page-header">
      <h1 class="page-title">AI Video Verification List</h1>
      <p class="page-subtitle">Kelola dan verifikasi video minum obat pasien dengan bantuan AI.</p>
    </header>

    <!-- 1. Statistic Cards Row -->
    <div class="stats-row">
      <!-- Card 1 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">VIDEO DIUNGGAH HARI INI</span>
          <span class="stat-value">18</span>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper success">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">BERHASIL DIVERIFIKASI AI</span>
          <span class="stat-value">15</span>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper primary">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">REVIEW MANUAL</span>
          <span class="stat-value">2</span>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper danger">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">GAGAL VERIFIKASI</span>
          <span class="stat-value">1</span>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">RATA-RATA KEPERCAYAAN</span>
          <span class="stat-value">94.5%</span>
        </div>
      </div>
    </div>

    <!-- 2. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Verifikasi Video AI</h2>
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

        <!-- 2. Status Verifikasi AI -->
        <div class="form-group">
          <label>Status Verifikasi AI</label>
          <select class="form-control">
            <option value="">Semua Status AI</option>
            <option value="Diverifikasi">Diverifikasi (Sukses)</option>
            <option value="Menunggu Tinjauan">Menunggu Tinjauan</option>
            <option value="Gagal">Gagal Verifikasi</option>
          </select>
        </div>

        <!-- 3. Status AI Risk -->
        <div class="form-group">
          <label>Status AI Risk</label>
          <select class="form-control">
            <option value="">Semua Status Risk</option>
            <option value="Risiko Tinggi">Risiko Tinggi</option>
            <option value="Risiko Sedang">Risiko Sedang</option>
            <option value="Risiko Rendah">Risiko Rendah</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 3. Verification Table -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="verification-table">
          <thead>
            <tr>
              <th>NAMA PASIEN</th>
              <th>WAKTU UNGGAH</th>
              <th>STATUS AI</th>
              <th>SKOR KEPERCAYAAN</th>
              <th>STATUS REVIEW</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="item.avatarColor">{{ item.initials }}</div>
                  <span class="patient-name">{{ item.name }}</span>
                </div>
              </td>
              <td class="text-secondary">{{ item.time }}</td>
              <td>
                <div class="status-ai">
                  <span class="status-dot" :class="item.aiStatusColor"></span>
                  <span>{{ item.aiStatus }}</span>
                </div>
              </td>
              <td>
                <div class="progress-wrapper">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :class="item.progressColor" :style="{ width: item.score }"></div>
                  </div>
                  <span class="score-text">{{ item.score }}</span>
                </div>
              </td>
              <td>
                <span class="pill" :class="item.reviewPillClass">{{ item.reviewStatus }}</span>
              </td>
              <td class="actions relative text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(item.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === item.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(item.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendMessage(item); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Kirim Pesan</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteVerification(item); activeDropdown = null">
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
      
      <!-- 4. Pagination -->
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

    <!-- 5. Bottom Row - Two Cards -->
    <div class="bottom-row">
      <!-- Left (60%): Statistik Verifikasi AI -->
      <div class="stats-chart-card card">
        <div class="card-header flex justify-between items-start mb-4">
          <div>
            <h2 class="card-title">Statistik Verifikasi AI (30 Hari Terakhir)</h2>
            <p class="text-xs text-secondary mt-1">Perbandingan jumlah video verifikasi yang berhasil vs gagal per periode.</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">18 <span class="text-xs font-normal" style="color: #64748B;">Total Verifikasi</span></div>
            <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>+15.2% bulan ini</span>
            </div>
          </div>
        </div>
        <div class="css-bar-chart">
          <div class="chart-y-axis">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
          <div class="chart-area">
            <div class="bar-group" v-for="(group, idx) in chartData" :key="idx">
              <div class="bars">
                <div class="bar-success" :style="{ height: group.success + '%' }">
                  <span class="bar-tooltip">{{ group.success }}</span>
                </div>
                <div class="bar-fail" :style="{ height: group.fail + '%' }">
                  <span class="bar-tooltip">{{ group.fail }}</span>
                </div>
              </div>
              <div class="bar-label">{{ group.label }}</div>
            </div>
          </div>
        </div>
        <div class="chart-legend flex justify-end gap-4 mt-3 pt-2 border-t border-gray-100">
          <span class="legend-item flex items-center gap-1.5 text-xs text-secondary font-medium"><span class="legend-dot primary-dot"></span> Berhasil Verifikasi</span>
          <span class="legend-item flex items-center gap-1.5 text-xs text-secondary font-medium"><span class="legend-dot red-dot"></span> Gagal Verifikasi</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

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

const viewDetail = (id) => {
  router.push(`/dashboard/video-verifications/${id}`);
};

const sendMessage = (item) => {
  alert(`Mengirim pesan ke ${item.name}`);
};

const deleteVerification = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus verifikasi video ${item.name}?`)) {
    tableData.value = tableData.value.filter(v => v.id !== item.id);
  }
};

const tableData = [
  {
    id: 1,
    initials: 'BP',
    avatarColor: 'bg-teal',
    name: 'Bambang Pamungkas',
    time: 'Hari ini, 08:45',
    aiStatus: 'Diverifikasi',
    aiStatusColor: 'success-dot',
    score: '98%',
    progressColor: 'bg-success',
    reviewStatus: 'Otomatis-Konfirmasi',
    reviewPillClass: 'pill-gray'
  },
  {
    id: 2,
    initials: 'SM',
    avatarColor: 'bg-orange',
    name: 'Siti Mariam',
    time: 'Hari ini, 07:12',
    aiStatus: 'Kepercayaan Rendah',
    aiStatusColor: 'danger-dot',
    score: '64%',
    progressColor: 'bg-warning',
    reviewStatus: 'Menunggu Tinjauan',
    reviewPillClass: 'pill-yellow'
  },
  {
    id: 3,
    initials: 'RK',
    avatarColor: 'bg-teal',
    name: 'Rahmat Kurnia',
    time: 'Hari ini, 06:30',
    aiStatus: 'Diverifikasi',
    aiStatusColor: 'success-dot',
    score: '82%',
    progressColor: 'bg-teal-main',
    reviewStatus: 'Otomatis-Konfirmasi',
    reviewPillClass: 'pill-gray'
  },
  {
    id: 4,
    initials: 'AD',
    avatarColor: 'bg-primary-light',
    name: 'Andi Darmawan',
    time: 'Kemarin, 18:20',
    aiStatus: 'Diverifikasi',
    aiStatusColor: 'success-dot',
    score: '95%',
    progressColor: 'bg-success',
    reviewStatus: 'Otomatis-Konfirmasi',
    reviewPillClass: 'pill-gray'
  },
  {
    id: 5,
    initials: 'NK',
    avatarColor: 'bg-danger-light',
    name: 'Nita Kusuma',
    time: 'Kemarin, 16:45',
    aiStatus: 'Gagal',
    aiStatusColor: 'danger-dot',
    score: '32%',
    progressColor: 'bg-danger',
    reviewStatus: 'Ditolak',
    reviewPillClass: 'pill-red'
  }
]

const chartData = [
  { label: 'Min 1', success: 85, fail: 15 },
  { label: 'Min 2', success: 92, fail: 8 },
  { label: 'Min 3', success: 78, fail: 22 },
  { label: 'Min 4', success: 95, fail: 5 },
  { label: 'Today', success: 60, fail: 10 }
]
</script>

<style scoped>
/* Color Variables based on Requirements */
:root {
  --primary: #006591;
  --primary-light: #e6f0f4;
  --accent: #6DF5E1;
  --accent-dark: #0d9488;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --danger-light: #fee2e2;
  --bg-color: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
}

.video-list-view {
  padding: 1.5rem;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-header {
  margin-bottom: 0.5rem;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #1e293b;
}
.page-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

/* 1. Statistic Cards Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
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
.stat-icon-wrapper.teal { background: #E0F2FE; color: #0284C7; }
.stat-icon-wrapper.success { background: #DCFCE7; color: #16A34A; }
.stat-icon-wrapper.primary { background: #E0F2FE; color: #006591; }
.stat-icon-wrapper.danger { background: #FEE2E2; color: #DC2626; }

.stat-icon {
  width: 24px;
  height: 24px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
  text-transform: uppercase;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

/* Base Card Style */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* 2. Filter Section */
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
.btn-apply:hover {
  background-color: #005378;
}

/* 3. Verification Table */
.table-card {
  display: flex;
  flex-direction: column;
}

.table-responsive {
  overflow-x: auto;
}

.verification-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.verification-table th {
  padding: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  text-transform: uppercase;
}

.verification-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
  font-size: 0.875rem;
}

.verification-table tbody tr:hover {
  background: #f8fafc;
}

.patient-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

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
  min-width: 170px;
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

.dropdown-item.text-danger:hover {
  background-color: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
}
.bg-teal { background-color: #0d9488; }
.bg-orange { background-color: #f97316; }
.bg-primary-light { background-color: #006591; color: white; }
.bg-danger-light { background-color: #ef4444; color: white; }

.patient-name {
  font-weight: 500;
  color: #1e293b;
}

.text-secondary {
  color: #64748b;
}

.status-ai {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.success-dot { background-color: #22C55E; }
.danger-dot { background-color: #EF4444; }

.progress-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.progress-bar-bg {
  width: 120px;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
}
.bg-success { background-color: #22C55E; }
.bg-teal-main { background-color: #0d9488; }
.bg-warning { background-color: #F59E0B; }
.bg-danger { background-color: #EF4444; }

.score-text {
  font-weight: 500;
  font-size: 0.75rem;
  min-width: 30px;
}

.pill {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
}
.pill-gray { background-color: #f1f5f9; color: #475569; }
.pill-yellow { background-color: #fef3c7; color: #d97706; }
.pill-red { background-color: #fee2e2; color: #ef4444; }

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

/* 4. Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.pagination-info {
  font-size: 0.875rem;
  color: #64748b;
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

/* 5. Bottom Row - Two Cards */
.bottom-row {
  display: flex;
  gap: 1.5rem;
}

.stats-chart-card {
  width: 100%;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}
.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.primary-dot { background-color: #006591; }
.red-dot { background-color: #EF4444; }

/* CSS Bar Chart */
.css-bar-chart {
  display: flex;
  height: 250px;
  gap: 1rem;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  color: #94a3b8;
  font-size: 0.75rem;
  padding-bottom: 2rem;
}

.chart-area {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 1px solid #e2e8f0;
  border-left: 1px solid #e2e8f0;
  padding-bottom: 0;
  position: relative;
}
.chart-area::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: linear-gradient(to bottom, #f8fafc 1px, transparent 1px);
  background-size: 100% 25%;
  z-index: 0;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  justify-content: flex-end;
  z-index: 1;
  position: relative;
  width: 40px;
}

.bars {
  display: flex;
  gap: 4px;
  align-items: flex-end;
  height: calc(100% - 24px); /* reserve space for label */
  width: 100%;
}

.bar-success, .bar-fail {
  flex: 1;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s ease;
  cursor: pointer;
}
.bar-success { background: linear-gradient(180deg, #0080B5 0%, #006591 100%); }
.bar-fail { background-color: #EF4444; }
.bar-success:hover { background: linear-gradient(180deg, #6DF5E1 0%, #006591 100%); }
.bar-fail:hover { background-color: #DC2626; }

.bar-tooltip {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  font-size: 0.625rem;
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.bar-success:hover .bar-tooltip, .bar-fail:hover .bar-tooltip {
  opacity: 1;
}

.bar-label {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.5rem;
}

/* Insights Right Card */
.title-with-icon {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.insight-icon {
  width: 24px;
  height: 24px;
  color: #006591;
}

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.insight-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(13, 148, 136, 0.2);
}
.insight-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.insight-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}
.insight-desc {
  font-size: 0.875rem;
  color: #475569;
  margin: 0;
  line-height: 1.4;
}

.btn-download {
  margin-top: 1.5rem;
  width: 100%;
  background-color: #006591;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-download:hover {
  background-color: #005378;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .stats-row {
    grid-template-columns: repeat(3, 1fr);
  }
  .bottom-row {
    flex-direction: column;
  }
}
@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
