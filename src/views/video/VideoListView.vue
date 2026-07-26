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
        <div class="stat-content">
          <span class="stat-label">Video Diunggah Hari Ini</span>
          <span class="stat-value">128</span>
        </div>
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-label">Berhasil Diverifikasi AI</span>
          <div class="stat-value-group">
            <span class="stat-value">94</span>
            <span class="stat-subtext success">↗ +12% vs Kemarin</span>
          </div>
        </div>
        <div class="stat-icon-wrapper success">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-label">Review Manual</span>
          <span class="stat-value">18</span>
        </div>
        <div class="stat-icon-wrapper primary">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-label">Gagal Verifikasi</span>
          <span class="stat-value">16</span>
        </div>
        <div class="stat-icon-wrapper danger">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
      </div>

      <!-- Card 5 -->
      <div class="stat-card">
        <div class="stat-content">
          <span class="stat-label">Rata-rata Kepercayaan</span>
          <span class="stat-value">92.5%</span>
        </div>
        <div class="stat-icon-wrapper teal">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- 2. Filter Section -->
    <div class="filter-section card">
      <div class="filter-input-group search-group">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Cari pasien..." class="filter-input" />
      </div>
      <div class="filter-input-group">
        <select class="filter-select">
          <option>Semua PMO</option>
        </select>
      </div>
      <div class="filter-input-group">
        <select class="filter-select">
          <option>Semua Kader</option>
        </select>
      </div>
      <div class="filter-input-group">
        <select class="filter-select">
          <option>Semua Status</option>
        </select>
      </div>
      <div class="filter-input-group">
        <input type="date" class="filter-date" placeholder="mm/dd/yyyy" />
      </div>
      <button class="btn-apply">Apply</button>
    </div>

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
              <td class="actions">
                <RouterLink :to="`/dashboard/video-verifications/${item.id}`" class="btn-action" title="Lihat Detail">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 4. Pagination -->
      <div class="pagination-section">
        <span class="pagination-info">Menampilkan 1-10 dari 128 entri</span>
        <div class="pagination-controls">
          <button class="page-btn">Prev</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">Next</button>
        </div>
      </div>
    </div>

    <!-- 5. Bottom Row - Two Cards -->
    <div class="bottom-row">
      <!-- Left (60%): Statistik Verifikasi AI -->
      <div class="stats-chart-card card">
        <div class="card-header">
          <h2 class="card-title">Statistik Verifikasi AI (30 Hari Terakhir)</h2>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot teal-dot"></span> Berhasil</span>
            <span class="legend-item"><span class="legend-dot red-dot"></span> Gagal</span>
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
      </div>

      <!-- Right (40%): AI Insights -->
      <div class="insights-card card">
        <div class="card-header">
          <div class="title-with-icon">
            <svg class="insight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="9" y1="18" x2="15" y2="18"></line>
              <line x1="10" y1="22" x2="14" y2="22"></line>
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
            </svg>
            <h2 class="card-title">AI Insights</h2>
          </div>
        </div>
        <div class="insights-list">
          <div class="insight-item">
            <h3 class="insight-title">Tren Kepatuhan</h3>
            <p class="insight-desc">Pola kepatuhan meningkat 15% di pagi hari (06:00 - 08:00) dibandingkan waktu malam.</p>
          </div>
          <div class="insight-item">
            <h3 class="insight-title">Anomali Terdeteksi</h3>
            <p class="insight-desc">Terdeteksi 4 video dengan pencahayaan rendah di Cluster Sukajadi Barat. Disarankan edukasi ulang kepada kader.</p>
          </div>
          <div class="insight-item">
            <h3 class="insight-title">Akurasi Model</h3>
            <p class="insight-desc">Model AI saat ini memiliki tingkat kepercayaan stabil di angka 92.5%. Update dataset dijadwalkan minggu depan.</p>
          </div>
        </div>
        <button class="btn-download">Download Report Lengkap</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

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
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-left: 4px solid #6DF5E1;
}
.stat-card:nth-child(2) { border-left-color: #22C55E; }
.stat-card:nth-child(3) { border-left-color: #006591; }
.stat-card:nth-child(4) { border-left-color: #EF4444; }
.stat-card:nth-child(5) { border-left-color: #6DF5E1; }

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-value-group {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.stat-subtext {
  font-size: 0.75rem;
  font-weight: 500;
}
.stat-subtext.success { color: #22C55E; }

.stat-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-icon-wrapper.teal { background: #e0fcf8; color: #0d9488; }
.stat-icon-wrapper.success { background: #dcfce7; color: #22c55e; }
.stat-icon-wrapper.primary { background: #e6f0f4; color: #006591; }
.stat-icon-wrapper.danger { background: #fee2e2; color: #ef4444; }

.stat-icon {
  width: 20px;
  height: 20px;
}

/* Base Card Style */
.card {
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* 2. Filter Section */
.filter-section {
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-input-group {
  position: relative;
  flex: 1;
  min-width: 150px;
}

.search-group {
  min-width: 200px;
  flex: 2;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #64748b;
}

.filter-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
}
.filter-input:focus { border-color: #006591; }

.filter-select, .filter-date {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #1e293b;
  outline: none;
  background: white;
}
.filter-select:focus, .filter-date:focus { border-color: #006591; }

.btn-apply {
  background-color: #0d9488;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 36px;
}
.btn-apply:hover {
  background-color: #0f766e;
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
  gap: 0.25rem;
}

.page-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.page-btn:hover { background: #f8fafc; }
.page-btn.active {
  background: #006591;
  color: white;
  border-color: #006591;
}

/* 5. Bottom Row - Two Cards */
.bottom-row {
  display: flex;
  gap: 1.5rem;
}

.stats-chart-card {
  flex: 3; /* 60% */
  padding: 1.5rem;
}
.insights-card {
  flex: 2; /* 40% */
  padding: 1.5rem;
  background-color: #e0fcf8; /* Light teal/cyan */
  border: 1px solid #bbf7d0;
  display: flex;
  flex-direction: column;
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
.teal-dot { background-color: #0d9488; }
.red-dot { background-color: #ef4444; }

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
}
.bar-success { background-color: #0d9488; }
.bar-fail { background-color: #fca5a5; }

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
  background-color: #004d70;
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
