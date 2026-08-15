<script src="./DashboardView.js"></script>

<template>
  <div class="dashboard-container">
    <!-- 1. Hero Welcome Banner -->
    <div class="hero-banner">
      <div class="hero-content">
        <h1 class="hero-title">Selamat Datang, Admin</h1>
        <h2 class="hero-subtitle">Puskesmas Sukajadi</h2>
        <p class="hero-desc">
          Pantau perkembangan kesehatan pasien TB secara real-time dan pastikan ketersediaan obat tercukupi untuk wilayah Anda.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary-inv" @click="goToNewPatient">Kelola Pasien Baru</button>
          <button class="btn btn-outline-white" @click="goToReports">Lihat Laporan Bulanan</button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img :src="mobiledoctorIMG" alt="Healthcare Team" class="hero-image" />
      </div>
    </div>

    <!-- 2. Statistic Cards Row -->
    <div class="stats-grid">
      <div v-for="(stat, index) in patientStats" :key="index" class="stat-card">
        <div class="stat-icon-wrapper" :style="{ backgroundColor: stat.bgColor, color: stat.color }" v-html="stat.icon"></div>
        <div class="stat-info">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>
    </div>

    <!-- 3. Middle Row -->
    <div class="middle-row">
      <!-- Left: Pasien Berisiko -->
      <div class="card risk-card">
        <div class="card-header">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Pasien Berisiko Putus Obat
          </div>
          <a href="#" class="link-view-all" @click.prevent="goToPatients">Lihat Semua</a>
        </div>
        
        <div class="risk-content">
          <div class="risk-chart-section">
            <div class="donut-chart-container">
              <div class="donut-chart">
                <div class="donut-inner-text">
                  <span class="donut-percent">{{ summary.active_patients }}</span>
                  <span class="donut-label">TOTAL PASIEN</span>
                </div>
              </div>
            </div>
            <div class="risk-legend">
              <div class="legend-item"><span class="dot dot-danger"></span>Tinggi: {{ riskData.high }}</div>
              <div class="legend-item"><span class="dot dot-warning"></span>Sedang: {{ riskData.medium }}</div>
              <div class="legend-item"><span class="dot dot-primary"></span>Rendah: {{ riskData.low }}</div>
            </div>
          </div>

          <div class="risk-list">
            <div v-for="patient in riskPatients" :key="patient.id" class="risk-item cursor-pointer" @click="goToPatientDetail(patient.id)">
              <div class="risk-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <div class="risk-info">
                <div class="risk-name">{{ patient.name }}</div>
                <div class="risk-reason">{{ patient.reason }}</div>
              </div>
              <div class="risk-badge" :class="'badge-' + patient.levelColor">
                {{ patient.level }}
              </div>
              <button class="btn-phone" @click.stop="alert('Menghubungi ' + patient.name)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 4. Bottom Row -->
    <div class="bottom-row">
      <!-- Left: Tren Kepatuhan -->
      <div class="card chart-card">
        <div class="chart-header flex justify-between items-start mb-4">
          <div>
            <div class="card-title">Tren Kepatuhan Pasien</div>
            <p class="chart-subtitle text-xs text-secondary mt-1">Persentase kepatuhan harian (7 Hari Terakhir)</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">{{ summary.medication_adherence }}% <span class="text-xs font-normal" style="color: #64748B;">Rata-rata</span></div>
            <div class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>Target &ge; 90%</span>
            </div>
          </div>
        </div>
        
        <div class="area-chart-container">
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
                <linearGradient id="dashComplianceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#006591" stop-opacity="0.38" />
                  <stop offset="100%" stop-color="#006591" stop-opacity="0.02" />
                </linearGradient>
              </defs>
              
              <!-- Area fill under curve -->
              <path d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6 L 450 160 L 30 160 Z" fill="url(#dashComplianceGradient)" />
              
              <!-- Smooth Curve Line -->
              <path d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6" fill="none" stroke="#006591" stroke-width="3" stroke-linecap="round" />
              
              <!-- Points -->
              <g class="chart-point-group" v-for="(pt, i) in [
                {x: 30, y: 45, val: 75},
                {x: 100, y: 27, val: 85},
                {x: 170, y: 9, val: 95},
                {x: 240, y: 72, val: 60},
                {x: 310, y: 36, val: 80},
                {x: 380, y: 18, val: 90},
                {x: 450, y: 3.6, val: 98, active: true}
              ]" :key="i">
                <circle :cx="pt.x" :cy="pt.y" r="5" fill="#FFFFFF" stroke="#006591" stroke-width="3" class="chart-point cursor-pointer transition-transform hover:scale-125" />
                <circle v-if="pt.active" :cx="pt.x" :cy="pt.y" r="8" fill="none" stroke="#6DF5E1" stroke-width="2.5" class="animate-pulse" />
              </g>
            </svg>

            <!-- X Axis Labels -->
            <div class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium" style="margin-left: 20px; margin-right: 15px;">
              <span v-for="pt in ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']" :key="pt" :class="{ 'text-primary font-bold': pt === 'Min' }">{{ pt }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Aktivitas Terbaru -->
      <div class="card timeline-card">
        <div class="card-title mb-4">Aktivitas Terbaru</div>
        <div class="timeline">
          <div v-if="recentActivities.length === 0" class="text-sm text-secondary py-4 text-center">
            Belum ada aktivitas terbaru hari ini.
          </div>
          <div v-for="act in recentActivities" :key="act.id" class="timeline-item">
            <div class="timeline-dot" :class="'bg-' + act.type"></div>
            <div class="timeline-content">
              <p class="timeline-text">{{ act.text }}</p>
              <span class="timeline-time">{{ act.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./DashboardView.css"></style>

