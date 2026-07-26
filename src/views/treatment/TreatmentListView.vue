<template>
  <div class="treatment-list-page">
    <!-- 1. Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Pemantauan Obat</h1>
        <p class="page-subtitle">Pemantauan kepatuhan minum obat (PMO) pasien TB secara real-time.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Ekspor Laporan
        </button>
        <button class="btn btn-primary">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Input Kepatuhan Manual
        </button>
      </div>
    </header>

    <!-- 2. Statistic Cards Row -->
    <div class="stats-grid">
      <div class="stat-card" v-for="(stat, index) in statistics" :key="index">
        <div class="stat-title">{{ stat.title }}</div>
        <div class="stat-value" :class="stat.valueClass">{{ stat.value }}</div>
        <div class="stat-subtext">{{ stat.subtext }}</div>
      </div>
    </div>

    <!-- 3. Filter Section -->
    <div class="filter-section card">
      <div class="filter-grid">
        <div class="input-group search-group">
          <svg class="icon search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Cari pasien atau ID Pasien..." class="form-control" />
        </div>
        <select class="form-control">
          <option value="">Semua Fase</option>
          <option value="intensif">Intensif</option>
          <option value="lanjutan">Lanjutan</option>
        </select>
        <select class="form-control">
          <option value="">Semua Status</option>
          <option value="dikonfirmasi">Dikonfirmasi</option>
          <option value="telat">Telat</option>
          <option value="ketinggalan">Ketinggalan</option>
        </select>
        <select class="form-control">
          <option value="">Semua Risiko</option>
          <option value="rendah">Rendah</option>
          <option value="sedang">Sedang</option>
          <option value="tinggi">Tinggi</option>
        </select>
        <div class="date-input-group">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <input type="text" value="Today, 24 Mei" class="form-control" readonly />
        </div>
        <button class="btn btn-icon btn-outline filter-advanced-btn">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
    </div>

    <!-- 4. Treatment Monitoring Table -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Pasien</th>
              <th>Hari Perawatan</th>
              <th>Jadwal Hari ini</th>
              <th>Status Kepatuhan</th>
              <th>Progress Kepatuhan</th>
              <th>Tingkat Risiko</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in patients" :key="patient.id">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="'avatar-' + patient.avatarColor">{{ patient.initials }}</div>
                  <div>
                    <div class="patient-name">{{ patient.name }}</div>
                    <div class="patient-kader">Kader: {{ patient.kader }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="treatment-day">Hari {{ patient.day }}/180</div>
                <div class="treatment-phase">{{ patient.phase }}</div>
              </td>
              <td>
                <span class="schedule-pill">{{ patient.schedule }} WIB</span>
              </td>
              <td>
                <div class="status-indicator">
                  <span class="status-dot" :class="'bg-' + patient.statusColor"></span>
                  {{ patient.status }}
                </div>
              </td>
              <td>
                <div class="progress-wrapper">
                  <div class="progress-bar-container">
                    <div class="progress-bar" :class="'bg-' + patient.statusColor" :style="{ width: patient.progressPercentage + '%' }"></div>
                  </div>
                  <div class="progress-text">
                    <span :class="'text-' + patient.statusColor">{{ patient.progressPercentage }}%</span>
                    <span class="progress-days">{{ patient.progressDays }}/{{ patient.day }} hari</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="risk-text" :class="'text-' + patient.riskColor">{{ patient.risk }}</span>
              </td>
              <td class="actions">
                <RouterLink :to="`/dashboard/treatments/${patient.id}`" class="btn-action" title="Lihat Detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5. Pagination -->
      <div class="pagination-wrapper">
        <div class="pagination-info">Showing 1-4 of 145 patients</div>
        <div class="pagination-controls">
          <button class="btn btn-icon btn-outline" disabled>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button class="btn btn-page active">1</button>
          <button class="btn btn-page">2</button>
          <button class="btn btn-page">3</button>
          <span class="pagination-ellipsis">...</span>
          <button class="btn btn-page">37</button>
          <button class="btn btn-icon btn-outline">
             <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 6. Bottom Row -->
    <div class="bottom-row">
      <!-- Left: Tren Kepatuhan Mingguan -->
      <div class="chart-section card">
        <h3 class="section-title">Tren Kepatuhan Mingguan</h3>
        <div class="bar-chart">
          <div class="y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div class="chart-area">
            <div class="grid-lines">
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
              <div class="grid-line"></div>
            </div>
            <div class="bars">
              <div class="bar-group" v-for="day in chartData" :key="day.label">
                <div class="bar-wrapper">
                  <div class="bar" :style="{ height: day.value + '%' }">
                     <div class="bar-tooltip">{{ day.value }}%</div>
                  </div>
                </div>
                <div class="x-label">{{ day.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Peringatan Risiko Tinggi -->
      <div class="alerts-section card">
        <div class="alerts-header">
           <h3 class="section-title">Peringatan Risiko Tinggi</h3>
           <p class="section-subtitle">Intervensi manual diperlukan untuk pasien berikut:</p>
        </div>
        
        <div class="alerts-list">
          <div v-for="alert in alerts" :key="alert.id" class="alert-item" :class="'alert-' + alert.type">
            <div class="alert-icon-wrapper">
              <svg v-if="alert.type === 'danger'" class="icon alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <svg v-else class="icon alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div class="alert-content">
              <div class="alert-name">{{ alert.name }}</div>
              <div class="alert-desc">{{ alert.desc }}</div>
            </div>
            <button class="btn-action-text" :class="'text-' + alert.type">{{ alert.action }}</button>
          </div>
        </div>
        
        <button class="btn btn-outline btn-block mt-4">Tampilkan Semua Peringatan (8)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const statistics = ref([
  { title: 'Total Terkonfirmasi Hari Ini', value: '128', subtext: 'Target: 145 Pasien', valueClass: 'text-dark' },
  { title: 'Menunggu Konfirmasi', value: '14', subtext: 'Menunggu upload video/foto', valueClass: 'text-warning' },
  { title: 'Dosis Terlambat', value: '3', subtext: 'Melewati jam minum obat (>2 jam)', valueClass: 'text-danger' },
  { title: 'Rata-rata Kepatuhan Mingguan', value: '94.2%', subtext: 'Meningkat dari minggu lalu', valueClass: 'text-success' }, // Note says teal, but success green is close enough for dummy or we can add teal class
  { title: 'Pasien Risiko Tinggi', value: '8', subtext: 'Butuh intervensi segera', valueClass: 'text-danger' }
])

const patients = ref([
  {
    id: 1, initials: 'BS', avatarColor: 'teal', name: 'Bambang Sugiyono', kader: 'Siti Aminah',
    day: 45, phase: 'Fase Intensif', schedule: '08:00',
    status: 'Dikonfirmasi', statusColor: 'success',
    progressPercentage: 92, progressDays: 42,
    risk: 'RISIKO RENDAH', riskColor: 'success'
  },
  {
    id: 2, initials: 'RM', avatarColor: 'gray', name: 'Ratna Mutia', kader: 'Agus Pratama',
    day: 12, phase: 'Fase Intensif', schedule: '07:00',
    status: 'Telat', statusColor: 'warning',
    progressPercentage: 75, progressDays: 9,
    risk: 'RISIKO SEDANG', riskColor: 'warning'
  },
  {
    id: 3, initials: 'DW', avatarColor: 'danger', name: 'Dedi Wijaya', kader: 'Siti Aminah',
    day: 88, phase: 'Fase Lanjutan', schedule: '19:00',
    status: 'Ketinggalan', statusColor: 'danger',
    progressPercentage: 45, progressDays: 40,
    risk: 'RISIKO TINGGI', riskColor: 'danger'
  },
  {
    id: 4, initials: 'AS', avatarColor: 'primary', name: 'Ani Sulastri', kader: 'Agus Pratama',
    day: 156, phase: 'Fase Lanjutan', schedule: '08:00',
    status: 'Dikonfirmasi', statusColor: 'success',
    progressPercentage: 98, progressDays: 153,
    risk: 'RISIKO RENDAH', riskColor: 'success'
  }
])

const chartData = ref([
  { label: 'Sen', value: 92 },
  { label: 'Sel', value: 94 },
  { label: 'Rab', value: 95 },
  { label: 'Kam', value: 90 },
  { label: 'Jum', value: 85 },
  { label: 'Sab', value: 98 },
  { label: 'Min', value: 96 }
])

const alerts = ref([
  { id: 1, type: 'danger', name: 'Dedi Wijaya', desc: 'Terlewat 3 dosis berturut-turut', action: 'TELEPON KADER' },
  { id: 2, type: 'danger', name: 'Mulyono Santoso', desc: 'Efek samping yang dilaporkan: Muntah', action: 'ATUR KONSULTASI' },
  { id: 3, type: 'warning', name: 'Siti Khotimah', desc: 'Dosis terlambat terdeteksi (4 jam)', action: 'CEK STATUS' }
])
</script>

<style scoped>
/* Colors */
:root {
  --primary: #006591;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg-color: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-dark: #1E293B;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
}

.treatment-list-page {
  font-family: 'Inter', sans-serif;
  color: #1E293B; /* text-dark */
  background-color: #F8FAFC;
  min-height: 100vh;
  padding: 1.5rem;
}

/* Base Styles */
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid #E2E8F0;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  vertical-align: middle;
}

/* Utilities */
.text-success { color: #22C55E; }
.text-warning { color: #F59E0B; }
.text-danger { color: #EF4444; }
.text-dark { color: #1E293B; }
.bg-success { background-color: #22C55E; }
.bg-warning { background-color: #F59E0B; }
.bg-danger { background-color: #EF4444; }

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
}
.page-subtitle {
  color: #64748B;
  margin: 0;
  font-size: 0.875rem;
}
.header-actions {
  display: flex;
  gap: 0.75rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.btn-primary {
  background-color: #006591;
  color: white;
}
.btn-primary:hover { background-color: #005378; }
.btn-outline {
  background-color: white;
  border-color: #E2E8F0;
  color: #1E293B;
}
.btn-outline:hover { background-color: #F8FAFC; }
.btn-icon { padding: 0.5rem; }
.btn-block { width: 100%; }

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #E2E8F0;
}
.stat-title {
  font-size: 0.75rem;
  color: #64748B;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}
.stat-subtext {
  font-size: 0.75rem;
  color: #64748B;
}

/* Filters */
.filter-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr auto;
  gap: 1rem;
  align-items: center;
}
.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1E293B;
  background-color: white;
  outline: none;
}
.form-control:focus { border-color: #006591; }
.input-group {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94A3B8;
  width: 1rem;
  height: 1rem;
}
.search-group input { padding-left: 2.25rem; }
.date-input-group {
  position: relative;
  display: flex;
  align-items: center;
}
.date-input-group .icon {
  position: absolute;
  left: 0.75rem;
  color: #94A3B8;
  width: 1rem;
  height: 1rem;
}
.date-input-group input { padding-left: 2.25rem; }

/* Table */
.table-card { padding: 0; overflow: hidden; }
.table-responsive { overflow-x: auto; }
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th {
  background-color: #F8FAFC;
  color: #64748B;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
  text-transform: uppercase;
}
.data-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E2E8F0;
  vertical-align: middle;
}
.patient-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}
.avatar-teal { background-color: #14B8A6; }
.avatar-gray { background-color: #94A3B8; }
.avatar-danger { background-color: #EF4444; }
.avatar-primary { background-color: #006591; }
.patient-name { font-weight: 600; font-size: 0.875rem; }
.patient-kader { font-size: 0.75rem; color: #64748B; margin-top: 0.125rem; }
.treatment-day { font-weight: 500; font-size: 0.875rem; }
.treatment-phase { font-size: 0.75rem; color: #64748B; }
.schedule-pill {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #F1F5F9;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #475569;
}
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}
.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.progress-wrapper { display: flex; flex-direction: column; gap: 0.25rem; }
.progress-bar-container {
  height: 0.5rem;
  background-color: #F1F5F9;
  border-radius: 9999px;
  overflow: hidden;
}
.progress-bar { height: 100%; border-radius: 9999px; }
.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
}
.progress-days { color: #64748B; font-weight: 400; }
.risk-text { font-size: 0.75rem; font-weight: 700; }
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

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: white;
}
.pagination-info { font-size: 0.875rem; color: #64748B; }
.pagination-controls { display: flex; gap: 0.25rem; align-items: center; }
.btn-page {
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}
.btn-page:hover { background: #F1F5F9; }
.btn-page.active { background: #006591; color: white; }
.pagination-ellipsis { color: #94A3B8; padding: 0 0.25rem; }

/* Bottom Row */
.bottom-row {
  display: flex;
  gap: 1.5rem;
}
.chart-section { flex: 0 0 55%; margin-bottom: 0; }
.alerts-section { flex: 0 0 calc(45% - 1.5rem); margin-bottom: 0; }
.section-title { font-size: 1.125rem; font-weight: 600; margin: 0 0 1.25rem 0; }
.section-subtitle { font-size: 0.875rem; color: #64748B; margin: -1rem 0 1rem 0; }

/* Bar Chart */
.bar-chart {
  display: flex;
  height: 250px;
  margin-top: 1rem;
}
.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 1rem;
  color: #64748B;
  font-size: 0.75rem;
  text-align: right;
  width: 40px;
}
.chart-area {
  flex-grow: 1;
  position: relative;
}
.grid-lines {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.grid-line {
  border-top: 1px dashed #E2E8F0;
  width: 100%;
}
.bars {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 0 1rem;
}
.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}
.bar-wrapper {
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 25px; /* space for x-label */
}
.bar {
  width: 32px;
  background: linear-gradient(to top, #006591, #0087c2);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.3s ease;
}
.bar:hover .bar-tooltip { opacity: 1; }
.bar-tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.x-label {
  position: absolute;
  bottom: 0;
  font-size: 0.75rem;
  color: #64748B;
}

/* Alerts */
.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.alert-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
}
.alert-danger { background-color: #FEF2F2; }
.alert-warning { background-color: #FFFBEB; }
.alert-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.alert-danger .alert-icon { color: #EF4444; }
.alert-warning .alert-icon { color: #F59E0B; }
.alert-content { flex-grow: 1; }
.alert-name { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.125rem; }
.alert-desc { font-size: 0.75rem; color: #64748B; }
.btn-action-text {
  background: transparent;
  border: none;
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
  white-space: nowrap;
}
.btn-action-text:hover { text-decoration: underline; }

/* Responsive adjustments */
@media (max-width: 1200px) {
  .stats-grid { grid-template-columns: repeat(3, 1fr); }
  .filter-grid { grid-template-columns: 1fr 1fr; }
  .bottom-row { flex-direction: column; }
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
  .filter-grid { grid-template-columns: 1fr; }
  .page-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
}
</style>
