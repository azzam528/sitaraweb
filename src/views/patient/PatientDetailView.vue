<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const patient = ref(null)
const treatment = ref(null)
const nextControl = ref(null)
const refills = ref([])

const loading = ref(false)
const error = ref(null)

const patientId = route.params.id


// =====================================================
// FETCH DETAIL PASIEN
// =====================================================

const fetchPatientDetail = async () => {
  loading.value = true
  error.value = null

  try {
    /*
     * Endpoint yang digunakan:
     *
     * GET /patients/{patient_id}/detail
     *
     * Response:
     *
     * {
     *   patient: {...},
     *   treatment: {...},
     *   next_control: {...},
     *   refills: [...]
     * }
     */

    const response = await api.get(
      `/patients/${patientId}/detail`
    )

    const data = response.data

    patient.value = data.patient || null
    treatment.value = data.treatment || null
    nextControl.value = data.next_control || null
    refills.value = Array.isArray(data.refills)
      ? data.refills
      : []

  } catch (err) {

    console.error(
      'Gagal mengambil detail pasien:',
      err
    )

    error.value =
      err.response?.data?.detail ||
      'Gagal mengambil data pasien.'

  } finally {

    loading.value = false

  }
}


// =====================================================
// FORMAT DATA
// =====================================================

const formatDate = (dateValue) => {

  if (!dateValue) {
    return '-'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  ).format(date)
}


const formatDateTime = (dateValue) => {

  if (!dateValue) {
    return '-'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(date)
}


const calculateAge = (birthDate) => {

  if (!birthDate) {
    return '-'
  }

  const birth = new Date(birthDate)

  if (Number.isNaN(birth.getTime())) {
    return '-'
  }

  const today = new Date()

  let age =
    today.getFullYear() -
    birth.getFullYear()

  const monthDifference =
    today.getMonth() -
    birth.getMonth()

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birth.getDate()
    )
  ) {
    age--
  }

  return age
}


const formatGender = (gender) => {

  if (!gender) {
    return '-'
  }

  const genderMap = {
    male: 'Laki-laki',
    female: 'Perempuan'
  }

  return genderMap[gender] || gender
}


const formatPhase = (phase) => {

  if (!phase) {
    return '-'
  }

  const phaseMap = {
    intensive: 'Fase Intensif',
    continuation: 'Fase Lanjutan'
  }

  return phaseMap[phase] || phase
}


const formatRegimen = (regimen) => {

  if (!regimen) {
    return '-'
  }

  const regimenMap = {
    category_1: 'Kategori 1',
    category_2: 'Kategori 2',
    mdr: 'MDR'
  }

  return regimenMap[regimen] || regimen
}


const formatTreatmentStatus = (status) => {

  if (!status) {
    return '-'
  }

  const statusMap = {
    active: 'Aktif Pengobatan',
    completed: 'Selesai',
    dropped: 'Putus Berobat'
  }

  return statusMap[status] || status
}


const formatRefillStatus = (status) => {

  if (!status) {
    return '-'
  }

  const statusMap = {
    pending: 'Menunggu',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  }

  return statusMap[status] || status
}


const getRefillBadgeClass = (status) => {

  if (status === 'approved') {
    return 'badge-success'
  }

  if (status === 'rejected') {
    return 'badge-danger'
  }

  return ''
}


// =====================================================
// INITIALS
// =====================================================

const getInitials = (name) => {

  if (!name) {
    return '-'
  }

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 1) {
    return words[0]
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase()
}


// =====================================================
// ACTIONS
// =====================================================

const contactPatient = () => {

  if (!patient.value?.phone) {
    alert('Nomor telepon pasien belum tersedia.')
    return
  }

  callNumber(patient.value.phone)
}


const callNumber = (phone) => {

  if (!phone) {
    alert('Nomor telepon belum tersedia.')
    return
  }

  window.location.href = `tel:${phone}`
}


const showPatientMenu = () => {

  /*
   * Untuk sekarang hanya placeholder.
   *
   * Nanti bisa kita isi:
   * - Nonaktifkan pasien
   * - Hapus pasien
   * - Kirim WhatsApp
   * - Reset password
   */

  console.log(
    'Patient menu:',
    patient.value
  )
}


const addNote = () => {

  /*
   * Backend saat ini belum memiliki
   * endpoint khusus clinical notes.
   */

  alert(
    'Fitur tambah catatan akan dihubungkan setelah endpoint catatan tersedia.'
  )
}


const rescheduleControl = () => {

  if (!nextControl.value) {
    alert(
      'Belum ada jadwal kontrol yang bisa dijadwalkan ulang.'
    )

    return
  }

  /*
   * Endpoint control schedule sudah tersedia.
   * Form reschedule bisa kita buat berikutnya.
   */

  console.log(
    'Reschedule:',
    nextControl.value
  )
}


const shareSchedule = () => {

  if (!nextControl.value) {
    alert('Belum ada jadwal kontrol.')
    return
  }

  const text =
    `Jadwal kontrol pasien ${patient.value?.full_name || ''}: ` +
    `${formatDate(nextControl.value.control_date)} ` +
    `pukul ${nextControl.value.control_time || '-'} WIB`

  if (
    navigator.share
  ) {

    navigator.share({
      title: 'Jadwal Kontrol',
      text
    }).catch(() => {})

  } else {

    navigator.clipboard
      ?.writeText(text)

    alert(
      'Informasi jadwal berhasil disalin.'
    )

  }
}


// =====================================================
// LOAD
// =====================================================

onMounted(() => {

  if (!patientId) {

    error.value =
      'ID pasien tidak ditemukan.'

    return
  }

  fetchPatientDetail()

})
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


<style scoped>
.patient-detail-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
  color: #1E293B;
  padding-bottom: 32px;
}

/* Typography & Utilities */
h2 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
}
h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}
.text-primary { color: #006591; }
.text-muted { color: #64748B; }
.font-semibold { font-weight: 600; }
.d-flex { display: flex; }
.align-center { align-items: center; }
.space-between { justify-content: space-between; }
.p-0 { padding: 0 !important; }

/* Links */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #64748B;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.back-link:hover {
  color: #006591;
}
.link-primary {
  color: #006591;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}
.link-primary:hover {
  text-decoration: underline;
}

/* Cards */
.card {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
  padding: 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid #E2E8F0;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #F1F5F9;
  border-radius: 8px;
  color: #006591;
}

/* Layout Grids */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.grid-layout-65-35 {
  display: grid;
  grid-template-columns: 65fr 35fr;
  gap: 24px;
}

@media (max-width: 1024px) {
  .grid-3, .grid-layout-65-35 {
    grid-template-columns: 1fr;
  }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn-outline {
  background: transparent;
  border: 1px solid #006591;
  color: #006591;
}
.btn-filled {
  background: #006591;
  color: white;
}
.btn-filled:hover {
  background: #005378;
}
.btn-filled-small {
  background: #006591;
  color: white;
  padding: 8px 12px;
  font-size: 0.75rem;
  border-radius: 6px;
}
.btn-filled-small:hover {
  background: #005378;
}
.btn-white {
  background: white;
  color: #006591;
}
.btn-icon, .btn-icon-white {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #E2E8F0;
  background: white;
  color: #64748B;
}
.btn-icon-white {
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
}
.btn-icon-small {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  background: #F1F5F9;
  color: #006591;
}

/* Badges */
.badge {
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}
.badge-success {
  background: #DCFCE7;
  color: #166534;
}
.badge-success-outline {
  background: transparent;
  border: 1px solid #22C55E;
  color: #166534;
}
.badge-danger {
  background: #FEE2E2;
  color: #991B1B;
}

/* 1. Profile Header */
.profile-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 24px;
}
.profile-left {
  display: flex;
  gap: 20px;
  align-items: center;
}
.avatar-large {
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  flex: 0 0 80px;
  aspect-ratio: 1 / 1;

  background: #006591;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 1.75rem;
  font-weight: 600;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}
.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748B;
  font-size: 0.875rem;
}
.dot { font-size: 1.2rem; line-height: 1; }
.profile-actions {
  display: flex;
  gap: 12px;
}
.profile-bottom {
  display: flex;
  gap: 48px;
}
.data-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748B;
  letter-spacing: 0.05em;
}
.field-value {
  font-weight: 600;
  font-size: 1rem;
}

@media (max-width: 768px) {
  .profile-top {
    flex-direction: column;
    gap: 16px;
  }
  .profile-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  .profile-bottom {
    flex-wrap: wrap;
    gap: 24px;
  }
}

/* 2. Info Cards */
.key-value {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}
.key-value:last-child { margin-bottom: 0; }
.key {
  font-size: 0.75rem;
  color: #64748B;
}
.value {
  font-size: 0.875rem;
  color: #1E293B;
  font-weight: 500;
}

.person-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  margin-bottom: 12px;
}
.person-card:last-child { margin-bottom: 0; }
.person-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar-small {
  width: 40px;
  height: 40px;
  background: #E2E8F0;
  color: #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}
.bg-blue {
  background: #DBEAFE;
  color: #1D4ED8;
}
.person-name {
  font-size: 0.875rem;
  font-weight: 600;
}
.person-role {
  font-size: 0.75rem;
  color: #64748B;
}

/* 3. Table */
.table-container {
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}
.table th {
  padding: 12px 16px;
  color: #64748B;
  font-weight: 600;
  font-size: 0.75rem;
  border-bottom: 1px solid #E2E8F0;
  background: #F8FAFC;
}
.table td {
  padding: 16px;
  border-bottom: 1px solid #E2E8F0;
  color: #1E293B;
  font-weight: 500;
}
.table tr:last-child td { border-bottom: none; }

/* 3. Timeline */
.timeline {
  position: relative;
  padding-left: 24px;
  margin-top: 8px;
}
.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
  width: 2px;
  background: #E2E8F0;
}
.timeline-item {
  position: relative;
  margin-bottom: 24px;
}
.timeline-item:last-child { margin-bottom: 0; }
.timeline-dot {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  z-index: 1;
}
.dot-primary { background: #006591; box-shadow: 0 0 0 2px #00659140; }
.dot-success { background: #22C55E; box-shadow: 0 0 0 2px #22C55E40; }
.dot-gray { background: #94A3B8; }
.timeline-date {
  font-size: 0.75rem;
  color: #64748B;
  margin-bottom: 4px;
}
.timeline-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 4px;
}
.timeline-desc {
  font-size: 0.875rem;
  color: #475569;
}

/* 4. Notes */
.note-list {
  display: flex;
  flex-direction: column;
}
.note-item {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #E2E8F0;
}
.note-item:last-child { border-bottom: none; }
.note-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.bg-blue-light { background: #DBEAFE; }
.bg-green-light { background: #DCFCE7; }
.note-content-wrapper { flex: 1; }
.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.note-author {
  font-weight: 600;
  font-size: 0.875rem;
}
.note-time {
  font-size: 0.75rem;
  color: #64748B;
}
.note-text {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
}

/* 4. Schedule Card */
.schedule-card {
  background: linear-gradient(135deg, #004D70 0%, #006591 100%);
  color: white;
  border: none;
}
.schedule-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 16px;
}
.schedule-date {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 4px;
}
.schedule-location {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 24px;
}
.doctor-info {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.1);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 24px;
}
.doctor-name {
  font-weight: 600;
  font-size: 0.875rem;
}
.doctor-spec {
  font-size: 0.75rem;
  opacity: 0.8;
}
.schedule-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}
</style>
