<script setup>
import { ref, onMounted } from 'vue'
import adminService from '@/services/admin.service'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const facilities = ref([])
const loading = ref(true)
const error = ref(null)

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const isSubmitting = ref(false)
const formError = ref(null)
const formData = ref({
  id: null,
  name: '',
  address: '',
  phone: '',
  latitude: '',
  longitude: ''
})

// Confirm state
const showConfirm = ref(false)
const confirmId = ref(null)
const confirmLoading = ref(false)

const loadFacilities = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await adminService.getFacilities()
    facilities.value = res.data || []
  } catch (err) {
    console.error('Failed to load facilities:', err)
    error.value = 'Gagal memuat data Fasilitas Kesehatan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFacilities()
})

const getInitials = (name) => {
  if (!name) return 'F'
  return name.substring(0, 2).toUpperCase()
}

const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

const openCreateModal = () => {
  isEdit.value = false
  formError.value = null
  formData.value = {
    id: null,
    name: '',
    address: '',
    phone: '',
    latitude: '',
    longitude: ''
  }
  showModal.value = true
}

const openEditModal = (facility) => {
  isEdit.value = true
  formError.value = null
  formData.value = {
    id: facility.id,
    name: facility.name || '',
    address: facility.address || '',
    phone: facility.phone || '',
    latitude: facility.latitude || '',
    longitude: facility.longitude || ''
  }
  showModal.value = true
}

const submitForm = async () => {
  formError.value = null
  
  if (!formData.value.name) {
    formError.value = 'Nama fasilitas wajib diisi.'
    return
  }

  try {
    isSubmitting.value = true
    const payload = {
      name: formData.value.name,
      address: formData.value.address,
      phone: formData.value.phone,
      latitude: formData.value.latitude ? parseFloat(formData.value.latitude) : null,
      longitude: formData.value.longitude ? parseFloat(formData.value.longitude) : null
    }

    if (isEdit.value) {
      await adminService.updateFacility(formData.value.id, payload)
    } else {
      await adminService.createFacility(payload)
    }
    
    showModal.value = false
    await loadFacilities()
  } catch (err) {
    console.error('Gagal menyimpan fasilitas:', err)
    const backendMsg = err.response?.data?.detail || err.response?.data?.message
    if (backendMsg) {
      formError.value = typeof backendMsg === 'string' ? backendMsg : JSON.stringify(backendMsg)
    } else if (err.response?.status === 422) {
      formError.value = 'Data tidak valid. Periksa kembali input Anda.'
    } else {
      formError.value = 'Terjadi kesalahan saat menyimpan fasilitas.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const confirmDeactivate = (id) => {
  confirmId.value = id
  showConfirm.value = true
}

const handleDeactivate = async () => {
  try {
    confirmLoading.value = true
    await adminService.deleteFacility(confirmId.value)
    showConfirm.value = false
    await loadFacilities()
  } catch (err) {
    console.error('Gagal menonaktifkan fasilitas:', err)
    showConfirm.value = false // Tutup confirm dialog dulu
    
    if (err.response?.status === 409) {
      error.value = 'Fasilitas tidak dapat dinonaktifkan karena masih digunakan oleh pengguna aktif.'
    } else {
      error.value = 'Gagal menonaktifkan fasilitas.'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    confirmLoading.value = false
  }
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

      <button @click="openCreateModal" class="btn-add">
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
        Tambah Fasilitas
      </button>
    </header>

    <div v-if="error && !loading" class="error-alert mb-4" style="margin-bottom: 1rem; padding: 1rem; background-color: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 4px; display: flex; align-items: flex-start; gap: 12px; color: #7F1D1D;">
      <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; color: #EF4444;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <div class="alert-text" style="display: flex; flex-direction: column; gap: 4px; font-size: 0.875rem;">
        <strong>Terjadi Kesalahan:</strong>
        <span>{{ error }}</span>
      </div>
    </div>

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
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="text-center py-6 text-muted">
                Memuat data fasilitas...
              </td>
            </tr>
            <tr v-else-if="facilities.length === 0">
              <td colspan="6" class="text-center py-6 text-muted">
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
                  Google Maps
                </a>
                <span v-else class="text-muted" style="font-size: 0.8125rem;">
                  -
                </span>
              </td>
              <td>
                <div class="action-buttons" style="display: flex; gap: 8px;">
                  <button 
                    v-if="facility.is_active"
                    @click="openEditModal(facility)" 
                    class="btn btn-outline btn-sm"
                    style="font-size: 0.75rem; padding: 4px 10px;"
                    title="Edit Fasilitas"
                  >
                    Edit
                  </button>
                  <button 
                    v-if="facility.is_active"
                    @click="confirmDeactivate(facility.id)" 
                    class="btn btn-outline btn-sm text-danger"
                    style="font-size: 0.75rem; padding: 4px 10px; border-color: #fca5a5; color: #ef4444;"
                    title="Nonaktifkan Fasilitas"
                  >
                    Nonaktifkan
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal Form -->
    <BaseModal 
      v-model="showModal" 
      :title="isEdit ? 'Edit Fasilitas Kesehatan' : 'Tambah Fasilitas Kesehatan'"
      size="md"
    >
      <div v-if="formError" class="error-alert mb-4" style="margin-bottom: 16px; padding: 12px; background-color: #FEF2F2; border-left: 4px solid #EF4444; border-radius: 4px; display: flex; gap: 12px; color: #7F1D1D;">
        <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="alert-text">
          <span>{{ formError }}</span>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="add-form" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Nama Fasilitas <span style="color: #ef4444;">*</span></label>
          <input 
            v-model="formData.name" 
            type="text" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
            placeholder="Contoh: Puskesmas Cimenyan" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Alamat</label>
          <input 
            v-model="formData.address" 
            type="text" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
            placeholder="Contoh: Jl. Padasuka Atas" 
          />
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Nomor Telepon</label>
          <input 
            v-model="formData.phone" 
            type="text" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
            placeholder="Contoh: 022-1234567" 
          />
        </div>
        
        <div class="grid-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="form-group">
            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Latitude</label>
            <input 
              v-model="formData.latitude" 
              type="number" 
              step="any"
              class="form-control" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
              placeholder="-6.9" 
            />
          </div>
          <div class="form-group">
            <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Longitude</label>
            <input 
              v-model="formData.longitude" 
              type="number" 
              step="any"
              class="form-control" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
              placeholder="107.6" 
            />
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;">
          <button type="button" class="btn btn-outline" @click="showModal = false" :disabled="isSubmitting" style="padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; color: #475569; font-weight: 500; cursor: pointer;">
            Batal
          </button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting" style="padding: 8px 16px; border: none; border-radius: 6px; background: #0ea5e9; color: white; font-weight: 500; cursor: pointer;">
            {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </div>
      </form>
    </BaseModal>

    <!-- Confirm Deactivate Modal -->
    <ConfirmDialog
      v-model="showConfirm"
      title="Nonaktifkan Fasilitas"
      message="Apakah Anda yakin ingin menonaktifkan fasilitas kesehatan ini? Fasilitas yang dinonaktifkan tidak akan bisa digunakan oleh akun Nakes/Pasien baru."
      confirmText="Ya, Nonaktifkan"
      cancelText="Batal"
      variant="danger"
      :loading="confirmLoading"
      @confirm="handleDeactivate"
    />
  </div>
</template>

<style scoped>
@import '@/views/patient/PatientListView.css';
</style>
