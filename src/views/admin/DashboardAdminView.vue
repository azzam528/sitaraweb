<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import adminService from '@/services/admin.service'
import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const summary = ref({
  total_facilities: 0,
  total_nakes: 0,
  active_facilities: 0
})

onMounted(async () => {
  try {
    const res = await adminService.getDashboardSummary()
    summary.value = res.data
  } catch (error) {
    console.error('Failed to load admin dashboard summary:', error)
  } finally {
    isLoading.value = false
  }
})

const currentUserName = authStore.userFullName

const goToFacilities = () => router.push('/dashboard/facilities')
const goToNakes = () => router.push('/dashboard/nakes')
</script>

<template>
  <div class="dashboard-container">
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
          Dashboard Admin
        </h2>
        <p class="hero-desc">
          Kelola fasilitas kesehatan dan tenaga kesehatan SITARA.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary-inv" @click="goToFacilities">
            Kelola Fasilitas
          </button>
          <button class="btn btn-outline-white" @click="goToNakes">
            Kelola Nakes
          </button>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <img :src="mobiledoctorIMG" alt="Healthcare Team" class="hero-image" />
      </div>
    </div>

    <!-- Statistics -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #E0F2FE; color: #0EA5E9;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">TOTAL FASILITAS</div>
          <div class="stat-value">{{ summary.total_facilities }}</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #ECFDF5; color: #10B981;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">TOTAL NAKES</div>
          <div class="stat-value">{{ summary.total_nakes }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #FEF3C7; color: #F59E0B;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">FASILITAS AKTIF</div>
          <div class="stat-value">{{ summary.active_facilities }}</div>
        </div>
      </div>
    </div>
    
    <div class="bottom-row">
      <div class="card timeline-card">
        <div class="card-title mb-4">Aktivitas / Ringkasan Sistem</div>
        <div class="timeline">
          <div class="text-sm text-secondary py-4 text-center">
            Belum ada aktivitas terbaru hari ini.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/views/dashboard/DashboardView.css';
</style>
