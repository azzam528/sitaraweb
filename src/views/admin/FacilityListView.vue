<script setup>
import { ref, onMounted, computed } from 'vue'
import adminService from '@/services/admin.service'

const facilities = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await adminService.getFacilities()
    facilities.value = res.data.data || []
  } catch (err) {
    console.error('Failed to load facilities:', err)
    error.value = 'Gagal memuat data Fasilitas Kesehatan.'
  } finally {
    loading.value = false
  }
})

const getInitials = (name) => {
  if (!name) return 'F'
  return name.substring(0, 2).toUpperCase()
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

    <section class="table-section card mt-4">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>FASILITAS</th>
              <th>ALAMAT</th>
              <th>NOMOR TELEPON</th>
              <th>STATUS</th>
              <th class="text-center">AKSI</th>
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
                Belum ada fasilitas kesehatan.
              </td>
            </tr>
            <tr v-else v-for="facility in facilities" :key="facility.id">
              <td>
                <div class="patient-profile">
                  <div class="avatar bg-blue-100 text-blue-800">
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
                <span class="status-badge status-low">Aktif</span>
              </td>
              <td class="text-center">
                <button class="btn btn-outline btn-sm">Lihat Detail</button>
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
