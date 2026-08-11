<script setup>
import { RouterLink } from 'vue-router'
import { usePatientDetailView } from './PatientDetailView.js'

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
  formatPhase,
  formatRegimen,
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
    <div class="header-nav">
      <RouterLink to="/dashboard/patients" class="back-link">
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
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>

        Kembali ke Daftar Pasien
      </RouterLink>
    </div>

    <!-- ================================================= -->
    <!-- 1. Patient Profile Header -->
    <!-- ================================================= -->

    <div v-if="loading" class="card profile-header">
      <div class="profile-info">
        <h2>Memuat data pasien...</h2>
      </div>
    </div>

    <div v-else-if="error" class="card profile-header">
      <div class="profile-info">
        <h2>Gagal memuat data pasien</h2>
        <p>{{ error }}</p>
      </div>
    </div>

    <div v-else-if="patient" class="card profile-header">

      <div class="profile-top">

        <div class="profile-left">

          <div class="avatar-large">
            <span class="initials">
              {{ getInitials(patient.full_name) }}
            </span>
          </div>

          <div class="profile-info">

            <div class="name-row">

              <h2>
                {{ patient.full_name }}
              </h2>

              <span
                class="badge"
                :class="
                  patient.is_active
                    ? 'badge-success'
                    : 'badge-danger'
                "
              >
                {{ patient.is_active ? 'Aktif' : 'Tidak Aktif' }}
              </span>

            </div>

            <div class="meta-row">

              <span>
                NIK: {{ patient.nik || '-' }}
              </span>

              <span class="dot">•</span>

              <span>
                {{ calculateAge(patient.birth_date) }}
                Tahun
              </span>

              <span class="dot">•</span>

              <span>
                {{ formatGender(patient.gender) }}
              </span>

              <span class="dot">•</span>

              <span>
                {{ patient.address || '-' }}
              </span>

            </div>

          </div>

        </div>

        <div class="profile-actions">

          <RouterLink
            :to="`/dashboard/patients/${patient.id}/edit`"
            class="btn btn-outline"
          >
            Edit Data Pasien
          </RouterLink>

          <button
            class="btn btn-filled"
            type="button"
            @click="contactPatient"
          >
            Hubungi Pasien
          </button>

          <button
            class="btn btn-icon"
            type="button"
            @click="showPatientMenu"
          >
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>

        </div>

      </div>

      <div class="profile-bottom">

        <div class="data-field">

          <div class="field-label">
            NOMOR REKAM MEDIS
          </div>

          <div class="field-value text-primary">
            {{ patient.medical_record_number || '-' }}
          </div>

        </div>

        <div class="data-field">

          <div class="field-label">
            MULAI TERAPI
          </div>

          <div class="field-value">
            {{ formatDate(treatment?.therapy_start_date) }}
          </div>

        </div>

        <div class="data-field">

          <div class="field-label">
            FASE
          </div>

          <div class="field-value">
            {{ formatPhase(treatment?.phase) }}
          </div>

        </div>

        <div class="data-field">

          <div class="field-label">
            REGIMEN
          </div>

          <div class="field-value">
            {{ formatRegimen(treatment?.regimen) }}
          </div>

        </div>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- 2. Three Info Cards Row -->
    <!-- ================================================= -->

    <div
      v-if="patient"
      class="grid-3"
    >

      <!-- Identitas Lengkap -->
      <div class="card info-card">

        <div class="card-header">

          <div class="icon-wrapper">

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
              <path
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              ></path>
              <circle
                cx="12"
                cy="7"
                r="4"
              ></circle>
            </svg>

          </div>

          <h3>Identitas Lengkap</h3>

        </div>

        <div class="card-body">

          <div class="key-value">

            <span class="key">
              Alamat Lengkap
            </span>

            <span class="value">
              {{ patient.address || '-' }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Nomor Telepon
            </span>

            <span class="value">
              {{ patient.phone || '-' }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Tanggal Lahir
            </span>

            <span class="value">
              {{ formatDate(patient.birth_date) }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Pekerjaan
            </span>

            <span class="value">
              {{ patient.occupation || '-' }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              NIK
            </span>

            <span class="value">
              {{ patient.nik || '-' }}
            </span>

          </div>

        </div>

      </div>


      <!-- Informasi Medis -->
      <div class="card info-card">

        <div class="card-header">

          <div class="icon-wrapper">

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
              <path
                d="M22 12h-4l-3 9L9 3l-3 9H2"
              ></path>
            </svg>

          </div>

          <h3>Informasi Medis</h3>

        </div>

        <div class="card-body">

          <div class="key-value">

            <span class="key">
              Fase
            </span>

            <span class="value text-primary font-semibold">
              {{ formatPhase(treatment?.phase) }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Tanggal Diagnosis
            </span>

            <span class="value">
              {{ formatDate(treatment?.diagnosis_date) }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Mulai Terapi
            </span>

            <span class="value">
              {{ formatDate(treatment?.therapy_start_date) }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Selesai Terapi
            </span>

            <span class="value">
              {{ formatDate(treatment?.therapy_end_date) }}
            </span>

          </div>

          <div class="key-value">

            <span class="key">
              Regimen
            </span>

            <span class="value">
              {{ formatRegimen(treatment?.regimen) }}
            </span>

          </div>

        </div>

      </div>


      <!-- Pendampingan -->
      <div class="card info-card">

        <div class="card-header">

          <div class="icon-wrapper">

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
              <path
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              ></path>
              <circle
                cx="9"
                cy="7"
                r="4"
              ></circle>
              <path
                d="M23 21v-2a4 4 0 0 0-3-3.87"
              ></path>
              <path
                d="M16 3.13a4 4 0 0 1 0 7.75"
              ></path>
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

                <div class="person-name">
                  {{ patient.pmo_name || '-' }}
                </div>

                <div class="person-role">
                  PMO
                </div>

              </div>

            </div>

            <button
              class="btn-icon-small"
              type="button"
              @click="callNumber(patient.pmo_phone)"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2
                  19.79 19.79 0 0 1-8.63-3.07
                  19.5 19.5 0 0 1-6-6
                  19.79 19.79 0 0 1-3.07-8.67
                  A2 2 0 0 1 4.11 2h3
                  a2 2 0 0 1 2 1.72
                  12.84 12.84 0 0 0 .7 2.81
                  2 2 0 0 1-.45 2.11L8.09 9.91
                  a16 16 0 0 0 6 6l1.27-1.27
                  a2 2 0 0 1 2.11-.45
                  12.84 12.84 0 0 0 2.81.7
                  A2 2 0 0 1 22 16.92z"
                ></path>
              </svg>

            </button>

          </div>

        </div>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- 3. Middle Row -->
    <!-- ================================================= -->

    <div
      v-if="patient"
      class="grid-layout-65-35"
    >

      <!-- Logistik OAT -->
      <div class="card">

        <div class="card-header space-between">

          <div class="d-flex align-center">

            <div class="icon-wrapper">

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
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4
                  a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8
                  a2 2 0 0 0 1 1.73l7 4
                  a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline
                  points="3.27 6.96 12 12.01 20.73 6.96"
                ></polyline>
                <line
                  x1="12"
                  y1="22.08"
                  x2="12"
                  y2="12"
                ></line>
              </svg>

            </div>

            <h3>
              Logistik OAT (Obat Anti Tuberkulosis)
            </h3>

          </div>

          <a
            href="#"
            class="link-primary"
            @click.prevent
          >
            Lihat Semua Riwayat
          </a>

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

              <tr
                v-for="refill in refills"
                :key="refill.id"
              >

                <td>
                  {{ formatDate(refill.created_at) }}
                </td>

                <td>
                  {{ refill.medicine_id || '-' }}
                </td>

                <td>
                  {{ refill.quantity ?? '-' }}
                </td>

                <td>

                  <span
                    class="badge"
                    :class="getRefillBadgeClass(refill.status)"
                  >
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
              <circle
                cx="12"
                cy="12"
                r="10"
              ></circle>

              <polyline
                points="12 6 12 12 16 14"
              ></polyline>
            </svg>

          </div>

          <h3>
            Garis Waktu Pengobatan
          </h3>

        </div>

        <div class="card-body">

          <div class="timeline">

            <!-- Diagnosis -->
            <div
              v-if="treatment?.diagnosis_date"
              class="timeline-item"
            >

              <div class="timeline-dot dot-primary"></div>

              <div class="timeline-content">

                <div class="timeline-date">
                  {{ formatDate(treatment.diagnosis_date) }}
                </div>

                <div class="timeline-title">
                  Diagnosis TB
                </div>

                <div class="timeline-desc">
                  Diagnosis pasien tercatat.
                </div>

              </div>

            </div>


            <!-- Mulai terapi -->
            <div
              v-if="treatment?.therapy_start_date"
              class="timeline-item"
            >

              <div class="timeline-dot dot-primary"></div>

              <div class="timeline-content">

                <div class="timeline-date">
                  {{ formatDate(treatment.therapy_start_date) }}
                </div>

                <div class="timeline-title">
                  Mulai Terapi (OAT)
                </div>

                <div class="timeline-desc">
                  {{ formatPhase(treatment.phase) }}
                </div>

              </div>

            </div>


            <!-- Perubahan fase -->
            <div
              v-if="treatment?.phase"
              class="timeline-item"
            >

              <div class="timeline-dot dot-primary"></div>

              <div class="timeline-content">

                <div class="timeline-date">
                  Fase Pengobatan
                </div>

                <div class="timeline-title">
                  {{ formatPhase(treatment.phase) }}
                </div>

                <div class="timeline-desc">
                  Regimen:
                  {{ formatRegimen(treatment.regimen) }}
                </div>

              </div>

            </div>


            <!-- Jadwal kontrol -->
            <div
              v-if="nextControl"
              class="timeline-item"
            >

              <div class="timeline-dot dot-gray"></div>

              <div class="timeline-content">

                <div class="timeline-date">
                  {{ formatDate(nextControl.control_date) }}
                </div>

                <div class="timeline-title text-muted">
                  Jadwal Kontrol Berikutnya
                </div>

              </div>

            </div>

            <div
              v-if="!treatment && !nextControl"
              class="timeline-item"
            >

              <div class="timeline-content">

                <div class="timeline-title text-muted">
                  Belum ada data pengobatan.
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>


    <!-- ================================================= -->
    <!-- 4. Bottom Row -->
    <!-- ================================================= -->

    <div
      v-if="patient"
      class="grid-layout-65-35"
    >

      <!-- Catatan Klinis & Administrasi -->
      <div class="card">

        <div class="card-header space-between">

          <h3>
            Catatan Klinis & Administrasi
          </h3>

          <button
            class="btn btn-filled-small"
            type="button"
            @click="addNote"
          >
            + Tambah Catatan
          </button>

        </div>

        <div class="card-body p-0">

          <div class="note-list">

            <!-- Clinical note pasien -->
            <div
              v-if="patient.clinical_note"
              class="note-item"
            >

              <div class="note-avatar bg-blue-light">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M22 12h-4l-3 9L9 3l-3 9H2"
                  ></path>
                </svg>

              </div>

              <div class="note-content-wrapper">

                <div class="note-header">

                  <span class="note-author">
                    Catatan Klinis
                  </span>

                  <span class="note-time">
                    {{ formatDateTime(patient.updated_at) }}
                  </span>

                </div>

                <div class="note-text">
                  {{ patient.clinical_note }}
                </div>

              </div>

            </div>


            <!-- Doctor note -->
            <div
              v-if="treatment?.doctor_note"
              class="note-item"
            >

              <div class="note-avatar bg-green-light">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16
                    a2 2 0 0 0 2 2h12
                    a2 2 0 0 0 2-2V8z"
                  ></path>

                  <polyline
                    points="14 2 14 8 20 8"
                  ></polyline>

                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                  ></line>

                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                  ></line>
                </svg>

              </div>

              <div class="note-content-wrapper">

                <div class="note-header">

                  <span class="note-author">
                    {{ treatment.doctor_name || 'Dokter' }}
                  </span>

                  <span class="note-time">
                    {{ formatDateTime(treatment.updated_at) }}
                  </span>

                </div>

                <div class="note-text">
                  {{ treatment.doctor_note }}
                </div>

              </div>

            </div>


            <!-- Empty -->
            <div
              v-if="
                !patient.clinical_note &&
                !treatment?.doctor_note
              "
              class="note-item"
            >

              <div class="note-content-wrapper">

                <div class="note-text text-muted">
                  Belum ada catatan klinis atau administrasi.
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      <!-- Jadwal Kontrol Berikutnya -->
      <div class="card schedule-card">

        <div class="schedule-header">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect
              x="3"
              y="4"
              width="18"
              height="18"
              rx="2"
              ry="2"
            ></rect>

            <line
              x1="16"
              y1="2"
              x2="16"
              y2="6"
            ></line>

            <line
              x1="8"
              y1="2"
              x2="8"
              y2="6"
            ></line>

            <line
              x1="3"
              y1="10"
              x2="21"
              y2="10"
            ></line>
          </svg>

          <span>
            Jadwal Kontrol Berikutnya
          </span>

        </div>


        <template v-if="nextControl">

          <div class="schedule-date">
            {{ formatDate(nextControl.control_date) }}
          </div>

          <div class="schedule-location">
            Pukul {{ nextControl.control_time || '-' }} WIB
          </div>

        </template>

        <template v-else>

          <div class="schedule-date">
            Belum Ada
          </div>

          <div class="schedule-location">
            Belum ada jadwal kontrol berikutnya.
          </div>

        </template>


        <div class="doctor-info">

          <div class="avatar-small">
            {{ getInitials(treatment?.doctor_name) }}
          </div>

          <div class="doctor-details">

            <div class="doctor-name">
              {{ treatment?.doctor_name || '-' }}
            </div>

            <div class="doctor-spec">
              Dokter Penanggung Jawab
            </div>

          </div>

        </div>


        <div class="schedule-actions">

          <button
            class="btn btn-white"
            type="button"
            @click="rescheduleControl"
          >
            Jadwal Ulang
          </button>

          <button
            class="btn-icon-white"
            type="button"
            @click="shareSchedule"
          >

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
              <circle
                cx="18"
                cy="5"
                r="3"
              ></circle>

              <circle
                cx="6"
                cy="12"
                r="3"
              ></circle>

              <circle
                cx="18"
                cy="19"
                r="3"
              ></circle>

              <line
                x1="8.59"
                y1="13.51"
                x2="15.42"
                y2="17.49"
              ></line>

              <line
                x1="15.41"
                y1="6.51"
                x2="8.59"
                y2="10.49"
              ></line>
            </svg>

          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<style scoped src="./PatientDetailView.css"></style>