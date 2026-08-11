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
// Dashboard Data
// ========================================

const summary = computed(() => {
  return dashboardStore.dashboard?.summary || {
    active_patients: 0,
    medication_adherence: 0,
    high_risk_patients: 0,
    today_complaints: 0,
    critical_stock_items: 0
  }
})

const risk = computed(() => {
  return dashboardStore.dashboard?.risk || {
    high: 0,
    medium: 0,
    low: 0
  }
})

const adherenceTrend = computed(() => {
  return dashboardStore.dashboard?.adherence_trend || []
})

const recentActivities = computed(() => {
  return dashboardStore.dashboard?.recent_activities || []
})

const criticalStock = computed(() => {
  return dashboardStore.dashboard?.critical_stock || []
})

// ========================================
// Statistics Cards
// ========================================

const patientStats = computed(() => {
  return [
    {
      label: 'Pasien Aktif',
      value: summary.value.active_patients,

      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      `,

      color: '#006591',
      bgColor: '#e6f0f4'
    },

    {
      label: 'Kepatuhan Obat',
      value: `${summary.value.medication_adherence}%`,

      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1"></rect>
          <polyline points="9 14 11 16 15 11"></polyline>
        </svg>
      `,

      color: '#22C55E',
      bgColor: '#dcfce7'
    },

    {
      label: 'Risiko Tinggi',
      value: summary.value.high_risk_patients,

      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `,

      color: '#EF4444',
      bgColor: '#fee2e2'
    },

    {
      label: 'Keluhan Hari Ini',
      value: summary.value.today_complaints,

      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      `,

      color: '#F59E0B',
      bgColor: '#fef3c7'
    },

    {
      label: 'Stok OAT Kritis',
      value: `${summary.value.critical_stock_items} Items`,

      icon: `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      `,

      color: '#EF4444',
      bgColor: '#fee2e2'
    }
  ]
})

// ========================================
// Risk Patients
// ========================================
//
// Backend saat ini hanya mengirim:
//
// "risk": {
//   "high": 0,
//   "medium": 0,
//   "low": 1
// }
//
// Belum ada daftar pasien.
// Jadi jangan membuat data pasien dummy.
//

const riskPatients = computed(() => {
  return dashboardStore.dashboard?.risk_patients || []
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
// Compliance
// ========================================

const complianceAverage = computed(() => {
  return summary.value.medication_adherence ?? 0
})

// ========================================
// Helper - Get trend value
// ========================================

const getTrendValue = (item) => {
  if (typeof item === 'number') {
    return item
  }

  return (
    item?.value ??
    item?.adherence ??
    item?.medication_adherence ??
    item?.percentage ??
    0
  )
}

// ========================================
// Helper - Get trend label
// ========================================

const getTrendLabel = (item, index) => {
  if (item?.label) {
    return item.label
  }

  if (item?.date) {
    const date = new Date(item.date)

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('id-ID', {
        weekday: 'short'
      })
    }
  }

  const labels = [
    'Sen',
    'Sel',
    'Rab',
    'Kam',
    'Jum',
    'Sab',
    'Min'
  ]

  return labels[index] || ''
}

// ========================================
// Fetch Dashboard
// ========================================

onMounted(async () => {
  try {
    await dashboardStore.fetchDashboard()
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
    <!-- Risk Section -->
    <!-- ======================================== -->

    <div class="middle-row">

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

          <!-- Risk Chart -->

          <div class="risk-chart-section">

            <div class="donut-chart-container">

              <div class="donut-chart">

                <div class="donut-inner-text">

                  <span class="donut-percent">
                    {{ summary.active_patients }}
                  </span>

                  <span class="donut-label">
                    PASIEN AKTIF
                  </span>

                </div>

              </div>

            </div>


            <div class="risk-legend">

              <div class="legend-item">

                <span class="dot dot-danger"></span>

                Tinggi:
                {{ risk.high }}

              </div>

              <div class="legend-item">

                <span class="dot dot-warning"></span>

                Sedang:
                {{ risk.medium }}

              </div>

              <div class="legend-item">

                <span class="dot dot-primary"></span>

                Rendah:
                {{ risk.low }}

              </div>

            </div>

          </div>


          <!-- Risk Patient List -->


          <!-- Risk Patient List -->

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
                :class="'badge-' + (patient.levelColor || 'warning')"
              >
                {{ patient.level }}
              </div>

              <button
                v-if="patient.phone"
                class="btn-phone"
                @click.stop="window.location.href = `tel:${patient.phone}`"
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
              Belum ada daftar pasien berisiko.

              <br />

              <small>
                Data risiko tersedia: {{ risk.high }} tinggi,
                {{ risk.medium }} sedang,
                {{ risk.low }} rendah.
              </small>
            </div>

          </div>

        </div>

      </div>

    </div>


    <!-- ======================================== -->
    <!-- Bottom Row -->
    <!-- ======================================== -->

    <div class="bottom-row">


      <!-- ======================================== -->
      <!-- Compliance Chart -->
      <!-- ======================================== -->

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

              {{ complianceAverage }}%

              <span
                class="text-xs font-normal"
                style="color: #64748B;"
              >
                Rata-rata
              </span>

            </div>

          </div>

        </div>


        <!-- Empty -->

        <div
          v-if="adherenceTrend.length === 0"
          class="empty-state"
        >
          Belum ada data tren kepatuhan.
        </div>


        <!-- Chart -->

        <div
          v-else
          class="area-chart-container"
        >

          <div
            class="y-axis text-xs text-secondary flex flex-col justify-between pr-2"
          >
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

              <polyline
                :points="
                  adherenceTrend
                    .map((item, index) => {
                      const value = Math.max(
                        0,
                        Math.min(100, getTrendValue(item))
                      )

                      const x =
                        adherenceTrend.length === 1
                          ? 240
                          : 30 +
                            (index /
                              (adherenceTrend.length - 1)) *
                              420

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


            <div
              class="x-axis-row flex justify-between px-4 mt-2 text-xs text-secondary font-medium"
              style="margin-left: 20px; margin-right: 15px;"
            >

              <span
                v-for="(item, index) in adherenceTrend"
                :key="index"
              >
                {{ getTrendLabel(item, index) }}
              </span>

            </div>

          </div>

        </div>

      </div>


      <!-- ======================================== -->
      <!-- Recent Activities -->
      <!-- ======================================== -->

      <div class="card timeline-card">

        <div class="card-title mb-4">
          Aktivitas Terbaru
        </div>

        <div class="timeline">

          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="timeline-item"
          >

            <div
              class="timeline-dot"
              :class="'bg-' + (activity.type || 'primary')"
            ></div>

            <div class="timeline-content">

              <p class="timeline-text">
                {{ activity.text || activity.message }}
              </p>

              <span class="timeline-time">
                {{ activity.time || activity.created_at }}
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


      <!-- ======================================== -->
      <!-- Critical Stock -->
      <!-- ======================================== -->

      <div class="card stock-card">

        <div class="card-title mb-4">
          Stok OAT
        </div>

        <div class="stock-list">

          <div
            v-for="(stock, index) in criticalStock"
            :key="stock.id || index"
            class="stock-item"
          >

            <div class="stock-header">

              <span class="stock-name">
                {{ stock.name || stock.medicine_name }}
              </span>

              <span class="stock-status">
                {{ stock.status || 'Kritis' }}
              </span>

            </div>


            <div class="progress-bar-bg">

              <div
                class="progress-bar"
                :style="{
                  width: `${Math.max(
                    0,
                    Math.min(100, stock.percent ?? stock.percentage ?? 0)
                  )}%`
                }"
              ></div>

            </div>


            <div
              class="text-xs text-secondary flex justify-between mt-0.5 font-medium"
            >

              <span>
                {{ stock.subtext || stock.quantity || '' }}
              </span>

              <span>
                {{ stock.percent ?? stock.percentage ?? 0 }}%
              </span>

            </div>

          </div>


          <div
            v-if="criticalStock.length === 0"
            class="empty-state"
          >
            Belum ada data stok OAT kritis.
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

<style scoped src="./DashboardView.css"></style>
