<script setup>
import { ref, onMounted } from 'vue'
import adminService from '@/services/admin.service'

const facilities = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await adminService.getFacilities()
    facilities.value = res.data || []
  } catch (err) {
    console.error('Failed to load facilities:', err)
    error.value = 'Gagal memuat data Fasilitas Kesehatan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
})

const getInitials = (name) => {
  if (!name) return 'F'
  return name.substring(0, 2).toUpperCase()
}

const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}
</script>

<template>
  <div class="patient-list-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Fasilitas Kesehatan</h1>
        <p class="page-subtitle">
          Lihat daftar fasilitas kesehatan yang terdaftar di SITARA.
        </p>
      </div>
    </header>

    <section class="table-section card">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>FASILITAS</th>
              <th>ALAMAT</th>
              <th>NOMOR TELEPON</th>
              <th>STATUS</th>
              <th>LOKASI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data fasilitas...
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="5" class="text-center py-6 text-danger">
                {{ error }}
              </td>
            </tr>
            <tr v-else-if="facilities.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Belum ada fasilitas kesehatan terdaftar.
              </td>
            </tr>
            <tr v-else v-for="facility in facilities" :key="facility.id">
              <td>
                <div class="patient-profile">
                  <div class="avatar">
                    {{ getInitials(facility.name) }}
                  </div>
                  <div class="patient-details">
                    <span class="patient-name">{{ facility.name }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-muted">{{ facility.address || '-' }}</span>
              </td>
              <td>
                <span class="text-muted">{{ facility.phone || '-' }}</span>
              </td>
              <td>
                <span
                  class="status-badge"
                  :class="facility.is_active ? 'status-low' : 'status-high'"
                >
                  {{ facility.is_active ? 'Aktif' : 'Tidak Aktif' }}
                </span>
              </td>
              <td>
                <a
                  v-if="facility.latitude != null && facility.longitude != null"
                  :href="getGoogleMapsUrl(facility.latitude, facility.longitude)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-outline btn-sm"
                  style="font-size: 0.75rem; padding: 4px 10px;"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: middle;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Lihat di Google Maps
                </a>
                <span v-else class="text-muted" style="font-size: 0.8125rem;">
                  Lokasi belum tersedia
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
