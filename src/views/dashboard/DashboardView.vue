<script setup>
import './DashboardView.css'
import { useDashboardView } from './DashboardView.js'

const {
  mobiledoctorIMG,
  goToPatients,
  goToNewPatient,
  goToReports,
  goToMedicines,
  goToPatientDetail,
  summary,
  statusData,
  risk,
  adherenceTrend,
  recentActivities,
  patientStats,
  riskPatients,
  isLoading,
  currentUserName,
  complianceAverage,
  hasTrendData,
  getTrendValue,
  getTrendLabel
} = useDashboardView()
</script>

<template>
  <div class="dashboard-container">
    <!-- Loading -->
    <div v-if="isLoading" class="dashboard-loading">
      Memuat dashboard...
    </div>

    <!-- Hero -->
    <div class="hero-banner">
      <div class="hero-content">
        <h1 class="hero-title">
          Selamat Datang, {{ currentUserName }}
        </h1>
        <h2 class="hero-subtitle">
          Dashboard Nakes
        </h2>
        <p class="hero-desc">
          Pantau perkembangan kesehatan pasien TB secara real-time dan pastikan ketersediaan obat tercukupi.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary-inv" @click="goToNewPatient">
            Kelola Pasien Baru
          </button>
          <button class="btn btn-outline-white" @click="goToReports">
            Lihat Laporan Bulanan
          </button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img :src="mobiledoctorIMG" alt="Healthcare Team" class="hero-image" />
      </div>
    </div>

    <!-- Statistics -->
    <div class="stats-grid">
      <div v-for="(stat, index) in patientStats" :key="index" class="stat-card">
        <div
          class="stat-icon-wrapper"
          :style="{
            backgroundColor: stat.bgColor,
            color: stat.color
          }"
          v-html="stat.icon"
        ></div>
        <div class="stat-info">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </div>
    </div>

    <!-- Middle Row: Distribution & Monitoring -->
    <div class="middle-row">
      <div class="card risk-card">
        <div class="card-header">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#006591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Distribusi Status & Monitoring Pasien
          </div>
          <a href="#" class="link-view-all" @click.prevent="goToPatients">
            Lihat Semua
          </a>
        </div>

        <div class="risk-content">
          <!-- Donut Chart -->
          <div class="risk-chart-section">
            <div class="donut-chart-container">
              <div class="donut-chart">
                <div class="donut-inner-text">
                  <span class="donut-percent">{{ summary.active_patients || 0 }}</span>
                  <span class="donut-label">TOTAL PASIEN</span>
                </div>
              </div>
            </div>

            <div class="risk-legend">
              <div class="legend-item"><span class="dot dot-primary"></span>Aktif Terapi: {{ statusData.active }}</div>
              <div class="legend-item"><span class="dot dot-success"></span>Selesai: {{ statusData.completed }}</div>
            </div>
          </div>

          <!-- Monitored/Risk Patient List -->
          <div class="risk-list">
            <div
              v-for="patient in riskPatients"
              :key="patient.id"
              class="risk-item cursor-pointer"
              @click="goToPatientDetail(patient.id)"
            >
              <div class="risk-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>

              <div class="risk-info">
                <div class="risk-name">{{ patient.name }}</div>
                <div class="risk-reason">{{ patient.reason }}</div>
              </div>

              <div class="risk-badge" :class="'badge-' + (patient.badgeColor || patient.levelColor || 'primary')">
                {{ patient.badge || patient.level || 'Aktif' }}
              </div>

              <button
                v-if="patient.phone"
                class="btn-phone"
                @click.stop="window.location.href = `tel:${patient.phone}`"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </div>

            <div v-if="riskPatients.length === 0" class="empty-state">
              Belum ada daftar monitoring pasien.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Compliance Chart & Recent Activities -->
    <div class="bottom-row">
      <!-- Compliance Chart -->
      <div class="card chart-card">
        <div class="chart-header flex justify-between items-start mb-4">
          <div>
            <div class="card-title">Tren Kepatuhan Pasien</div>
            <p class="chart-subtitle text-xs text-secondary mt-1">Persentase kepatuhan harian (7 Hari Terakhir)</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold" style="color: #1E293B;">
              <template v-if="complianceAverage !== null">{{ complianceAverage }}% <span class="text-xs font-normal" style="color: #64748B;">Rata-rata</span></template>
              <template v-else><span class="text-base font-medium" style="color: #64748B;">Belum ada data</span></template>
            </div>
            <div v-if="complianceAverage !== null" class="text-xs font-semibold flex items-center justify-end gap-1 mt-0.5" style="color: #22C55E;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <span>Target &ge; 90%</span>
            </div>
          </div>
        </div>

        <div v-if="!hasTrendData" class="empty-state">
          Belum ada data tren kepatuhan.
        </div>

        <div v-else class="area-chart-container">
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
              <polyline
                :points="
                  adherenceTrend
                    .map((item, index) => {
                      const value = Math.max(0, Math.min(100, getTrendValue(item)))
                      const x = adherenceTrend.length === 1 ? 240 : 30 + (index / (adherenceTrend.length - 1)) * 420
                      const y = 160 - (value / 100) * 150
                      return `${x},${y}`
                    })
                    .join(' ')
                "
                fill="none"
                stroke="#006591"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium" style="margin-left: 20px; margin-right: 15px;">
              <span v-for="(item, index) in adherenceTrend" :key="index">
                {{ getTrendLabel(item, index) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="card timeline-card">
        <div class="card-title mb-4">Aktivitas Terbaru</div>
        <div class="timeline">
          <div v-if="recentActivities.length === 0" class="text-sm text-secondary py-4 text-center">
            Belum ada aktivitas terbaru hari ini.
          </div>
          <div v-for="(act, index) in recentActivities" :key="act.id || index" class="timeline-item">
            <div class="timeline-dot" :class="'bg-' + (act.type || 'primary')"></div>
            <div class="timeline-content">
              <p class="timeline-text">{{ act.text || act.message || act.title }}</p>
              <span class="timeline-time">{{ act.time || act.created_at }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./DashboardView.css"></style>
