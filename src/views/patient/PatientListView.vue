<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import { useRouter } from 'vue-router'
import { usePatientStore } from '../../stores/patient'

const router = useRouter()
const patientStore = usePatientStore()


// ========================================
// FILTER
// ========================================

const filters = ref({
  search: '',
  gender: ''
})


// ========================================
// PAGINATION
// ========================================

const currentPage = ref(1)
const pageSize = 10


// ========================================
// DROPDOWN
// ========================================

const activeDropdown = ref(null)


// ========================================
// LOAD DATA
// ========================================

const loadPatients = async () => {
  try {
    await patientStore.fetchPatients()

    console.log(
      'PATIENT DATA:',
      patientStore.patients
    )
  } catch (error) {
    console.error(error)
  }
}


// ========================================
// FILTERED PATIENTS
// ========================================

const filteredPatients = computed(() => {
  const search =
    filters.value.search
      .trim()
      .toLowerCase()

  return patientStore.patients.filter(
    patient => {

      const name =
        patient.full_name
          ?.toLowerCase() || ''

      const nik =
        patient.nik || ''

      const matchesSearch =
        !search ||
        name.includes(search) ||
        nik.includes(search)

      const matchesGender =
        !filters.value.gender ||
        patient.gender ===
          filters.value.gender

      return (
        matchesSearch &&
        matchesGender
      )
    }
  )
})


// ========================================
// PAGINATED
// ========================================

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredPatients.value.length /
      pageSize
    )
  )
})

const paginatedPatients = computed(() => {
  const start =
    (currentPage.value - 1) *
    pageSize

  return filteredPatients.value.slice(
    start,
    start + pageSize
  )
})


// ========================================
// STATISTICS
// ========================================

const totalPatients = computed(() =>
  patientStore.patients.length
)

const activePatients = computed(() =>
  patientStore.patients.filter(
    patient =>
      patient.is_active === true
  ).length
)


// ========================================
// HELPERS
// ========================================

const getInitials = (name) => {
  if (!name) return '?'

  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const calculateAge = (birthDate) => {
  if (!birthDate) return '-'

  const birth =
    new Date(birthDate)

  const today =
    new Date()

  let age =
    today.getFullYear() -
    birth.getFullYear()

  const month =
    today.getMonth() -
    birth.getMonth()

  if (
    month < 0 ||
    (
      month === 0 &&
      today.getDate() <
      birth.getDate()
    )
  ) {
    age--
  }

  return age
}

const formatGender = (gender) => {
  if (gender === 'male')
    return 'Laki-laki'

  if (gender === 'female')
    return 'Perempuan'

  return '-'
}


// ========================================
// NAVIGATION
// ========================================

const viewPatient = (id) => {
  router.push(
    `/dashboard/patients/${id}`
  )
}

const editPatient = (id) => {
  router.push(
    `/dashboard/patients/${id}/edit`
  )
}


// ========================================
// DELETE
// ========================================

const deletePatient = async (patient) => {

  const confirmed = confirm(
    `Apakah Anda yakin ingin menghapus data pasien ${patient.full_name}?`
  )

  if (!confirmed) return

  try {

    await patientStore.deletePatient(
      patient.id
    )

    alert(
      'Pasien berhasil dihapus'
    )

  } catch (error) {

    alert(
      error.response?.data?.detail ||
      'Gagal menghapus pasien'
    )
  }
}


// ========================================
// RESET FILTER
// ========================================

const resetFilters = () => {
  filters.value = {
    search: '',
    gender: ''
  }

  currentPage.value = 1
}


// ========================================
// DROPDOWN
// ========================================

const toggleDropdown = (id) => {
  activeDropdown.value =
    activeDropdown.value === id
      ? null
      : id
}

const handleDocumentClick = () => {
  activeDropdown.value = null
}


// ========================================
// PAGINATION
// ========================================

const prevPage = () => {
  if (
    currentPage.value > 1
  ) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (
    currentPage.value <
    totalPages.value
  ) {
    currentPage.value++
  }
}


// ========================================
// LIFECYCLE
// ========================================

onMounted(() => {

  loadPatients()

  document.addEventListener(
    'click',
    handleDocumentClick
  )
})

onUnmounted(() => {

  document.removeEventListener(
    'click',
    handleDocumentClick
  )
})
</script>

<template>
  <div class="patient-list-page">

    <!-- ========================================== -->
    <!-- PAGE HEADER -->
    <!-- ========================================== -->

    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Pasien</h1>
        <p class="page-subtitle">
          Kelola data pasien TB dan monitor data pasien.
        </p>
      </div>

      <router-link
        to="/dashboard/patients/add"
        class="btn-add"
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
          class="icon-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>

        Tambah Pasien Baru
      </router-link>
    </header>


    <!-- ========================================== -->
    <!-- STATISTIC CARDS -->
    <!-- ========================================== -->

    <section class="stats-grid">

      <!-- Total Pasien -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>

        <div class="stat-info">
          <span class="stat-label">TOTAL PASIEN</span>
          <span class="stat-value">
            {{ totalPatients }}
          </span>
        </div>
      </div>


      <!-- Pasien Aktif -->
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
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
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </div>

        <div class="stat-info">
          <span class="stat-label">PASIEN AKTIF</span>
          <span class="stat-value">
            {{ activePatients }}
          </span>
        </div>
      </div>


      <!-- Sedang Terapi -->
      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
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
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <div class="stat-info">
          <span class="stat-label">SEDANG TERAPI</span>
          <span class="stat-value">
            -
          </span>
        </div>
      </div>


      <!-- Selesai Terapi -->
      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
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
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="16 12 12 16 8 12"></polyline>
          </svg>
        </div>

        <div class="stat-info">
          <span class="stat-label">SELESAI TERAPI</span>
          <span class="stat-value">
            -
          </span>
        </div>
      </div>


      <!-- Risiko Tinggi -->
      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
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
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>

        <div class="stat-info">
          <span class="stat-label">RISIKO TINGGI</span>
          <span class="stat-value">
            -
          </span>
        </div>
      </div>

    </section>


    <!-- ========================================== -->
    <!-- FILTER -->
    <!-- ========================================== -->

    <section class="filter-section card">

      <div class="filter-header">
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
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>

        <h2>Filter Pencarian Pasien</h2>
      </div>


      <div class="filter-grid-simple">

        <!-- Search -->
        <div class="form-group">
          <label>Nama atau NIK</label>

          <input
            type="text"
            v-model="filters.search"
            placeholder="Cari nama atau NIK..."
            class="form-control"
            @input="currentPage = 1"
          />
        </div>


        <!-- Gender -->
        <div class="form-group">
          <label>Jenis Kelamin</label>

          <select
            v-model="filters.gender"
            class="form-control"
            @change="currentPage = 1"
          >
            <option value="">
              Semua Jenis Kelamin
            </option>

            <option value="male">
              Laki-laki
            </option>

            <option value="female">
              Perempuan
            </option>
          </select>
        </div>


        <!-- Reset -->
        <div class="form-group filter-reset-wrapper">
          <label>&nbsp;</label>

          <button
            type="button"
            class="btn-reset-filter"
            @click="resetFilters"
          >
            Reset Filter
          </button>
        </div>

      </div>

    </section>


    <!-- ========================================== -->
    <!-- PATIENT TABLE -->
    <!-- ========================================== -->

    <section class="table-section card">

      <!-- Loading -->
      <div
        v-if="patientStore.loading"
        class="loading-state"
      >
        Memuat data pasien...
      </div>


      <!-- Error -->
      <div
        v-else-if="patientStore.error"
        class="error-state"
      >
        <p>{{ patientStore.error }}</p>

        <button
          type="button"
          class="btn-retry"
          @click="loadPatients"
        >
          Coba Lagi
        </button>
      </div>


      <!-- Empty -->
      <div
        v-else-if="filteredPatients.length === 0"
        class="empty-state"
      >
        <p>
          Tidak ada data pasien.
        </p>

        <button
          v-if="filters.search || filters.gender"
          type="button"
          class="btn-retry"
          @click="resetFilters"
        >
          Reset Filter
        </button>
      </div>


      <!-- Table -->
      <div
        v-else
        class="table-responsive"
      >

        <table class="custom-table">

          <thead>
            <tr>
              <th>PASIEN & NIK</th>
              <th>DATA PASIEN</th>
              <th>CATATAN KLINIS</th>
              <th>PMO</th>
              <th>STATUS</th>
              <th class="text-center">
                AKSI
              </th>
            </tr>
          </thead>


          <tbody>

            <tr
              v-for="patient in paginatedPatients"
              :key="patient.id"
            >

              <!-- ================================= -->
              <!-- PASIEN & NIK -->
              <!-- ================================= -->

              <td>
                <div class="patient-profile">

                  <div class="avatar">
                    {{ getInitials(patient.full_name) }}
                  </div>

                  <div class="patient-details">

                    <span class="patient-name">
                      {{ patient.full_name }}
                    </span>

                    <span class="patient-nik">
                      NIK:
                      {{ patient.nik || '-' }}
                    </span>

                    <span class="patient-age">
                      {{ calculateAge(patient.birth_date) }}
                      Tahun
                    </span>

                  </div>

                </div>
              </td>


              <!-- ================================= -->
              <!-- DATA PASIEN -->
              <!-- ================================= -->

              <td>
                <div class="tb-info">

                  <span class="badge badge-green">
                    {{ formatGender(patient.gender) }}
                  </span>

                  <span class="phase-text">
                    RM:
                    {{ patient.medical_record_number || '-' }}
                  </span>

                  <span class="month-text">
                    {{ patient.phone || '-' }}
                  </span>

                </div>
              </td>


              <!-- ================================= -->
              <!-- CATATAN KLINIS -->
              <!-- ================================= -->

              <td>
                <div class="compliance-info">

                  <span
                    v-if="patient.clinical_note"
                    class="clinical-note"
                    :title="patient.clinical_note"
                  >
                    {{ patient.clinical_note }}
                  </span>

                  <span
                    v-else
                    class="text-muted"
                  >
                    Belum ada catatan
                  </span>

                </div>
              </td>


              <!-- ================================= -->
              <!-- PMO -->
              <!-- ================================= -->

              <td>
                <div class="pmo-info">

                  <span class="pmo-name">
                    {{ patient.pmo_name || 'Belum ada PMO' }}
                  </span>

                  <span class="kader-name">
                    {{ patient.pmo_phone || '-' }}
                  </span>

                </div>
              </td>


              <!-- ================================= -->
              <!-- STATUS -->
              <!-- ================================= -->

              <td>
                <span
                  class="status-badge"
                  :class="{
                    'status-low': patient.is_active,
                    'status-high': !patient.is_active
                  }"
                >
                  {{
                    patient.is_active
                      ? 'Aktif'
                      : 'Tidak Aktif'
                  }}
                </span>
              </td>


              <!-- ================================= -->
              <!-- AKSI -->
              <!-- ================================= -->

              <td class="text-center relative">

                <div class="action-dropdown-wrapper">

                  <button
                    class="btn-more-actions"
                    @click.stop="toggleDropdown(patient.id)"
                    title="Aksi"
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>


                  <!-- Dropdown -->

                  <div
                    v-if="activeDropdown === patient.id"
                    class="dropdown-menu-floating"
                    @click.stop
                  >

                    <!-- Detail -->

                    <button
                      class="dropdown-item"
                      @click="
                        viewPatient(patient.id);
                        activeDropdown = null
                      "
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
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>

                      <span>
                        Lihat Detail
                      </span>
                    </button>


                    <!-- Edit -->

                    <button
                      class="dropdown-item"
                      @click="
                        editPatient(patient.id);
                        activeDropdown = null
                      "
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
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>

                      <span>
                        Edit Pasien
                      </span>
                    </button>


                    <!-- Delete -->

                    <button
                      class="dropdown-item text-danger"
                      @click="
                        deletePatient(patient);
                        activeDropdown = null
                      "
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>

                      <span>
                        Hapus
                      </span>
                    </button>

                  </div>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <!-- ========================================== -->
      <!-- PAGINATION -->
      <!-- ========================================== -->

      <div
        v-if="filteredPatients.length > 0"
        class="pagination-section"
      >

        <div class="pagination-info">

          Menampilkan
          {{
            Math.min(
              (currentPage - 1) * pageSize + 1,
              filteredPatients.length
            )
          }}
          -
          {{
            Math.min(
              currentPage * pageSize,
              filteredPatients.length
            )
          }}
          dari
          {{ filteredPatients.length }}
          pasien

        </div>


        <div class="pagination-controls">

          <button
            class="btn-page"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            Prev
          </button>


          <button
            v-for="page in totalPages"
            :key="page"
            class="btn-page"
            :class="{
              active: currentPage === page
            }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>


          <button
            class="btn-page"
            @click="nextPage"
            :disabled="
              currentPage === totalPages
            "
          >
            Next
          </button>

        </div>

      </div>

    </section>

  </div>
</template>

<style scoped>
/* Page Layout */
.patient-list-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
  color: #334155;
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
}

/* 1. Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}
.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}
.page-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}
.btn-add {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #006591;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.2s;
}
.btn-add:hover {
  background-color: #005378;
}

/* 2. Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.teal-circle { background-color: #E0F2FE; color: #0284C7; }
.green-circle { background-color: #DCFCE7; color: #16A34A; }
.orange-circle { background-color: #FEF3C7; color: #D97706; }
.red-circle { background-color: #FEE2E2; color: #DC2626; }

.stat-info {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

/* Shared Card Style */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}

/* 3. Filter Section */
.filter-section {
  padding: 20px;
}
.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #334155;
}
.filter-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.filter-grid-simple {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .filter-grid-simple { grid-template-columns: 1fr; }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 13px;
  font-weight: 500;
  color: #475569;
}
.hidden-label {
  visibility: hidden;
}
.form-control {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
  color: #334155;
}
.form-control:focus {
  border-color: #006591;
}
.action-buttons {
  display: flex;
  gap: 8px;
}
.btn-primary {
  flex: 1;
  background-color: #006591;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-primary:hover {
  background-color: #005378;
}
.btn-icon-reset {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-icon-reset:hover {
  background-color: #e2e8f0;
  color: #334155;
}

/* 4. Table Section */
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 800px;
}
.custom-table th {
  background-color: #f8fafc;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}
.custom-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
.custom-table tbody tr {
  transition: background-color 0.15s;
}
.custom-table tbody tr:hover {
  background-color: #f8fafc;
}

/* Table Cells Details */
.patient-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #006591 0%, #6DF5E1 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}
.patient-details {
  display: flex;
  flex-direction: column;
}
.patient-name {
  font-weight: 600;
  color: #0f172a;
  font-size: 14px;
}
.patient-nik {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}
.patient-age {
  font-size: 12px;
  color: #94a3b8;
}

.tb-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}
.badge-green {
  background-color: #DCFCE7;
  color: #16A34A;
}
.badge-red {
  background-color: #FEE2E2;
  color: #DC2626;
}
.phase-text {
  font-size: 13px;
  color: #334155;
}
.month-text {
  font-size: 12px;
  color: #64748b;
}

.compliance-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.compliance-text {
  font-size: 13px;
  font-weight: 600;
}
.progress-bar-bg {
  width: 120px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
}

.pmo-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.pmo-name {
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}
.pmo-relation {
  color: #64748b;
  font-weight: 400;
}
.kader-name {
  font-size: 12px;
  color: #64748b;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  display: inline-block;
}
.status-high {
  background-color: #FEE2E2;
  color: #DC2626;
}
.status-medium {
  background-color: #FEF3C7;
  color: #D97706;
}
.status-low {
  background-color: #DCFCE7;
  color: #16A34A;
}

.text-center {
  text-align: center;
}
.action-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.btn-more-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #F1F5F9;
  color: #334155;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-more-actions:hover {
  background-color: #E2E8F0;
  color: #0F172A;
  border-color: #CBD5E1;
}

.dropdown-menu-floating {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 6px;
  min-width: 160px;
  background-color: #0F172A;
  border: 1px solid #334155;
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  padding: 6px;
  z-index: 100;
  text-align: left;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #F8FAFC;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
}

.dropdown-item.text-danger {
  color: #F87171;
}

.dropdown-item.text-danger:hover {
  background-color: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}
.action-buttons-table {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-action {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
  color: #006591;
}

/* 5. Pagination */
.pagination-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
  gap: 16px;
}
.pagination-info {
  font-size: 14px;
  color: #64748b;
}
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid #E2E8F0;
  background-color: #FFFFFF;
  color: #006591;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-page:hover:not(:disabled):not(.active) {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}
.btn-page:disabled {
  color: #94A3B8;
  border-color: #E2E8F0;
  background-color: #FFFFFF;
  cursor: not-allowed;
  opacity: 0.75;
}
.btn-page.active {
  background-color: #006591;
  color: #FFFFFF;
  border-color: #006591;
  font-weight: 600;
}
.page-ellipsis {
  color: #006591;
  font-size: 14px;
  font-weight: 500;
  padding: 0 6px;
}
</style>
