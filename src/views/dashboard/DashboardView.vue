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
  donutGradient,
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
  getTrendLabel,
  getInitials,
  formatActivityDate,
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
          <div class="stat-value" :class="{ 'stat-value-text': isNaN(stat.value) && stat.value.length > 5 }">
            {{ stat.value }}
          </div>
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
              <div class="donut-chart" :style="{ background: donutGradient }">
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
              <div class="risk-patient-avatar">
                {{ getInitials(patient.name) }}
              </div>
              <div class="risk-patient-info">
                <div class="risk-patient-name">{{ patient.name }}</div>
                <div class="risk-patient-sub">
                  <span>NIK: {{ patient.nik }}</span>
                </div>
              </div>
            </div>

            <div v-if="riskPatients.length === 0" class="empty-monitoring">
              <div v-if="summary.active_patients === 0" class="empty-monitoring-title">
                Belum ada pasien aktif
              </div>
              <template v-else>
                <div class="empty-monitoring-title">Belum ada data monitoring pasien</div>
                <div class="empty-monitoring-sub">Data monitoring akan muncul setelah pasien memiliki aktivitas pengobatan.</div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card action-card">
        <div class="card-title mb-3">Aksi Cepat</div>
        <div class="action-buttons-grid">
          <button class="btn btn-action-card" @click="goToNewPatient">
            <div class="action-icon-circle bg-blue-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Daftarkan Pasien Baru</div>
              <div class="action-desc">Registrasi & skrining awal pasien TB</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="btn btn-action-card" @click="goToMedicines">
            <div class="action-icon-circle bg-green-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Logistik & Distribusi OAT</div>
              <div class="action-desc">Kelola stok dan permintaan obat</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="btn btn-action-card" @click="goToReports">
            <div class="action-icon-circle bg-amber-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Rekap Laporan SITARA</div>
              <div class="action-desc">Unduh kohort & indikator program</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
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
              <template v-else><span class="text-base font-medium" style="color: #64748B;">Belum ada data konsumsi</span></template>
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
              <p class="timeline-text">{{ act.title || act.text || act.message }}</p>
              <span class="timeline-time">{{ formatActivityDate(act.created_at || act.time) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./DashboardView.css"></style>
