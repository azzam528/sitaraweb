<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import adminService from '@/services/admin.service'

const router = useRouter()

const formData = ref({
  username: '',
  email: '',
  password: '',
  facility_id: ''
})

const facilities = ref([])
const isLoadingFacilities = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')
const showSuccessModal = ref(false)

onMounted(async () => {
  try {
    const res = await adminService.getFacilities()
    facilities.value = res.data.data || []
  } catch (error) {
    console.error('Gagal mengambil daftar fasilitas:', error)
  } finally {
    isLoadingFacilities.value = false
  }
})

const saveNakes = async () => {
  if (!formData.value.username || !formData.value.email || !formData.value.password || !formData.value.facility_id) {
    errorMessage.value = 'Semua field wajib diisi.'
    return
  }

  try {
    errorMessage.value = ''
    isSubmitting.value = true
    await adminService.createNakes(formData.value)
    showSuccessModal.value = true
  } catch (error) {
    console.error('Gagal membuat nakes:', error)
    errorMessage.value = error.response?.data?.message || 'Terjadi kesalahan saat menambahkan Nakes.'
  } finally {
    isSubmitting.value = false
  }
}

const cancelAdd = () => {
  router.push('/dashboard/nakes')
}

const finishAndRedirect = () => {
  showSuccessModal.value = false
  router.push('/dashboard/nakes')
}
</script>

<template>
  <div class="patient-add-page">
    <div class="header-nav">
      <button type="button" class="back-link" @click="cancelAdd">
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
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Batal & Kembali ke Daftar Nakes
      </button>
    </div>

    <div class="page-header-wrapper">
      <div class="page-header">
        <div class="page-header-content">
          <h1 class="page-title">Pendaftaran Tenaga Kesehatan Baru</h1>
          <p class="subtitle">
            Tambahkan akun tenaga kesehatan untuk memberikan akses ke dashboard SITARA.
          </p>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="error-alert">
      <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <div class="alert-text">
        <strong>Pendaftaran Gagal:</strong>
        <span>{{ errorMessage }}</span>
      </div>
    </div>

    <form class="add-form" @submit.prevent="saveNakes">
      <div class="grid-layout">
        <div class="left-col" style="flex: 1; max-width: 800px; margin: 0 auto;">
          <div class="card form-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <span class="step-badge">1</span>
                <h3 class="card-title">Informasi Akun Nakes</h3>
              </div>
              <span class="badge-tag">Wajib Diisi</span>
            </div>

            <div class="form-group">
              <label>
                Username
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.username"
                type="text"
                class="form-control"
                placeholder="Contoh: dr_budi"
                required
              />
            </div>

            <div class="form-group">
              <label>
                Email
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.email"
                type="email"
                class="form-control"
                placeholder="Contoh: budi@puskesmas.com"
                required
              />
            </div>

            <div class="form-group">
              <label>
                Password Awal
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.password"
                type="password"
                class="form-control"
                placeholder="Minimal 8 karakter"
                required
              />
            </div>

            <div class="form-group">
              <label>
                Fasilitas Kesehatan Tempat Bertugas
                <span class="required">*</span>
              </label>
              <select v-model="formData.facility_id" class="form-select" required :disabled="isLoadingFacilities">
                <option value="" disabled>Pilih Fasilitas Kesehatan</option>
                <option v-if="isLoadingFacilities" value="" disabled>Memuat data...</option>
                <option v-for="facility in facilities" :key="facility.id" :value="facility.id">
                  {{ facility.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions-bar">
        <button
          type="button"
          class="btn btn-outline"
          :disabled="isSubmitting"
          @click="cancelAdd"
        >
          Batal
        </button>
        <button
          type="submit"
          class="btn btn-primary btn-submit"
          :disabled="isSubmitting"
        >
          <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <span v-if="isSubmitting">Menyimpan...</span>
          <span v-else>Simpan Nakes</span>
        </button>
      </div>
    </form>

    <div v-if="showSuccessModal" class="modal-overlay" @click.self="finishAndRedirect">
      <div class="modal-card">
        <div class="modal-top-accent"></div>
        <div class="modal-inner">
          <div class="modal-badge-wrapper">
            <div class="modal-success-badge">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <h2 class="modal-title">Nakes Berhasil Didaftarkan!</h2>
          <p class="modal-subtitle">
            Akun tenaga kesehatan baru telah berhasil ditambahkan ke dalam sistem.
          </p>
          <div class="modal-footer-nav" style="margin-top: 2rem;">
            <button
              type="button"
              class="btn btn-primary btn-block-custom"
              @click="finishAndRedirect"
            >
              Kembali ke Daftar Nakes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/views/patient/PatientAddView.css';
</style>
