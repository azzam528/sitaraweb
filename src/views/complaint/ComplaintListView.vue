<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Dummy Data
const stats = ref([
  { id: 1, label: 'KELUHAN HARI INI', value: 8, icon: 'chat-bubble', color: 'teal' },
  { id: 2, label: 'BELUM DITINDAK', value: 4, icon: 'exclamation', color: 'red' },
  { id: 3, label: 'PRIORITAS TINGGI', value: 2, icon: 'alert-triangle', color: 'orange' },
  { id: 4, label: 'SEDANG DIPROSES', value: 2, icon: 'refresh', color: 'teal' },
  { id: 5, label: 'SELESAI', value: 2, icon: 'check-circle', color: 'green' }
])

const complaints = ref([
  {
    id: 1,
    patientName: 'Budi Kusuma',
    initials: 'BK',
    avatarColor: '#f87171',
    nik: '327504***',
    time: '08:15 WIB, 24 Okt 2023',
    complaintName: 'Sesak Napas Berat',
    severity: 'BERAT',
    status: 'Urgent'
  },
  {
    id: 2,
    patientName: 'Surya Ardi',
    initials: 'SA',
    avatarColor: '#14b8a6',
    nik: '327508***',
    time: '09:45 WIB, 24 Okt 2023',
    complaintName: 'Mual & Muntah',
    severity: 'SEDANG',
    status: 'Normal'
  },
  {
    id: 3,
    patientName: 'Rudi Prasetyo',
    initials: 'RP',
    avatarColor: '#9ca3af',
    nik: '327501***',
    time: '11:20 WIB, 24 Okt 2023',
    complaintName: 'Demam Ringan',
    severity: 'RINGAN',
    status: 'Diproses'
  },
  {
    id: 4,
    patientName: 'Ahmad Fauzi',
    initials: 'AF',
    avatarColor: '#14b8a6',
    nik: '327503***',
    time: '13:00 WIB, 24 Okt 2023',
    complaintName: 'Ruam Kulit',
    severity: 'SEDANG',
    status: 'Normal'
  },
  {
    id: 5,
    patientName: 'Dewi Lestari',
    initials: 'DL',
    avatarColor: '#f87171',
    nik: '327507***',
    time: '14:30 WIB, 24 Okt 2023',
    complaintName: 'Pusing Berkepanjangan',
    severity: 'BERAT',
    status: 'Urgent'
  }
])

const chartData = ref([
  { day: 'Sen', height: 40, active: false },
  { day: 'Sel', height: 60, active: false },
  { day: 'Rab', height: 30, active: false },
  { day: 'Kam', height: 85, active: true },
  { day: 'Jum', height: 50, active: false },
  { day: 'Sab', height: 20, active: false },
  { day: 'Min', height: 10, active: false }
])

const distributionData = ref([
  { label: 'Efek Samping Obat (ESO)', percent: 65, color: '#006591' },
  { label: 'Kondisi Klinis (Penyakit)', percent: 25, color: '#006591' },
  { label: 'Logistik / Stok Obat', percent: 10, color: '#ef4444' }
])
</script>

<template>
  <div class="complaint-list">
    <!-- Header -->
    <header class="page-header">
      <h1>Daftar Keluhan Pasien</h1>
      <p>Monitoring keluhan klinis real-time untuk penanganan TB terintegrasi.</p>
    </header>

    <!-- Stats -->
    <div class="stats-row">
      <div v-for="stat in stats" :key="stat.id" class="stat-card">
        <div class="stat-icon-wrapper" :class="`bg-${stat.color}`">
          <!-- Icons -->
          <svg v-if="stat.icon === 'chat-bubble'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <svg v-if="stat.icon === 'exclamation'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <svg v-if="stat.icon === 'alert-triangle'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <svg v-if="stat.icon === 'refresh'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
          <svg v-if="stat.icon === 'check-circle'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>
    </div>

    <!-- Filter -->
    <div class="filter-section card">
      <div class="filter-inputs">
        <input type="text" placeholder="Masukkan nama..." class="input-text" />
        <select class="input-select">
          <option value="">Semua Keluhan</option>
          <option value="eso">Efek Samping Obat</option>
          <option value="klinis">Kondisi Klinis</option>
          <option value="logistik">Logistik/Stok Obat</option>
        </select>
      </div>
      <div class="filter-actions">
        <button class="btn-primary">Terapkan Filter</button>
        <button class="btn-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-card card">
      <h2 class="card-title">Monitoring Real-Time</h2>
      <div class="table-responsive">
        <table class="complaint-table">
          <thead>
            <tr>
              <th>PASIEN</th>
              <th>WAKTU</th>
              <th>JENIS KELUHAN</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in complaints" :key="item.id">
              <td>
                <div class="patient-cell">
                  <div class="avatar" :style="{ backgroundColor: item.avatarColor }">
                    {{ item.initials }}
                  </div>
                  <div class="patient-info">
                    <span class="patient-name">{{ item.patientName }}</span>
                    <span class="patient-nik">NIK: {{ item.nik }}</span>
                  </div>
                </div>
              </td>
              <td><span class="time-text">{{ item.time }}</span></td>
              <td>
                <div class="complaint-cell">
                  <span class="complaint-name">{{ item.complaintName }}</span>
                  <span class="badge" :class="'badge-' + item.severity.toLowerCase()">
                    {{ item.severity }}
                  </span>
                </div>
              </td>
              <td>
                <span class="status-pill" :class="'status-' + item.status.toLowerCase()">
                  <span class="status-dot"></span>
                  {{ item.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <RouterLink :to="`/dashboard/complaints/${item.id}`" class="btn-action">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </RouterLink>
                  <button class="btn-action">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-container">
        <span class="pagination-info">Menampilkan 5 dari 18 keluhan</span>
        <div class="pagination-controls">
          <button class="btn-page">&lt;</button>
          <button class="btn-page active">1</button>
          <button class="btn-page">2</button>
          <button class="btn-page">3</button>
          <button class="btn-page">4</button>
          <button class="btn-page">&gt;</button>
        </div>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="bottom-row">
      <!-- Chart Card -->
      <div class="chart-card card">
        <h3 class="card-title">Tren Keluhan Mingguan</h3>
        <div class="bar-chart-container">
          <div class="bar-chart">
            <div v-for="bar in chartData" :key="bar.day" class="bar-wrapper">
              <div class="bar" :class="{ 'bar-active': bar.active }" :style="{ height: bar.height + '%' }"></div>
              <span class="bar-label" :class="{ 'label-active': bar.active }">{{ bar.day }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Distribution Card -->
      <div class="distribution-card card">
        <h3 class="card-title">Distribusi Keluhan</h3>
        <div class="distribution-list">
          <div v-for="(item, index) in distributionData" :key="index" class="dist-item">
            <div class="dist-header">
              <span class="dist-label">{{ item.label }}</span>
              <span class="dist-percent">{{ item.percent }}%</span>
            </div>
            <div class="dist-progress-bg">
              <div class="dist-progress-fill" :style="{ width: item.percent + '%', backgroundColor: item.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.complaint-list {
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Typography */
h1, h2, h3 {
  margin: 0;
  color: #0f172a;
}
.page-header h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}
.page-header p {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

/* Cards */
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.025);
  padding: 24px;
}
.card-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 20px;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.stat-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
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
  color: white;
  flex-shrink: 0;
}
.bg-teal { background-color: #0d9488; }
.bg-red { background-color: #ef4444; }
.bg-orange { background-color: #f59e0b; }
.bg-green { background-color: #22c55e; }

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 11px;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
}

/* Filters */
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}
.filter-inputs {
  display: flex;
  gap: 16px;
  flex: 1;
}
.input-text, .input-select {
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;
  color: #334155;
}
.input-text {
  min-width: 250px;
}
.input-select {
  min-width: 200px;
}
.filter-actions {
  display: flex;
  gap: 12px;
}
.btn-primary {
  background-color: #002B3F;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover {
  opacity: 0.9;
}
.btn-icon {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
}

/* Table */
.table-card {
  padding: 20px 0 0 0;
}
.table-card h2 {
  padding: 0 24px;
}
.table-responsive {
  overflow-x: auto;
}
.complaint-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.complaint-table th {
  padding: 12px 24px;
  font-size: 12px;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
}
.complaint-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}
.complaint-table tbody tr:hover {
  background-color: #f1f5f9;
}

.patient-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}
.patient-info {
  display: flex;
  flex-direction: column;
}
.patient-name {
  font-weight: 600;
  font-size: 14px;
}
.patient-nik {
  font-size: 12px;
  color: #64748b;
}
.time-text {
  font-size: 14px;
  color: #475569;
}
.complaint-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.complaint-name {
  font-size: 14px;
  font-weight: 500;
}

/* Badges & Status */
.badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  color: white;
}
.badge-berat { background-color: #ef4444; }
.badge-sedang { background-color: #f59e0b; }
.badge-ringan { background-color: #3b82f6; }

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.status-urgent {
  background-color: #fef2f2;
  color: #ef4444;
}
.status-urgent .status-dot { background-color: #ef4444; }

.status-normal {
  background-color: #f0fdf4;
  color: #22c55e;
}
.status-normal .status-dot { background-color: #22c55e; }

.status-diproses {
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  color: #64748b;
}
.status-diproses .status-dot { background-color: #64748b; }

/* Actions */
.action-buttons {
  display: flex;
  gap: 8px;
}
.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.btn-action:hover {
  background: #f1f5f9;
  color: #006591;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}
.pagination-info {
  font-size: 14px;
  color: #64748b;
}
.pagination-controls {
  display: flex;
  gap: 4px;
}
.btn-page {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: #334155;
}
.btn-page.active {
  background: #006591;
  color: white;
  border-color: #006591;
}
.btn-page:hover:not(.active) {
  background: #f1f5f9;
}

/* Bottom Row */
.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

/* Bar Chart */
.bar-chart-container {
  height: 200px;
  display: flex;
  align-items: flex-end;
  padding-top: 20px;
}
.bar-chart {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}
.bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
  justify-content: flex-end;
  width: 100%;
}
.bar {
  width: 32px;
  background: linear-gradient(to top, #006591, #38bdf8);
  border-radius: 4px 4px 0 0;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.bar-active {
  opacity: 1;
  background: linear-gradient(to top, #006591, #6DF5E1);
}
.bar-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.label-active {
  color: #006591;
  font-weight: 700;
}

/* Distribution */
.distribution-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dist-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dist-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
}
.dist-percent {
  font-weight: 600;
  color: #0f172a;
}
.dist-progress-bg {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}
.dist-progress-fill {
  height: 100%;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .stats-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  .filter-inputs {
    flex-direction: column;
  }
  .bottom-row {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
