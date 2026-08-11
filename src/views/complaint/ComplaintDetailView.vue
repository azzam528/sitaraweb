<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const complaintId = route.params.id || 'KLH-2026-001'

// Patient data
const patient = ref({
  name: 'Budi Kusuma',
  id: 'TB-2026-089',
  nik: '3273102805620001',
  usia: 42,
  gender: 'Laki-laki',
  fase: 'Fase Intensif (Bulan ke-1)',
  pmo: 'Siti Ayu (Istri)',
  noHp: '0812-3456-7890',
  puskesmas: 'Puskesmas Sukajadi',
  dokterPj: 'Dr. Hendra W.'
})

// Complaint data
const complaint = ref({
  tingkat: 'BERAT',
  waktuLaporan: '28 Jul 2026, 08:15 WIB',
  kategori: 'Efek Samping Obat (ESO)',
  deskripsi: '"Dok, saya merasa sangat mual sejak pagi tadi. Mata saya juga terlihat agak kuning dan nafsu makan hilang total. Sudah 2 hari begini, tapi hari ini paling parah sampai lemas sekali."'
})

// Status update
const selectedStatus = ref('diproses')
const statusOptions = [
  { value: 'diproses', label: 'Diproses / Observasi' },
  { value: 'dirujuk', label: 'Dirujuk ke RS/Spesialis' },
  { value: 'selesai', label: 'Selesai (Resolved)' }
]

// Previous complaints
const previousComplaints = ref([
  { date: '12 Jul 2026', text: 'Gatal-gatal ringan (Selesai)', color: '#006591' },
  { date: '05 Jul 2026', text: 'Batuk berdahak (Selesai)', color: '#F59E0B' }
])

const handleSaveStatus = () => {
  alert('Status berhasil diperbarui: ' + selectedStatus.value)
}
</script>

<template>
  <div class="complaint-detail-page">

    <!-- Patient Profile Header -->
    <div class="card patient-header">
      <div class="patient-info-left">
        <div class="patient-avatar">
          <span class="avatar-initials">{{ patient.initials }}</span>
        </div>
        <div class="patient-bio">
          <h2 class="patient-name">{{ patient.name }}</h2>
          <p class="patient-sub">NIK: {{ patient.nik }} &bull; {{ patient.age }} Tahun</p>
        </div>
      </div>
      <div class="patient-meta-grid">
        <div class="meta-item">
          <span class="meta-label">TIPE TB</span>
          <span class="meta-value">{{ patient.tipeTb }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">FASE PENGOBATAN</span>
          <span class="meta-value">{{ patient.fasePengobatan }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">PROGRES</span>
          <span class="meta-value">{{ patient.progres }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">PMO (KELUARGA)</span>
          <span class="meta-value">{{ patient.pmo }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">KADER</span>
          <span class="meta-value">{{ patient.kader }}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">DOKTER PJ</span>
          <span class="meta-value">{{ patient.dokterPj }}</span>
        </div>
      </div>
    </div>

    <!-- Middle Row -->
    <div class="row-grid">
      <!-- Detail Keluhan Pasien -->
      <div class="card col-main">
        <div class="card-header-row">
          <div class="card-title-with-icon">
            <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h3>Detail Keluhan Pasien</h3>
          </div>
          <span class="badge-severity">TINGKAT: {{ complaint.tingkat }}</span>
        </div>

        <div class="info-boxes">
          <div class="info-box">
            <span class="info-box-label">Waktu Laporan</span>
            <span class="info-box-value">{{ complaint.waktuLaporan }}</span>
          </div>
          <div class="info-box">
            <span class="info-box-label">Kategori Keluhan</span>
            <span class="info-box-value">{{ complaint.kategori }}</span>
          </div>
        </div>

        <div class="description-section">
          <h4 class="description-label">Deskripsi Pasien</h4>
          <div class="description-quote">
            <p>{{ complaint.deskripsi }}</p>
          </div>
        </div>
      </div>

      <!-- Pembaruan Status -->
      <div class="card col-side">
        <h3 class="side-title">Pembaruan Status</h3>
        <div class="status-options">
          <label 
            v-for="opt in statusOptions" 
            :key="opt.value" 
            class="status-radio"
            :class="{ 'is-selected': selectedStatus === opt.value }"
          >
            <input 
              type="radio" 
              name="status" 
              :value="opt.value" 
              v-model="selectedStatus" 
            />
            <span class="radio-circle">
              <span class="radio-dot" v-if="selectedStatus === opt.value"></span>
            </span>
            <span class="radio-label">{{ opt.label }}</span>
          </label>
        </div>
        <button class="btn-save" @click="handleSaveStatus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Simpan Perubahan
        </button>
      </div>
    </div>

    <!-- Bottom Row -->
    <div class="row-grid">
      <!-- Keluhan Sebelumnya -->
      <div class="card col-main">
        <h3 class="section-title">Keluhan Sebelumnya</h3>
        <div class="timeline-list">
          <div v-for="(item, idx) in previousComplaints" :key="idx" class="timeline-item">
            <div class="timeline-dot" :style="{ backgroundColor: item.color }"></div>
            <div class="timeline-content">
              <span class="timeline-date">{{ item.date }}</span>
              <span class="timeline-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tindakan Cepat -->
      <div class="card col-side">
        <h3 class="side-title">Tindakan Cepat</h3>
        <div class="quick-actions">
          <button class="action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Hubungi Pasien
          </button>
          <button class="action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Hubungi PMO
          </button>
          <button class="action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Jadwalkan Pemeriksaan
          </button>
          <button class="action-btn action-danger">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Rujuk ke RS Paru
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ComplaintDetailView.css"></style>
