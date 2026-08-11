<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useDashboardStore } from '@/stores/dashboard'
import { useAuthStore } from '@/stores/auth'

import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'

const router = useRouter()

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()

// ========================================
// Navigation
// ========================================

const goToPatients = () => {
  router.push('/dashboard/patients')
}

const goToNewPatient = () => {
  router.push('/dashboard/patients/add')
}

const goToReports = () => {
  router.push('/dashboard/reports')
}

const goToMedicines = () => {
  router.push('/dashboard/medicines')
}

const goToPatientDetail = (id) => {
  router.push(`/dashboard/patients/${id}`)
}

// ========================================
// Dashboard Statistics
// ========================================

const patientStats = computed(() => {
  const stats = dashboardStore.statistics || {}

  return [
    {
      label: 'Pasien Aktif',
      value: stats.active_patients ?? 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`,
      color: '#006591',
      bgColor: '#e6f0f4'
    },

    {
      label: 'Kepatuhan Obat',
      value: `${stats.compliance_rate ?? 0}%`,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <polyline points="9 14 11 16 15 11"></polyline>
      </svg>`,
      color: '#22C55E',
      bgColor: '#dcfce7'
    },

    {
      label: 'Risiko Tinggi',
      value: stats.high_risk_patients ?? 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      color: '#EF4444',
      bgColor: '#fee2e2'
    },

    {
      label: 'Keluhan Hari Ini',
      value: stats.today_complaints ?? 0,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>`,
      color: '#F59E0B',
      bgColor: '#fef3c7'
    },

    {
      label: 'Stok OAT Kritis',
      value: `${stats.critical_medicine_stock ?? 0} Items`,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>`,
      color: '#EF4444',
      bgColor: '#fee2e2'
    }
  ]
})

// ========================================
// Risk Patients
// ========================================

const riskPatients = computed(() => {
  return dashboardStore.statistics?.risk_patients || []
})

// ========================================
// Recent Activities
// ========================================

const recentActivities = computed(() => {
  return dashboardStore.recentActivities || []
})

// ========================================
// OAT Stock
// ========================================

const oatStocks = computed(() => {
  return dashboardStore.medicineWarnings || []
})

// ========================================
// Compliance Chart
// ========================================

const complianceTrend = computed(() => {
  return dashboardStore.complianceChart || []
})

// ========================================
// Loading
// ========================================

const isLoading = computed(() => {
  return dashboardStore.loading
})

// ========================================
// Current User
// ========================================

const currentUserName = computed(() => {
  return (
    authStore.user?.name ||
    authStore.user?.username ||
    'Nakes'
  )
})

// ========================================
// Fetch Dashboard
// ========================================

onMounted(async () => {
  try {
    await dashboardStore.fetchAll()
  } catch (error) {
    console.error('Dashboard loading failed:', error)
  }
})
</script>


<template>
  <div class="dashboard-container">

    <!-- ======================================== -->
    <!-- Loading -->
    <!-- ======================================== -->

    <div
      v-if="isLoading"
      class="dashboard-loading"
    >
      Memuat dashboard...
    </div>


    <!-- ======================================== -->
    <!-- Hero -->
    <!-- ======================================== -->

    <div class="hero-banner">

      <div class="hero-content">

        <h1 class="hero-title">
          Selamat Datang, {{ currentUserName }}
        </h1>

        <h2 class="hero-subtitle">
          Dashboard Nakes
        </h2>

        <p class="hero-desc">
          Pantau perkembangan kesehatan pasien TB secara real-time
          dan pastikan ketersediaan obat tercukupi.
        </p>

        <div class="hero-actions">

          <button
            class="btn btn-primary-inv"
            @click="goToNewPatient"
          >
            Kelola Pasien Baru
          </button>

          <button
            class="btn btn-outline-white"
            @click="goToReports"
          >
            Lihat Laporan Bulanan
          </button>

        </div>

      </div>

      <div class="hero-image-wrapper">
        <img
          :src="mobiledoctorIMG"
          alt="Healthcare Team"
          class="hero-image"
        />
      </div>

    </div>


    <!-- ======================================== -->
    <!-- Statistics -->
    <!-- ======================================== -->

    <div class="stats-grid">

      <div
        v-for="(stat, index) in patientStats"
        :key="index"
        class="stat-card"
      >

        <div
          class="stat-icon-wrapper"
          :style="{
            backgroundColor: stat.bgColor,
            color: stat.color
          }"
          v-html="stat.icon"
        ></div>

        <div class="stat-info">

          <div class="stat-label">
            {{ stat.label }}
          </div>

          <div class="stat-value">
            {{ stat.value }}
          </div>

        </div>

      </div>

    </div>


    <!-- ======================================== -->
    <!-- Middle Row -->
    <!-- ======================================== -->

    <div class="middle-row">

      <!-- Risk Patients -->

      <div class="card risk-card">

        <div class="card-header">

          <div class="card-title">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F59E0B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>

            Pasien Berisiko Putus Obat

          </div>

          <a
            href="#"
            class="link-view-all"
            @click.prevent="goToPatients"
          >
            Lihat Semua
          </a>

        </div>


        <div class="risk-content">

          <div class="risk-chart-section">

            <div class="donut-chart-container">

              <div class="donut-chart">

                <div class="donut-inner-text">

                  <span class="donut-percent">
                    {{ dashboardStore.statistics?.total_patients ?? 0 }}
                  </span>

                  <span class="donut-label">
                    TOTAL PASIEN
                  </span>

                </div>

              </div>

            </div>


            <div class="risk-legend">

              <div class="legend-item">
                <span class="dot dot-danger"></span>
                Tinggi:
                {{ dashboardStore.statistics?.high_risk_patients ?? 0 }}
              </div>

              <div class="legend-item">
                <span class="dot dot-warning"></span>
                Sedang:
                {{ dashboardStore.statistics?.medium_risk_patients ?? 0 }}
              </div>

              <div class="legend-item">
                <span class="dot dot-primary"></span>
                Rendah:
                {{ dashboardStore.statistics?.low_risk_patients ?? 0 }}
              </div>

            </div>

          </div>


          <div class="risk-list">

            <div
              v-for="patient in riskPatients"
              :key="patient.id"
              class="risk-item cursor-pointer"
              @click="goToPatientDetail(patient.id)"
            >

              <div class="risk-avatar">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>

              </div>

              <div class="risk-info">

                <div class="risk-name">
                  {{ patient.name }}
                </div>

                <div class="risk-reason">
                  {{ patient.reason }}
                </div>

              </div>

              <div
                class="risk-badge"
                :class="'badge-' + patient.levelColor"
              >
                {{ patient.level }}
              </div>

              <button
                class="btn-phone"
                @click.stop="alert('Menghubungi ' + patient.name)"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>

              </button>

            </div>

            <div
              v-if="riskPatients.length === 0"
              class="empty-state"
            >
              Tidak ada pasien berisiko.
            </div>

          </div>

        </div>

      </div>

    </div>


    <!-- ======================================== -->
    <!-- Bottom Row -->
    <!-- ======================================== -->

    <div class="bottom-row">

      <!-- Compliance -->

      <div class="card chart-card">

        <div class="chart-header flex justify-between items-start mb-4">

          <div>

            <div class="card-title">
              Tren Kepatuhan Pasien
            </div>

            <p class="chart-subtitle text-xs text-secondary mt-1">
              Persentase kepatuhan harian
            </p>

          </div>

          <div class="text-right">

            <div
              class="text-2xl font-bold"
              style="color: #1E293B;"
            >
              {{ dashboardStore.statistics?.compliance_rate ?? 0 }}%

              <span
                class="text-xs font-normal"
                style="color: #64748B;"
              >
                Rata-rata
              </span>

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

            <div
              class="chart-grid-lines absolute inset-0 flex flex-col justify-between pointer-events-none"
            >
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
              <div class="grid-line border-b border-dashed border-gray-200"></div>
            </div>


            <svg
              viewBox="0 0 480 160"
              class="w-full h-full relative z-10 overflow-visible"
            >

              <defs>

                <linearGradient
                  id="dashComplianceGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="#006591"
                    stop-opacity="0.38"
                  />

                  <stop
                    offset="100%"
                    stop-color="#006591"
                    stop-opacity="0.02"
                  />

                </linearGradient>

              </defs>


              <path
                d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6 L 450 160 L 30 160 Z"
                fill="url(#dashComplianceGradient)"
              />


              <path
                d="M 30 45 C 65 45, 65 27, 100 27 C 135 27, 135 9, 170 9 C 205 9, 205 72, 240 72 C 275 72, 275 36, 310 36 C 345 36, 345 18, 380 18 C 415 18, 415 3.6, 450 3.6"
                fill="none"
                stroke="#006591"
                stroke-width="3"
                stroke-linecap="round"
              />

            </svg>


            <div
              class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium"
              style="margin-left: 20px; margin-right: 15px;"
            >

              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>

            </div>

          </div>

        </div>

      </div>


      <!-- Recent Activities -->

      <div class="card timeline-card">

        <div class="card-title mb-4">
          Aktivitas Terbaru
        </div>

        <div class="timeline">

          <div
            v-for="act in recentActivities"
            :key="act.id"
            class="timeline-item"
          >

            <div
              class="timeline-dot"
              :class="'bg-' + act.type"
            ></div>

            <div class="timeline-content">

              <p class="timeline-text">
                {{ act.text }}
              </p>

              <span class="timeline-time">
                {{ act.time }}
              </span>

            </div>

          </div>

          <div
            v-if="recentActivities.length === 0"
            class="empty-state"
          >
            Belum ada aktivitas terbaru.
          </div>

        </div>

      </div>


      <!-- OAT Stock -->

      <div class="card stock-card">

        <div class="card-title mb-4">
          Stok OAT
        </div>

        <div class="stock-list">

          <div
            v-for="(stock, index) in oatStocks"
            :key="stock.id || index"
            class="stock-item"
          >

            <div class="stock-header">

              <span class="stock-name">
                {{ stock.name }}
              </span>

              <span
                class="stock-status"
                :class="'text-' + (stock.colorClass || 'success').replace('bg-', '')"
              >
                {{ stock.status }}
              </span>

            </div>

            <div class="progress-bar-bg">

              <div
                class="progress-bar"
                :class="stock.colorClass || 'bg-success'"
                :style="{ width: `${stock.percent ?? 0}%` }"
              ></div>

            </div>

            <div
              class="text-xs text-secondary flex justify-between mt-0.5 font-medium"
            >

              <span>
                {{ stock.subtext || '' }}
              </span>

              <span>
                {{ stock.percent ?? 0 }}%
              </span>

            </div>

          </div>

          <div
            v-if="oatStocks.length === 0"
            class="empty-state"
          >
            Belum ada data stok OAT.
          </div>

        </div>


        <button
          class="btn btn-primary btn-full mt-auto"
          @click="goToMedicines"
        >
          Permintaan Restock OAT
        </button>

      </div>

    </div>

  </div>
</template>

<style scoped>
/* Variables based on design system */
:root {
  --primary: #006591;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --bg-color: #F8FAFC;
  --card-bg: #FFFFFF;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
}

/* Base Styles */
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: #F8FAFC;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-title {
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0f172a;
}

.mb-4 { margin-bottom: 16px; }
.mt-auto { margin-top: auto; }

/* Text Colors */
.text-primary { color: #006591; }
.text-success { color: #22C55E; }
.text-warning { color: #F59E0B; }
.text-danger { color: #EF4444; }

.bg-primary { background-color: #006591; }
.bg-success { background-color: #22C55E; }
.bg-warning { background-color: #F59E0B; }
.bg-danger { background-color: #EF4444; }

/* Buttons */
.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-primary-inv {
  background: white;
  color: #006591;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.btn-primary-inv:hover {
  background: #f8fafc;
}

.btn-outline-white {
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.6);
}
.btn-outline-white:hover {
  background: rgba(255,255,255,0.1);
}

.btn-outline-primary {
  background: transparent;
  color: #006591;
  border: 1px solid #006591;
}
.btn-outline-primary:hover {
  background: #f0f7f9;
}

.btn-gradient {
  background: linear-gradient(135deg, #006591 0%, #6DF5E1 100%);
  color: white;
}
.btn-gradient:hover {
  opacity: 0.9;
}

.btn-full {
  width: 100%;
}

/* 1. Hero Banner */
.hero-banner {
  background: linear-gradient(135deg, #0ea5e9 100%);
  border-radius: 16px;
  display: flex;
  overflow: hidden;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.hero-content {
  flex: 1;
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 400;
  opacity: 0.9;
  margin: 0 0 16px 0;
}

.hero-desc {
  font-size: 15px;
  opacity: 0.8;
  max-width: 500px;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.hero-image-wrapper {
  width: 35%;
  position: relative;
  display: none;
}

@media(min-width: 768px) {
  .hero-image-wrapper {
    display: block;
  }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

/* 2. Stats Grid */
.stats-grid {
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
  transition: transform 0.2s;
}
.stat-card:hover {
  transform: translateY(-2px);
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

/* 3. Middle Row */
.middle-row {
  display: flex;
  gap: 24px;
  flex-direction: column;
}

@media(min-width: 992px) {
  .middle-row {
    flex-direction: row;
  }
  .risk-card { width: 100%; }
}

.link-view-all {
  color: #006591;
  font-size: 14px;
  text-decoration: none;
  font-weight: 500;
}
.link-view-all:hover {
  text-decoration: underline;
}

.risk-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media(min-width: 768px) {
  .risk-content {
    flex-direction: row;
    align-items: center;
  }
}

.risk-chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #e2e8f0;
  padding-right: 20px;
}
@media(max-width: 767px) {
  .risk-chart-section {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding-right: 0;
    padding-bottom: 20px;
  }
}

/* Donut Chart CSS */
.donut-chart-container {
  width: 140px;
  height: 140px;
  margin-bottom: 20px;
}
.donut-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#EF4444 0% 3%, #F59E0B 3% 13%, #006591 13% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.donut-inner-text {
  width: 105px;
  height: 105px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}
.donut-percent {
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
}
.donut-label {
  font-size: 10px;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.risk-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot-danger { background-color: #EF4444; }
.dot-warning { background-color: #F59E0B; }
.dot-success { background-color: #22C55E; }
.dot-primary { background-color: #006591; }

.risk-list {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.risk-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #f1f5f9;
  border-radius: 8px;
  background: #f8fafc;
}
.risk-avatar {
  width: 40px;
  height: 40px;
  background: #e6f0f4;
  color: #006591;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}
.risk-info {
  flex: 1;
}
.risk-name {
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
}
.risk-reason {
  font-size: 12px;
  color: #64748b;
}
.risk-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-right: 12px;
}
.badge-danger { background: #fee2e2; color: #b91c1c; }
.badge-warning { background: #fef3c7; color: #b45309; }

.btn-phone {
  background: white;
  border: 1px solid #e2e8f0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-phone:hover {
  background: #f1f5f9;
  color: #006591;
}

/* AI Verification */
.ai-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.ai-main-stat {
  display: flex;
  flex-direction: column;
}
.ai-number {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.ai-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}
.ai-sub-stats {
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.divider {
  border: 0;
  border-top: 1px dashed #e2e8f0;
  margin: 16px 0;
}
.ai-terbaru-label {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}
.ai-recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.ai-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}
.ai-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.ai-item-info {
  display: flex;
  flex-direction: column;
}
.ai-item-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}
.ai-item-time {
  font-size: 12px;
  color: #94a3b8;
}
.ai-status {
  font-size: 13px;
  font-weight: 600;
}

/* 4. Bottom Row */
.bottom-row {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
@media(min-width: 992px) {
  .bottom-row {
    flex-direction: row;
  }
  .bottom-row > * {
    flex: 1;
  }
}

/* Area Chart */
.chart-card {
  padding-bottom: 20px;
}
.area-chart-container {
  height: 200px;
  width: 100%;
  display: flex;
}
.chart-area-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chart-area-wrapper svg {
  height: 150px;
  width: 100%;
}
.x-axis-row {
  margin-top: 8px;
  margin-bottom: 4px;
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
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12%;
  height: 100%;
}
.bar-wrapper {
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
.bar-label {
  margin-top: 8px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-left: 12px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 8px;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}
.timeline-item {
  display: flex;
  position: relative;
  gap: 16px;
}
.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  position: relative;
  z-index: 1;
}
.timeline-dot.bg-primary { background: #006591; }
.timeline-dot.bg-danger { background: #EF4444; }
.timeline-dot.bg-success { background: #22C55E; }

.timeline-content {
  flex: 1;
}
.timeline-text {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #334155;
  line-height: 1.4;
}
.timeline-time {
  font-size: 12px;
  color: #94a3b8;
}

/* Stock Card */
.stock-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}
.stock-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.stock-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.stock-name {
  font-weight: 500;
  color: #1e293b;
}
.stock-status {
  font-weight: 600;
  color: #64748b;
}
.progress-bar-bg {
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>
