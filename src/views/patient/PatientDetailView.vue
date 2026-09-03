<script setup>
import { RouterLink } from 'vue-router'
import { usePatientDetailView } from './PatientDetailView.js'
import DetailHeader from '@/components/common/DetailHeader.vue'

const {
  patient,
  treatment,
  nextControl,
  refills,
  loading,
  error,
  formatDate,
  formatDateTime,
  calculateAge,
  formatGender,
  formatStatus,
  formatRefillStatus,
  getRefillBadgeClass,
  getInitials,
  contactPatient,
  callNumber,
  showPatientMenu,
  addNote,
  rescheduleControl,
  shareSchedule
} = usePatientDetailView()
</script>

<template>
  <div class="patient-detail-page">
    <!-- Header -->
    <div class="header-nav mb-3">
      <RouterLink to="/dashboard/patients" class="back-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Daftar Pasien
      </RouterLink>
    </div>

    <!-- 1. Patient Profile Header -->
    <div v-if="loading" class="card profile-header">
      <div class="profile-info">
        <h2>Memuat data pasien...</h2>
      </div>
    </div>

    <div v-else-if="error" class="card profile-header">
      <div class="profile-info">
        <h2>Gagal memuat data pasien</h2>
        <p class="text-danger mt-1">{{ error }}</p>
      </div>
    </div>

    <DetailHeader
      v-else-if="patient"
      :title="patient.full_name"
      :initials="getInitials(patient.full_name)"
    >
      <template #status>
        <span
          class="badge"
          :class="patient.is_active !== false ? 'badge-success' : 'badge-danger'"
        >
          {{ patient.is_active !== false ? 'Aktif' : 'Tidak Aktif' }}
        </span>
      </template>

      <template #metadata>
        <span class="meta-item">
          <strong>NIK:</strong> {{ patient.nik || '-' }}
        </span>
        <span class="meta-dot">&bull;</span>
        <span class="meta-item">
          <strong>No. RM:</strong> {{ patient.medical_record_number || '-' }}
        </span>
      </template>

      <template #actions>
        <RouterLink
          :to="`/dashboard/patients/${patient.id}/edit`"
          class="btn btn-outline"
        >
          Edit Data Pasien
        </RouterLink>

        <button
          class="btn btn-primary"
          type="button"
          @click="contactPatient"
        >
          Hubungi Pasien
        </button>
      </template>

      <template #summary>
        <div class="data-field">
          <div class="field-label">NOMOR REKAM MEDIS</div>
          <div class="field-value text-primary">
            {{ patient.medical_record_number || '-' }}
          </div>
        </div>

        <div class="data-field">
          <div class="field-label">MULAI TERAPI</div>
          <div class="field-value">
            {{ formatDate(treatment?.therapy_start_date) }}
          </div>
        </div>

        <div class="data-field">
          <div class="field-label">ESTIMASI SELESAI</div>
          <div class="field-value">
            {{ formatDate(treatment?.therapy_end_date) }}
          </div>
        </div>
      </template>
    </DetailHeader>

    <!-- 2. Three Info Cards Row -->
    <div v-if="patient" class="grid-3">
      <!-- Identitas Lengkap -->
      <div class="card info-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3>Identitas Lengkap</h3>
        </div>

        <div class="card-body">
          <div class="key-value">
            <span class="key">Alamat Lengkap</span>
            <span class="value">{{ patient.address || '-' }}</span>
          </div>
          <div class="key-value">
            <span class="key">Nomor Telepon</span>
            <span class="value">{{ patient.phone || '-' }}</span>
          </div>
          <div class="key-value">
            <span class="key">Tanggal Lahir</span>
            <span class="value">{{ formatDate(patient.birth_date) }}</span>
          </div>
          <div class="key-value">
            <span class="key">Pekerjaan</span>
            <span class="value">{{ patient.occupation || '-' }}</span>
          </div>
          <div class="key-value">
            <span class="key">NIK</span>
            <span class="value">{{ patient.nik || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Informasi Medis -->
      <div class="card info-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h3>Informasi Medis</h3>
        </div>

        <div class="card-body">
          <div class="key-value">
            <span class="key">Status Terapi</span>
            <span class="value text-primary font-semibold">{{ formatStatus(treatment?.status) }}</span>
          </div>
          <div class="key-value">
            <span class="key">Tanggal Diagnosis</span>
            <span class="value">{{ formatDate(treatment?.diagnosis_date) }}</span>
          </div>
          <div class="key-value">
            <span class="key">Mulai Terapi</span>
            <span class="value">{{ formatDate(treatment?.therapy_start_date) }}</span>
          </div>
          <div class="key-value">
            <span class="key">Selesai Terapi</span>
            <span class="value">{{ formatDate(treatment?.therapy_end_date) }}</span>
          </div>
        </div>
      </div>

      <!-- Pendampingan -->
      <div class="card info-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Pendampingan</h3>
        </div>

        <div class="card-body">
          <div class="person-card">
            <div class="person-info">
              <div class="avatar-small">
                {{ getInitials(patient.pmo_name) }}
              </div>
              <div>
                <div class="person-name">{{ patient.pmo_name || '-' }}</div>
                <div class="person-role">PMO</div>
              </div>
            </div>
            <button
              v-if="patient.pmo_phone"
              class="btn-icon-small"
              type="button"
              @click="callNumber(patient.pmo_phone)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Middle Row: Logistik OAT & Timeline -->
    <div v-if="patient" class="grid-layout-65-35">
      <!-- Logistik OAT -->
      <div class="card">
        <div class="card-header space-between">
          <div class="d-flex align-center">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4 a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8 a2 2 0 0 0 1 1.73l7 4 a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3>Logistik OAT (Obat Anti Tuberkulosis)</h3>
          </div>
        </div>

        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>TANGGAL</th>
                <th>OBAT</th>
                <th>JUMLAH</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="refill in refills" :key="refill.id">
                <td>{{ formatDate(refill.created_at) }}</td>
                <td>{{ refill.medicine_name || refill.medicine_id || '-' }}</td>
                <td>{{ refill.quantity ?? '-' }}</td>
                <td>
                  <span class="badge" :class="getRefillBadgeClass(refill.status)">
                    {{ formatRefillStatus(refill.status) }}
                  </span>
                </td>
              </tr>
              <tr v-if="refills.length === 0">
                <td colspan="4" style="text-align: center;">
                  Belum ada riwayat pengambilan obat.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Garis Waktu Pengobatan -->
      <div class="card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3>Garis Waktu Pengobatan</h3>
        </div>

        <div class="card-body">
          <div class="timeline">
            <!-- Diagnosis -->
            <div v-if="treatment?.diagnosis_date" class="timeline-item">
              <div class="timeline-dot dot-primary"></div>
              <div class="timeline-content">
                <div class="timeline-date">{{ formatDate(treatment.diagnosis_date) }}</div>
                <div class="timeline-title">Diagnosis TB</div>
                <div class="timeline-desc">Diagnosis pasien tercatat.</div>
              </div>
            </div>

            <!-- Mulai terapi -->
            <div v-if="treatment?.therapy_start_date" class="timeline-item">
              <div class="timeline-dot dot-primary"></div>
              <div class="timeline-content">
                <div class="timeline-date">{{ formatDate(treatment.therapy_start_date) }}</div>
                <div class="timeline-title">Mulai Terapi (OAT)</div>
                <div class="timeline-desc">Program pengobatan TB aktif tercatat.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PatientDetailView.css"></style>
