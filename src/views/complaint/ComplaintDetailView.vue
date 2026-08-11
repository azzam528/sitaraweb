<template>
  <div class="complaint-detail-page">
    <!-- Nav Back -->
    <div class="header-nav mb-3">
      <button @click="goBack" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Daftar Keluhan
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state card">
      <div class="spinner"></div>
      <p>Memuat detail keluhan pasien...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="!complaint" class="error-state card">
      <h3>Data Keluhan Tidak Ditemukan</h3>
      <p>Laporan keluhan dengan ID ini tidak tersedia atau telah dihapus.</p>
      <button class="btn btn-primary mt-3" @click="goBack">Kembali ke Daftar</button>
    </div>

    <!-- Main Detail Content -->
    <div v-else class="detail-container">
      <!-- Toast Alert -->
      <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
        <span>{{ alertMessage }}</span>
        <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
      </div>

      <!-- 1. Patient Profile Header Card -->
      <div class="card patient-header">
        <div class="patient-info-left">
          <div class="patient-avatar">
            {{ getInitials(complaint.treatment?.patient?.full_name || 'TB') }}
          </div>
          <div class="patient-bio">
            <div class="flex-row items-center gap-2">
              <h2 class="patient-name">{{ complaint.treatment?.patient?.full_name || 'Pasien #' + complaint.treatment_id }}</h2>
              <span class="status-badge" :class="'status-' + complaint.status">
                {{ formatStatus(complaint.status) }}
              </span>
            </div>
            <p class="patient-sub">
              NIK: {{ complaint.treatment?.patient?.nik || '-' }} &bull; No. RM: {{ complaint.treatment?.patient?.medical_record_number || '-' }}
            </p>
          </div>
        </div>

        <div class="patient-meta-grid">
          <div class="meta-item">
            <span class="meta-label">FASE TERAPI</span>
            <span class="meta-value">{{ formatPhase(complaint.treatment?.phase) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">REGIMEN OBAT</span>
            <span class="meta-value">{{ formatRegimen(complaint.treatment?.regimen) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">DOKTER PJ</span>
            <span class="meta-value">{{ complaint.treatment?.doctor_name || '-' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">PMO (PENGAWAS)</span>
            <span class="meta-value">{{ complaint.treatment?.patient?.pmo_name || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- 2. Grid Layout -->
      <div class="row-grid">
        <!-- Left Column: Detail Keluhan & Deskripsi Pasien -->
        <div class="col-main">
          <!-- Detail Keluhan Box -->
          <div class="card">
            <div class="card-header-row">
              <div class="card-title-with-icon">
                <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <h3>Informasi Keluhan Pasien</h3>
              </div>
              <span class="category-badge">{{ complaint.category }}</span>
            </div>

            <div class="info-boxes">
              <div class="info-box">
                <span class="info-box-label">WAKTU LAPORAN</span>
                <span class="info-box-value">{{ formatDate(complaint.created_at) }}, {{ formatTime(complaint.created_at) }} WIB</span>
              </div>
              <div class="info-box">
                <span class="info-box-label">KATEGORI KELUHAN</span>
                <span class="info-box-value font-semibold">{{ complaint.category }}</span>
              </div>
              <div class="info-box">
                <span class="info-box-label">STATUS PENANGANAN</span>
                <span class="info-box-value">
                  <span class="status-badge" :class="'status-' + complaint.status">
                    {{ formatStatus(complaint.status) }}
                  </span>
                </span>
              </div>
            </div>

            <div class="description-section">
              <h4 class="description-label">Deskripsi / Keluhan Pasien:</h4>
              <div class="description-quote">
                <p>"{{ complaint.description }}"</p>
              </div>
            </div>

            <!-- Tanggapan yang sudah tersimpan -->
            <div class="response-section mt-4" v-if="complaint.response">
              <h4 class="response-label">Tanggapan / Rekomendasi Medis Tersimpan:</h4>
              <div class="response-box">
                <div class="response-header">
                  <span class="badge-resolved">Respon Terkirim</span>
                  <span class="text-xs text-muted" v-if="complaint.updated_at">
                    Diperbarui: {{ formatDate(complaint.updated_at) }}
                  </span>
                </div>
                <p class="response-content">{{ complaint.response }}</p>
              </div>
            </div>
          </div>

          <!-- Kontak & Informasi Pasien -->
          <div class="card" v-if="complaint.treatment?.patient">
            <h3 class="section-title">Kontak & Alamat Pasien</h3>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nomor Telepon Pasien:</span>
                <span class="detail-val font-semibold">{{ complaint.treatment.patient.phone || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Pengawas Menelan Obat (PMO):</span>
                <span class="detail-val">{{ complaint.treatment.patient.pmo_name }} ({{ complaint.treatment.patient.pmo_phone || '-' }})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Alamat Lengkap:</span>
                <span class="detail-val">{{ complaint.treatment.patient.address || '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Tindakan Medis & Pembaruan Status -->
        <div class="col-side">
          <!-- Form Pembaruan Status -->
          <div class="card action-card">
            <h3 class="side-title">Pembaruan & Tindakan Medis</h3>

            <form @submit.prevent="submitUpdateStatus">
              <div class="form-group mb-3">
                <label>Status Penanganan <span class="text-danger">*</span></label>
                <div class="status-radio-group">
                  <label 
                    class="status-radio" 
                    :class="{ 'is-selected': responseForm.status === 'pending' }"
                  >
                    <input type="radio" value="pending" v-model="responseForm.status" />
                    <span>Menunggu Respon (Pending)</span>
                  </label>

                  <label 
                    class="status-radio" 
                    :class="{ 'is-selected': responseForm.status === 'in_progress' }"
                  >
                    <input type="radio" value="in_progress" v-model="responseForm.status" />
                    <span>Sedang Diproses / Observasi</span>
                  </label>

                  <label 
                    class="status-radio" 
                    :class="{ 'is-selected': responseForm.status === 'resolved' }"
                  >
                    <input type="radio" value="resolved" v-model="responseForm.status" />
                    <span>Selesai / Teratasi (Resolved)</span>
                  </label>
                </div>
              </div>

              <div class="form-group mb-4">
                <label>Tanggapan / Rekomendasi Medis</label>
                <textarea 
                  v-model="responseForm.response" 
                  rows="4" 
                  placeholder="Tuliskan instruksi penanganan klinis, resep obat simtomatis, atau anjuran kontrol ke faskes..."
                  class="form-control"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-block" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-sm"></span>
                <span v-else>Simpan Tanggapan & Status</span>
              </button>
            </form>
          </div>

          <!-- Aksi Cepat / Hubungi Pasien -->
          <div class="card">
            <h3 class="side-title">Aksi Cepat</h3>
            <div class="action-buttons-list">
              <button 
                v-if="complaint.treatment?.patient?.phone" 
                class="btn btn-outline-success btn-block" 
                @click="sendWhatsApp(complaint.treatment.patient.phone, complaint.treatment.patient.full_name, 'Pasien')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Hubungi Pasien (WA)
              </button>

              <button 
                v-if="complaint.treatment?.patient?.pmo_phone" 
                class="btn btn-outline btn-block" 
                @click="sendWhatsApp(complaint.treatment.patient.pmo_phone, complaint.treatment.patient.pmo_name, 'PMO')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Hubungi PMO (WA)
              </button>

              <button class="btn btn-outline-danger btn-block" @click="confirmDelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Hapus Laporan Keluhan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import complaintService from '../../services/complaint.service'

const route = useRoute()
const router = useRouter()

const complaint = ref(null)
const isLoading = ref(true)
const isSubmitting = ref(false)

const alertMessage = ref('')
const alertType = ref('success')

const showAlert = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 4000)
}

const responseForm = ref({
  status: 'in_progress',
  response: ''
})

onMounted(() => {
  loadComplaintDetail()
})

const loadComplaintDetail = async () => {
  isLoading.value = true
  try {
    const id = route.params.id
    const res = await complaintService.getById(id)
    complaint.value = res.data
    responseForm.value = {
      status: res.data.status || 'in_progress',
      response: res.data.response || ''
    }
  } catch (error) {
    console.error('Failed to load complaint detail:', error)
    showAlert('Gagal memuat rincian keluhan', 'danger')
  } finally {
    isLoading.value = false
  }
}

const submitUpdateStatus = async () => {
  if (!complaint.value) return
  isSubmitting.value = true
  try {
    await complaintService.update(complaint.value.id, {
      status: responseForm.value.status,
      response: responseForm.value.response || null
    })
    showAlert('Tanggapan dan status penanganan keluhan berhasil diperbarui!')
    await loadComplaintDetail()
  } catch (error) {
    console.error('Failed to update complaint:', error)
    showAlert('Gagal memperbarui status keluhan', 'danger')
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!complaint.value) return
  if (confirm(`Apakah Anda yakin ingin menghapus laporan keluhan "${complaint.value.category}" ini?`)) {
    try {
      await complaintService.delete(complaint.value.id)
      alert('Keluhan berhasil dihapus!')
      router.push('/dashboard/complaints')
    } catch (error) {
      console.error('Failed to delete complaint:', error)
      showAlert('Gagal menghapus laporan keluhan', 'danger')
    }
  }
}

const sendWhatsApp = (phone, recipientName, roleLabel) => {
  if (!phone) {
    showAlert(`Nomor telepon ${roleLabel} tidak tersedia`, 'warning')
    return
  }
  const cleanPhone = phone.replace(/^0/, '62').replace(/\D/g, '')
  const msg = encodeURIComponent(`Halo Bpk/Ibu ${recipientName || ''} (${roleLabel}), terkait keluhan "${complaint.value?.category}" yang dilaporkan: ${responseForm.value.response || 'Tim kami sedang memproses dan menyiapkan rekomendasi.'}`)
  window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank')
}

// Helpers
const formatStatus = (status) => {
  if (status === 'pending') return 'Menunggu Respon'
  if (status === 'in_progress') return 'Sedang Diproses'
  if (status === 'resolved') return 'Selesai'
  return status || '-'
}

const formatPhase = (phase) => {
  if (phase === 'intensive') return 'Fase Intensif'
  if (phase === 'continuation') return 'Fase Lanjutan'
  return phase || '-'
}

const formatRegimen = (regimen) => {
  if (regimen === 'category_1') return 'Kategori 1'
  if (regimen === 'category_2') return 'Kategori 2'
  if (regimen === 'mdr') return 'TB-RO'
  return regimen || '-'
}

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatTime = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

const getInitials = (name) => {
  if (!name) return 'TB'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

const goBack = () => {
  router.push('/dashboard/complaints')
}
</script>

<style scoped src="./ComplaintDetailView.css"></style>
