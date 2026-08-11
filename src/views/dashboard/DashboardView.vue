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
  risk,
  adherenceTrend,
  recentActivities,
  criticalStock,
  patientStats,
  riskPatients,

  isLoading,
  currentUserName,
  complianceAverage,

  getTrendValue,
  getTrendLabel
} = useDashboardView()
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
