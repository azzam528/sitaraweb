<template>
  <div class="treatment-detail">
    <!-- 2. Top Section: Patient Profile -->
    <div class="card profile-card">
      <div class="profile-main">
        <div class="avatar">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div class="profile-info">
          <h2>Bpk. Ahmad Subarjo</h2>
          <div class="profile-badges">
            <span class="text-sm">NIK: 3271234567890123</span>
            <span class="badge badge-accent">Mulai Pengobatan: 12 Jan 2026</span>
            <span class="badge badge-success">Aktif Pengobatan</span>
          </div>
          <p class="text-muted">Tipe TB: TB Paru SO (Sensitif Obat) - Kategori I</p>
        </div>
      </div>
    </div>

    <!-- 3. Info Cards Row -->
    <div class="info-grid">
      <div class="card info-card">
        <div class="info-header">
          <span class="info-title">Progres Pengobatan</span>
          <span class="info-value">45 / 180 Hari</span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 25%;"></div>
          </div>
        </div>
        <p class="info-subtext">Tahap Intensif: Berakhir dalam 15 hari lagi</p>
      </div>
      
      <div class="card info-card">
        <div class="info-header">
          <span class="info-title">Petugas Monitoring (PMO)</span>
        </div>
        <p class="info-value pmo-name">Surya</p>
        <p class="info-subtext text-success">Keluarga (Istri)</p>
      </div>

      <div class="card info-card">
        <div class="info-header">
          <span class="info-title">Dokter Penanggung Jawab</span>
        </div>
        <p class="info-value dr-name">dr. Heru Prasetyo</p>
        <p class="info-subtext text-accent">Sp.P (Spesialis Paru)</p>
      </div>
    </div>

    <!-- 4. Main Content (Two Columns Layout) -->
    <div class="main-content">
      <!-- Left Column (65%) -->
      <div class="left-col">
        <!-- Kalender Kepatuhan Dosis -->
        <div class="card calendar-card">
          <div class="card-header">
            <h3>Kalender Kepatuhan Dosis</h3>
            <div class="calendar-controls">
              <button class="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span>Juli 2026</span>
              <button class="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
          
          <div class="calendar-grid">
            <div class="weekday">Min</div>
            <div class="weekday">Sen</div>
            <div class="weekday">Sel</div>
            <div class="weekday">Rab</div>
            <div class="weekday">Kam</div>
            <div class="weekday">Jum</div>
            <div class="weekday">Sab</div>
            
            <!-- Dates (1 to 15 mapped out as per prompt) -->
            <!-- Note: Feb 2024 started on Thursday (Kam). So we need empty cells -->
            <div class="date empty"></div>
            <div class="date empty"></div>
            <div class="date empty"></div>
            <div class="date empty"></div>
            
            <div class="date success">
               <span class="date-num">1</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date success">
               <span class="date-num">2</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date success">
               <span class="date-num">3</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date danger">
               <span class="date-num">4</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div class="date success">
               <span class="date-num">5</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date success">
               <span class="date-num">6</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date success">
               <span class="date-num">7</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date success">
               <span class="date-num">8</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date danger">
               <span class="date-num">9</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div class="date success">
               <span class="date-num">10</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date today success-solid">
               <span class="date-num">11</span>
               <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="date future">
               <span class="date-num">12</span>
            </div>
            <div class="date future">
               <span class="date-num">13</span>
            </div>
            <div class="date future">
               <span class="date-num">14</span>
            </div>
            <div class="date future">
               <span class="date-num">15</span>
            </div>
          </div>
          
          <div class="calendar-legend">
            <div class="legend-item">
              <span class="dot dot-dark-green"></span> Konfirmasi Video
            </div>
            <div class="legend-item">
              <span class="dot dot-teal"></span> Konfirmasi Foto
            </div>
            <div class="legend-item">
              <span class="dot dot-red"></span> Lewat Jadwal
            </div>
            <div class="legend-item">
              <span class="dot dot-gray"></span> Mendatang
            </div>
          </div>
        </div>

        <!-- Row: Tren Kepatuhan Mingguan & Log Aktivitas Terbaru Side-by-Side -->
        <div class="trend-log-grid">
          <!-- Tren Kepatuhan Mingguan -->
          <div class="card trend-card">
            <div class="card-header flex justify-between items-start mb-4">
              <div>
                <h3>Tren Kepatuhan Mingguan</h3>
                <p class="text-xs text-secondary mt-1">Persentase kepatuhan obat pasien per minggu</p>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold" style="color: #1E293B;">85% <span class="text-xs font-normal" style="color: #64748B;">Rata-rata Kepatuhan</span></div>
                <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <span>+5% dari fase awal</span>
                </div>
              </div>
            </div>
            <div class="area-chart-container flex">
              <div class="y-axis text-xs text-secondary flex flex-col justify-between pr-2">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
              <div class="chart-area-wrapper flex-1 relative">
                <div class="chart-grid-lines absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div class="grid-line border-b border-dashed border-gray-200"></div>
                  <div class="grid-line border-b border-dashed border-gray-200"></div>
                  <div class="grid-line border-b border-dashed border-gray-200"></div>
                  <div class="grid-line border-b border-dashed border-gray-200"></div>
                  <div class="grid-line border-b border-dashed border-gray-200"></div>
                </div>
                
                <svg viewBox="0 0 480 160" class="w-full h-full relative z-10 overflow-visible">
                  <defs>
                    <linearGradient id="detailComplianceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#006591" stop-opacity="0.38" />
                      <stop offset="100%" stop-color="#006591" stop-opacity="0.02" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Area fill under curve -->
                  <path d="M 30 0 C 75 0, 75 24, 120 24 C 165 24, 165 16, 210 16 C 255 16, 255 48, 300 48 C 345 48, 345 32, 390 32 C 435 32, 435 32, 450 32 L 450 160 L 30 160 Z" fill="url(#detailComplianceGradient)" />
                  
                  <!-- Smooth Curve Line -->
                  <path d="M 30 0 C 75 0, 75 24, 120 24 C 165 24, 165 16, 210 16 C 255 16, 255 48, 300 48 C 345 48, 345 32, 390 32 C 435 32, 435 32, 450 32" fill="none" stroke="#006591" stroke-width="3" stroke-linecap="round" />
                  
                  <!-- Points -->
                  <g class="chart-point-group" v-for="(pt, i) in [
                    {x: 30, y: 0, val: 100},
                    {x: 120, y: 24, val: 85},
                    {x: 210, y: 16, val: 90},
                    {x: 300, y: 48, val: 70, active: true},
                    {x: 390, y: 32, val: 80}
                  ]" :key="i">
                    <circle :cx="pt.x" :cy="pt.y" r="5" fill="#FFFFFF" stroke="#006591" stroke-width="3" class="chart-point cursor-pointer transition-transform hover:scale-125" />
                    <circle v-if="pt.active" :cx="pt.x" :cy="pt.y" r="8" fill="none" stroke="#6DF5E1" stroke-width="2.5" class="animate-pulse" />
                  </g>
                </svg>

                <!-- X Axis Labels -->
                <div class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium" style="margin-left: 20px; margin-right: 15px;">
                  <span v-for="(pt, idx) in ['Min 1', 'Min 2', 'Min 3', 'Min 4', 'Min 5']" :key="pt" :class="{ 'text-primary font-bold': idx === 3 }">{{ pt }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Log Aktivitas Terbaru -->
          <div class="card log-card">
            <h3>Log Aktivitas Terbaru</h3>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot dot-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="timeline-content">
                  <h4>Dosis Hari Ke-45 Dikonfirmasi</h4>
                  <p>Metode: Video Verifikasi (Score: 98.5%)</p>
                  <span class="timeline-time">Hari ini, 07:12</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot dot-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div class="timeline-content">
                  <h4>Kunjungan Rumah Kader</h4>
                  <p>Catatan: Kondisi pasien stabil.</p>
                  <span class="timeline-time">Kemarin, 16:30</span>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot dot-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div class="timeline-content">
                  <h4>Dosis Hari Ke-44 Terlewat</h4>
                  <p>Sistem mengirimkan pengingat.</p>
                  <span class="timeline-time">10 Jul 2026, 09:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (35%) -->
      <div class="right-col">

        <!-- Rekomendasi Tindakan -->
        <div class="card recommendation-card">
          <h3>Rekomendasi Tindakan</h3>
          <div class="action-buttons">
            <button class="btn btn-primary btn-action">
              <span>Kirim Pengingat</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button class="btn btn-outline btn-action">
              <span>Hubungi PMO</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button class="btn btn-outline btn-action">
              <span>Hubungi Kader</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div class="alert alert-danger">
            <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div class="alert-content">
              <h4>Perhatian</h4>
              <p>Pasien tidak merespon pengingat otomatis selama 48 jam terakhir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
/* CSS Reset / Base styles for component */
.treatment-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #334155;
  background-color: #F8FAFC;
  min-height: 100vh;
}

h2, h3, h4, p {
  margin: 0;
}

/* Colors */
:root {
  --primary: #006591;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg-card: #FFFFFF;
  --border-radius: 12px;
}

/* Utilities */
.card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #E2E8F0;
}

.text-sm { font-size: 0.875rem; }
.text-muted { color: #64748B; font-size: 0.875rem; margin-top: 4px; }
.text-success { color: #22C55E; }
.text-accent { color: #006591; } /* using primary color for accent text as teal might be hard to read on white */
.w-100 { width: 100%; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
  transition: all 0.2s;
}
.btn-primary {
  background-color: #006591;
  color: #FFFFFF;
}
.btn-primary:hover {
  background-color: #005378;
}
.btn-white {
  background-color: #FFFFFF;
  color: #006591;
}
.btn-outline {
  background-color: transparent;
  border: 1px solid #CBD5E1;
  color: #334155;
}
.btn-action {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

/* Badges */
.badge {
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 500;
}
.badge-accent {
  background-color: #E6FFFA;
  color: #006591;
}
.badge-success {
  background-color: #DCFCE7;
  color: #166534;
}

/* Profile Section */
.profile-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.profile-main {
  display: flex;
  gap: 16px;
  align-items: center;
}
.avatar {
  width: 64px;
  height: 64px;
  background-color: #F1F5F9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
}
.profile-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.profile-badges {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}

/* Info Cards */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.info-title {
  font-size: 0.875rem;
  color: #64748B;
  font-weight: 500;
}
.info-value {
  font-weight: 600;
  font-size: 0.875rem;
}
.progress-wrapper {
  background-color: #F1F5F9;
  border-radius: 99px;
  height: 8px;
  overflow: hidden;
  margin-bottom: 8px;
}
.progress-bar {
  width: 100%;
  height: 100%;
}
.progress-fill {
  height: 100%;
  background-color: #006591;
  border-radius: 99px;
}
.progress-fill.warning {
  background-color: #F59E0B;
}
.info-subtext {
  font-size: 0.75rem;
  color: #64748B;
}
.pmo-name, .dr-name {
  font-size: 1rem;
  margin-bottom: 4px;
}

/* Main Layout */
.main-content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.left-col {
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.right-col {
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.card-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

/* Calendar */
.calendar-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}
.weekday {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748B;
  padding-bottom: 8px;
}
.date {
  aspect-ratio: 1;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
}
.date.empty {
  border: none;
}
.date.success {
  border-color: #22C55E;
  color: #166534;
  background-color: #F0FDF4;
}
.date.danger {
  border-color: #EF4444;
  color: #991B1B;
  background-color: #FEF2F2;
}
.date.future {
  color: #94A3B8;
  background-color: #F8FAFC;
}
.date.success-solid {
  background-color: #22C55E;
  color: white;
  border-color: #22C55E;
}
.status-icon {
  margin-top: 4px;
}

.calendar-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.75rem;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-dark-green { background-color: #166534; }
.dot-teal { background-color: #006591; }
.dot-red { background-color: #EF4444; }
.dot-gray { background-color: #CBD5E1; }

/* Trend Chart */
.form-select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #CBD5E1;
  font-size: 0.875rem;
  background-color: white;
}
.trend-log-grid {
  display: flex;
  gap: 20px;
}
.trend-log-grid .trend-card {
  flex: 1.1;
  margin-bottom: 0;
}
.trend-log-grid .log-card {
  flex: 0.9;
  margin-bottom: 0;
}
@media (max-width: 991px) {
  .trend-log-grid {
    flex-direction: column;
  }
}

.area-chart-container {
  height: 220px;
  display: flex;
}
.area-chart-container .y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 24px;
  color: #64748B;
  font-size: 0.75rem;
  width: 36px;
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
  width: 100%;
}
.bar-inner {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}
.bar {
  width: 28px;
  background: linear-gradient(180deg, #0080B5 0%, #006591 100%);
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}
.bar:hover {
  background: linear-gradient(180deg, #6DF5E1 0%, #006591 100%);
  transform: scaleY(1.02);
}
.bar-active {
  background: linear-gradient(180deg, #006591 0%, #004D6E 100%);
  box-shadow: 0 4px 10px rgba(0, 101, 145, 0.3);
}
.bar-tooltip {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #1E293B;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.bar:hover .bar-tooltip {
  opacity: 1;
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

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}
.timeline-item {
  display: flex;
  gap: 12px;
}
.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}
.dot-success { background-color: #22C55E; }
.dot-primary { background-color: #006591; }
.dot-danger { background-color: #EF4444; }
.timeline-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.timeline-content p {
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 4px;
}
.timeline-time {
  font-size: 0.75rem;
  color: #94A3B8;
}

/* AI Insights */
.ai-card {
  background-color: #004D6E;
  color: white;
  border: none;
}
.ai-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.ai-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
}
.risk-section {
  margin-bottom: 20px;
}
.risk-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.875rem;
}
.progress-bar.dark {
  background-color: rgba(255,255,255,0.2);
}
.insight-list {
  padding-left: 20px;
  margin-bottom: 24px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #E2E8F0;
}
.insight-list li {
  margin-bottom: 12px;
}

/* Rekomendasi Tindakan */
.recommendation-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.alert {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  align-items: flex-start;
}
.alert-danger {
  background-color: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #991B1B;
}
.alert-icon {
  flex-shrink: 0;
  color: #EF4444;
}
.alert-content h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.alert-content p {
  font-size: 0.75rem;
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
  .left-col, .right-col {
    width: 100%;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .profile-card {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
