<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import adminService from '@/services/admin.service'
import mobiledoctorIMG from '@/assets/images/mobile-doctor.png'

const router = useRouter()
const authStore = useAuthStore()

const isLoading = ref(true)
const errorMsg = ref(null)
const facilities = ref([])
const nakesList = ref([])

onMounted(async () => {
  try {
    const [facRes, nakesRes] = await Promise.all([
      adminService.getFacilities(),
      adminService.getNakesList()
    ])
    facilities.value = facRes.data || []
    nakesList.value = nakesRes.data || []
  } catch (err) {
    console.error('Failed to load admin dashboard:', err)
    errorMsg.value = 'Gagal memuat data dashboard.'
  } finally {
    isLoading.value = false
  }
})

const currentUserName = computed(() => authStore.userFullName || 'Admin')

const totalFacilities = computed(() => facilities.value.length)
const totalNakes = computed(() => nakesList.value.length)
const activeFacilities = computed(() =>
  facilities.value.filter(f => f.is_active).length
)

const goToFacilities = () => router.push('/dashboard/admin/facilities')
const goToNakes = () => router.push('/dashboard/admin/nakes')
const goToCreateNakes = () => router.push('/dashboard/admin/nakes/create')
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

    <!-- Error -->
    <div v-if="errorMsg" class="card" style="padding: 24px; margin-bottom: 20px; color: #EF4444; text-align: center;">
      {{ errorMsg }}
    </div>

    <!-- Statistics -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #E0F2FE; color: #0EA5E9;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">TOTAL FASILITAS</div>
          <div class="stat-value">{{ totalFacilities }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #ECFDF5; color: #10B981;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">TOTAL NAKES</div>
          <div class="stat-value">{{ totalNakes }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper" style="background-color: #FEF3C7; color: #F59E0B;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">FASILITAS AKTIF</div>
          <div class="stat-value">{{ activeFacilities }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="middle-row">
      <div class="card action-card" style="flex: 1;">
        <div class="card-title mb-3">Aksi Cepat</div>
        <div class="action-buttons-grid">
          <button class="btn btn-action-card" @click="goToCreateNakes">
            <div class="action-icon-circle bg-blue-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Tambah Nakes Baru</div>
              <div class="action-desc">Daftarkan akun tenaga kesehatan</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="btn btn-action-card" @click="goToFacilities">
            <div class="action-icon-circle bg-green-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Lihat Fasilitas Kesehatan</div>
              <div class="action-desc">Daftar faskes terdaftar di SITARA</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <button class="btn btn-action-card" @click="goToNakes">
            <div class="action-icon-circle bg-amber-subtle">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="action-text">
              <div class="action-title">Kelola Tenaga Kesehatan</div>
              <div class="action-desc">Lihat daftar nakes terdaftar</div>
            </div>
            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/views/dashboard/DashboardView.css';
</style>
