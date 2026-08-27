<script setup>
import { usePatientListView } from "./PatientListView.js";

const {
  patientStore,
  filters,
  currentPage,
  pageSize,
  activeDropdown,
  totalPatients,
  activePatients,
  completedPatients,
  filteredPatients,
  totalPages,
  paginatedPatients,
  loadPatients,
  getInitials,
  calculateAge,
  formatGender,
  viewPatient,
  addTreatment,
  editPatient,
  contactPmo,
  deletePatient,
  resetFilters,
  toggleDropdown,
  handleDocumentClick,
  prevPage,
  nextPage,
} = usePatientListView();
</script>

<template>
  <div class="patient-list-page">
    <!-- PAGE HEADER -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Pasien</h1>
        <p class="page-subtitle">
          Kelola data pasien TB dan monitor data pasien.
        </p>
      </div>

      <router-link to="/dashboard/patients/add" class="btn-add">
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

    <!-- STATISTIC CARDS -->
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
          <span class="stat-value">{{ totalPatients }}</span>
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
            <path
              d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
            ></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PASIEN AKTIF</span>
          <span class="stat-value">{{ activePatients }}</span>
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
          <span class="stat-value">{{ activePatients }}</span>
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
          <span class="stat-value">{{ completedPatients }}</span>
        </div>
      </div>
    </section>

    <!-- FILTER -->
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
          <polygon
            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
          ></polygon>
        </svg>
        <h2>Filter Pencarian Pasien</h2>
      </div>

      <div class="filter-grid-simple">
        <!-- Search -->
        <div class="form-group">
          <label>Nama, NIK, atau No. RM</label>
          <input
            type="text"
            v-model="filters.search"
            placeholder="Cari nama, NIK, atau No. RM..."
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
            <option value="">Semua Jenis Kelamin</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
      </div>
    </section>

    <!-- PATIENT TABLE -->
    <section class="table-section card">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>PASIEN</th>
              <th>CATATAN KLINIS</th>
              <th>PMO</th>
              <th>STATUS</th>
              <th class="text-center">AKSI</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="patientStore.loading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data pasien...
              </td>
            </tr>
            <tr v-else-if="patientStore.error">
              <td colspan="5" class="text-center py-6 text-danger">
                {{ patientStore.error }}
              </td>
            </tr>
            <tr v-else-if="filteredPatients.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Tidak ada data pasien yang sesuai.
              </td>
            </tr>
            <tr v-else v-for="patient in paginatedPatients" :key="patient.id">
              <!-- PASIEN & NIK -->
              <td>
                <div class="patient-profile">
                  <div class="avatar">
                    {{ getInitials(patient.full_name || patient.name) }}
                  </div>
                  <div class="patient-details">
                    <span class="patient-name">{{
                      patient.full_name || patient.name
                    }}</span>
                    <span class="patient-nik"
                      >NIK: {{ patient.nik || "-" }}</span
                    >
                  </div>
                </div>
              </td>

              <!-- CATATAN KLINIS -->
              <td>
                <div class="compliance-info">
                  <span
                    v-if="patient.clinical_note"
                    class="clinical-note"
                    :title="patient.clinical_note"
                  >
                    {{ patient.clinical_note }}
                  </span>
                  <span v-else class="text-muted"> Belum ada catatan </span>
                </div>
              </td>

              <!-- PMO -->
              <td>
                <div class="pmo-info">
                  <span class="pmo-name">
                    {{ patient.pmo_name || "Belum ada PMO" }}
                  </span>
                  <span class="kader-name">
                    {{ patient.pmo_phone || "-" }}
                  </span>
                </div>
              </td>

              <!-- STATUS -->
              <td>
                <span
                  class="status-badge"
                  :class="{
                    'status-low': patient.is_active !== false,
                    'status-high': patient.is_active === false,
                  }"
                >
                  {{ patient.is_active !== false ? "Aktif" : "Tidak Aktif" }}
                </span>
              </td>

              <!-- AKSI -->
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

                  <!-- Dropdown Menu -->
                  <div
                    v-if="activeDropdown === patient.id"
                    class="dropdown-menu-floating"
                    @click.stop
                  >
                    <!-- Detail -->
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="viewPatient(patient.id)"
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
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        ></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>

                      <span>Lihat Detail</span>
                    </button>

                    <!-- Tambah Pengobatan -->
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="addTreatment(patient.id)"
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
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                      </svg>

                      <span>Tambah Pengobatan</span>
                    </button>

                    <!-- Edit -->
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="editPatient(patient.id)"
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
                        <path d="M12 20h9"></path>
                        <path
                          d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"
                        ></path>
                      </svg>

                      <span>Edit Pasien</span>
                    </button>

                    <!-- Hubungi PMO -->
                    <button
                      type="button"
                      class="dropdown-item"
                      @click="contactPmo(patient)"
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

                      <span>Hubungi PMO</span>
                    </button>

                    <!-- Delete -->
                    <button
                      type="button"
                      class="dropdown-item dropdown-item-danger"
                      @click="deletePatient(patient)"
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
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7
        a2 2 0 0 1-2-2V6m3 0V4
        a2 2 0 0 1 2-2h4
        a2 2 0 0 1 2 2v2"
                        ></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>

                      <span>Hapus Pasien</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- PAGINATION -->
      <div v-if="filteredPatients.length > 0" class="pagination-section">
        <div class="pagination-info">
          Menampilkan
          {{
            Math.min((currentPage - 1) * pageSize + 1, filteredPatients.length)
          }}
          -
          {{ Math.min(currentPage * pageSize, filteredPatients.length) }}
          dari
          {{ filteredPatients.length }}
          pasien
        </div>

        <div class="pagination-controls" v-if="totalPages > 1">
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
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button
            class="btn-page"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="./PatientListView.css"></style>
