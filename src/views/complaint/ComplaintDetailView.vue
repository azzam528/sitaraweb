<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const complaintId = route.params.id || 'KLH-2024-001'

// Dummy patient data
const patient = ref({
  name: 'Bpk. Ahmad Subarjo',
  nik: '3275010012459003',
  age: 62,
  avatar: null,
  initials: 'AS',
  tipeTb: 'TB-SO (Sensitif Obat)',
  fasePengobatan: 'Intensif (Bulan 2)',
  progres: 'Hari ke-42 dari 180',
  pmo: 'Surya (Anak)',
  kader: 'Ibu Ratna',
  dokterPj: 'Dr. Hendra W.'
})

// Complaint data
const complaint = ref({
  tingkat: 'BERAT',
  waktuLaporan: '24 Okt 2023, 08:15 WIB',
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
  { date: '12 Okt 2023', text: 'Gatal-gatal ringan (Selesai)', color: '#006591' },
  { date: '05 Okt 2023', text: 'Batuk berdahak (Selesai)', color: '#F59E0B' }
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

<style scoped>
.complaint-detail-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: #FFFFFF;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* ========= PATIENT HEADER ========= */
.patient-header {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.patient-info-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.patient-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #006591 0%, #004D6E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-initials {
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 700;
}

.patient-bio {
  min-width: 200px;
}

.patient-name {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 4px;
}

.patient-sub {
  font-size: 0.8125rem;
  color: #64748B;
  margin: 0;
}

.patient-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px 28px;
  flex: 1;
  min-width: 0;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.meta-value {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1E293B;
}

/* ========= ROW GRID ========= */
.row-grid {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
}

/* ========= DETAIL KELUHAN ========= */
.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
}

.card-title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title-icon {
  width: 22px;
  height: 22px;
  color: #F59E0B;
}

.card-title-with-icon h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.badge-severity {
  background-color: #FEE2E2;
  color: #DC2626;
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 6px;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.info-boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.info-box {
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-box-label {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 500;
}

.info-box-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
}

.description-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 10px;
}

.description-quote {
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  padding: 18px 20px;
  border-left: 3px solid #006591;
}

.description-quote p {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.7;
  font-style: italic;
}

/* ========= PEMBARUAN STATUS ========= */
.side-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 20px;
}

.status-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.status-radio {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 200ms ease;
  background: #FFFFFF;
}

.status-radio:hover {
  border-color: #CBD5E1;
  background-color: #F8FAFC;
}

.status-radio.is-selected {
  border-color: #006591;
  background-color: rgba(0, 101, 145, 0.04);
}

.status-radio input {
  display: none;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #CBD5E1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 200ms ease;
}

.status-radio.is-selected .radio-circle {
  border-color: #006591;
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #006591;
}

.radio-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #334155;
}

.btn-save {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, #002B3F 0%, #006591 100%);
  color: #FFFFFF;
  font-size: 0.8125rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  transition: all 250ms ease;
}

.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 43, 63, 0.3);
}

.btn-save svg {
  width: 16px;
  height: 16px;
}

/* ========= KELUHAN SEBELUMNYA ========= */
.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 20px;
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 4px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 16px;
  bottom: -16px;
  width: 2px;
  background-color: #E2E8F0;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 3px;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-date {
  font-size: 0.75rem;
  color: #94A3B8;
  font-weight: 500;
}

.timeline-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
}

/* ========= TINDAKAN CEPAT ========= */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 16px;
  background: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  color: #334155;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  transition: all 200ms ease;
}

.action-btn:hover {
  border-color: #006591;
  background-color: rgba(0, 101, 145, 0.03);
  color: #006591;
}

.action-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.action-btn.action-danger {
  color: #DC2626;
  border-color: #FECACA;
}

.action-btn.action-danger:hover {
  background-color: #FEF2F2;
  border-color: #DC2626;
}

/* ========= RESPONSIVE ========= */
@media (max-width: 1024px) {
  .row-grid {
    grid-template-columns: 1fr 280px;
  }

  .patient-meta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .patient-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .patient-meta-grid {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }

  .row-grid {
    grid-template-columns: 1fr;
  }

  .info-boxes {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .patient-meta-grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 16px;
  }
}
</style>
