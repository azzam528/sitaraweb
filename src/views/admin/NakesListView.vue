<script setup>
import { ref, onMounted, computed } from 'vue'
import adminService from '@/services/admin.service'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'

const nakesList = ref([])
const facilities = ref([])
const loading = ref(true)
const error = ref(null)

// Modal state
const showModal = ref(false)
const isSubmitting = ref(false)
const formError = ref(null)
const formData = ref({
  id: null,
  username: '',
  email: '',
  facility_id: ''
})

// Confirm state
const showConfirm = ref(false)
const confirmId = ref(null)
const confirmLoading = ref(false)

const activeFacilities = computed(() => {
  return facilities.value.filter(f => f.is_active)
})

const loadData = async () => {
  loading.value = true
  error.value = null
  try {
    const [nakesRes, facRes] = await Promise.all([
      adminService.getNakesList(),
      adminService.getFacilities()
    ])
    nakesList.value = nakesRes.data || []
    facilities.value = facRes.data || []
  } catch (err) {
    console.error('Failed to load data:', err)
    error.value = 'Gagal memuat data. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})

const getInitials = (name) => {
  if (!name) return 'N'
  return name.substring(0, 2).toUpperCase()
}

const getFacilityName = (facilityId, nakes) => {
  if (nakes.facility_name) return nakes.facility_name
  if (!facilityId) return '-'
  const facility = facilities.value.find(f => f.id === facilityId)
  return facility ? facility.name : '-'
}

const openEditModal = (nakes) => {
  formError.value = null
  formData.value = {
    id: nakes.id,
    username: nakes.username || '',
    email: nakes.email || '',
    facility_id: nakes.facility_id || ''
  }
  showModal.value = true
}

const submitForm = async () => {
  formError.value = null
  
  if (!formData.value.username || !formData.value.email || !formData.value.facility_id) {
    formError.value = 'Semua field wajib diisi.'
    return
  }

  try {
    isSubmitting.value = true
    const payload = {
      username: formData.value.username,
      email: formData.value.email,
      facility_id: Number(formData.value.facility_id)
    }

    await adminService.updateNakes(formData.value.id, payload)
    
    showModal.value = false
    await loadData()
  } catch (err) {
    console.error('Gagal menyimpan nakes:', err)
    const backendMsg = err.response?.data?.detail || err.response?.data?.message
    if (backendMsg) {
      formError.value = typeof backendMsg === 'string' ? backendMsg : JSON.stringify(backendMsg)
    } else if (err.response?.status === 422) {
      formError.value = 'Data tidak valid. Periksa kembali input Anda.'
    } else {
      formError.value = 'Terjadi kesalahan saat menyimpan data Nakes.'
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
    await adminService.deleteNakes(confirmId.value)
    showConfirm.value = false
    await loadData()
  } catch (err) {
    console.error('Gagal menonaktifkan nakes:', err)
    showConfirm.value = false
    error.value = 'Gagal menonaktifkan nakes.'
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
              <th>NAKES</th>
              <th>EMAIL</th>
              <th>FASILITAS KESEHATAN</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="text-center py-6 text-muted">
                Memuat data nakes...
              </td>
            </tr>
            <tr v-else-if="nakesList.length === 0">
              <td colspan="6" class="text-center py-6 text-muted">
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
                <span class="text-muted">{{ getFacilityName(nakes.facility_id, nakes) }}</span>
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
              <td>
                <div class="action-buttons" style="display: flex; gap: 8px;">
                  <button 
                    v-if="nakes.is_active"
                    @click="openEditModal(nakes)" 
                    class="btn btn-outline btn-sm"
                    style="font-size: 0.75rem; padding: 4px 10px;"
                    title="Edit Nakes"
                  >
                    Edit
                  </button>
                  <button 
                    v-if="nakes.is_active"
                    @click="confirmDeactivate(nakes.id)" 
                    class="btn btn-outline btn-sm text-danger"
                    style="font-size: 0.75rem; padding: 4px 10px; border-color: #fca5a5; color: #ef4444;"
                    title="Nonaktifkan Nakes"
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
      title="Edit Tenaga Kesehatan"
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
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Username <span style="color: #ef4444;">*</span></label>
          <input 
            v-model="formData.username" 
            type="text" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
            required 
          />
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Email <span style="color: #ef4444;">*</span></label>
          <input 
            v-model="formData.email" 
            type="email" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem;"
            required 
          />
        </div>
        
        <div class="form-group">
          <label style="display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.875rem; color: #334155;">Fasilitas Kesehatan <span style="color: #ef4444;">*</span></label>
          <select 
            v-model="formData.facility_id" 
            class="form-control" 
            style="width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background-color: white;"
            required
          >
            <option value="" disabled>Pilih Fasilitas Kesehatan</option>
            <option v-for="facility in activeFacilities" :key="facility.id" :value="facility.id">
              {{ facility.name }}
            </option>
          </select>
          <p v-if="activeFacilities.length === 0" style="margin-top: 4px; font-size: 0.75rem; color: #ef4444;">
            Tidak ada fasilitas kesehatan yang aktif. Silakan tambahkan atau aktifkan fasilitas terlebih dahulu.
          </p>
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
      title="Nonaktifkan Nakes"
      message="Apakah Anda yakin ingin menonaktifkan akun Nakes ini? Nakes yang dinonaktifkan tidak akan bisa login ke dalam sistem."
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
