<script setup>
import { ref, onMounted } from 'vue'
import adminService from '@/services/admin.service'

const nakesList = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await adminService.getNakesList()
    nakesList.value = res.data || []
  } catch (err) {
    console.error('Failed to load nakes list:', err)
    error.value = 'Gagal memuat data Nakes. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
})

const getInitials = (name) => {
  if (!name) return 'N'
  return name.substring(0, 2).toUpperCase()
}
</script>

<template>
  <div class="patient-list-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Tenaga Kesehatan</h1>
        <p class="page-subtitle">
          Kelola data tenaga kesehatan (Nakes) di sistem SITARA.
        </p>
      </div>

      <router-link to="/dashboard/admin/nakes/create" class="btn-add">
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
          class="icon-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Tambah Nakes
      </router-link>
    </header>

    <section class="table-section card">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>NAKES</th>
              <th>EMAIL</th>
              <th>FASILITAS KESEHATAN</th>
              <th>ROLE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data nakes...
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="text-center py-6 text-danger">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="nakesList.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Belum ada data Nakes terdaftar.
              </td>
            </tr>
            <tr v-else v-for="nakes in nakesList" :key="nakes.id">
              <td>
                <div class="patient-profile">
                  <div class="avatar">
                    {{ getInitials(nakes.username) }}
                  </div>
                  <div class="patient-details">
                    <span class="patient-name">{{ nakes.username }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-muted">{{ nakes.email || '-' }}</span>
              </td>
              <td>
                <span class="text-muted">{{ nakes.facility_name || '-' }}</span>
              </td>
              <td>
                <span class="status-badge status-low" style="background-color: #E0F2FE; color: #0EA5E9;">
                  {{ nakes.role || 'Nakes' }}
                </span>
              </td>
              <td>
                <span
                  class="status-badge"
                  :class="nakes.is_active ? 'status-low' : 'status-high'"
                >
                  {{ nakes.is_active ? 'Aktif' : 'Tidak Aktif' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import '@/views/patient/PatientListView.css';
</style>
