<script src="./PatientListView.js"></script>

<template>
  <div class="patient-list-page">
    <!-- 1. Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Manajemen Pasien</h1>
        <p class="page-subtitle">Kelola data pasien TB dan monitor kepatuhan pengobatan.</p>
      </div>
      <router-link to="/dashboard/patients/add" class="btn-add">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-plus">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Tambah Pasien Baru
      </router-link>
    </header>

    <!-- 2. Statistic Cards -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PASIEN AKTIF</span>
          <span class="stat-value">{{ stats.active }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SEDANG TERAPI</span>
          <span class="stat-value">{{ stats.inTherapy }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SELESAI TERAPI</span>
          <span class="stat-value">{{ stats.completed }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PUTUS OBAT</span>
          <span class="stat-value">{{ stats.dropOut }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">RISIKO TINGGI</span>
          <span class="stat-value">{{ stats.highRisk }}</span>
        </div>
      </div>
    </section>

    <!-- 3. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Pencarian Pasien</h2>
      </div>
      
      <div class="filter-grid-simple">
        <!-- 1. Cari Nama / NIK -->
        <div class="form-group">
          <label>Nama atau NIK</label>
          <input type="text" v-model="filters.search" placeholder="Cari nama atau NIK..." class="form-control" />
        </div>

        <!-- 2. Fase Pengobatan -->
        <div class="form-group">
          <label>Fase Pengobatan</label>
          <select v-model="filters.phase" class="form-control">
            <option value="">Semua Fase</option>
            <option value="Fase Awal">Fase Awal</option>
            <option value="Fase Intensif">Fase Intensif</option>
            <option value="Fase Lanjutan">Fase Lanjutan</option>
            <option value="Selesai Terapi">Selesai Terapi</option>
          </select>
        </div>

        <!-- 3. Status AI Risk -->
        <div class="form-group">
          <label>Status AI Risk</label>
          <select v-model="filters.risk" class="form-control">
            <option value="">Semua Status</option>
            <option value="Risiko Tinggi">Risiko Tinggi</option>
            <option value="Risiko Sedang">Risiko Sedang</option>
            <option value="Risiko Rendah">Risiko Rendah</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 4. Patient Table -->
    <section class="table-section card">
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Pasien & NIK</th>
              <th>Info TB</th>
              <th>Kepatuhan</th>
              <th>Status Risiko</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredPatients.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                {{ isLoading ? 'Memuat data pasien...' : 'Tidak ada data pasien yang cocok.' }}
              </td>
            </tr>
            <tr v-for="patient in paginatedPatients" :key="patient.id">
              <!-- PASIEN & NIK -->
              <td>
                <div class="patient-profile">
                  <div class="avatar">{{ getInitials(patient.name) }}</div>
                  <div class="patient-details">
                    <span class="patient-name">{{ patient.name }}</span>
                    <span class="patient-nik">{{ patient.nik }}</span>
                  </div>
                </div>
              </td>
              
              <!-- INFO TB -->
              <td>
                <div class="tb-info">
                  <span class="badge" :class="patient.tbType === 'TB SO' ? 'badge-green' : 'badge-red'">
                    {{ patient.tbType }}
                  </span>
                  <span class="phase-text">{{ patient.phase }} (Bln {{ patient.month }})</span>
                </div>
              </td>
              
              <!-- KEPATUHAN -->
              <td>
                <div class="compliance-info">
                  <span class="compliance-text" :style="{ color: getComplianceColor(patient.compliance) }">
                    {{ patient.compliance }}%
                  </span>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: `${patient.compliance}%`, backgroundColor: getComplianceColor(patient.compliance) }"></div>
                  </div>
                </div>
              </td>
              
              <!-- STATUS -->
              <td>
                <span class="status-badge" :class="{
                  'status-high': patient.status === 'Risiko Tinggi',
                  'status-medium': patient.status === 'Risiko Sedang',
                  'status-low': patient.status === 'Risiko Rendah'
                }">
                  {{ patient.status }}
                </span>
              </td>
              
              <!-- AKSI -->
              <td class="text-center relative">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(patient.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === patient.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewPatient(patient.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="editPatient(patient.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Edit Pasien</span>
                    </button>

                    <button class="dropdown-item" @click="sendEmail(patient); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>Hubungi PMO</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deletePatient(patient); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5. Pagination -->
      <div class="pagination-section">
        <div class="pagination-info">
          Menampilkan {{ filteredPatients.length === 0 ? 0 : (currentPage - 1) * 8 + 1 }} - {{ Math.min(currentPage * 8, filteredPatients.length) }} dari {{ filteredPatients.length }} pasien
        </div>
        <div class="pagination-controls" v-if="totalPages > 1">
          <button class="btn-page" @click="prevPage" :disabled="currentPage === 1">Prev</button>
          
          <button v-for="page in totalPages" :key="page" 
                  class="btn-page" 
                  :class="{ 'active': currentPage === page }"
                  @click="currentPage = page">
            {{ page }}
          </button>
          
          <button class="btn-page" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="./PatientListView.css"></style>
