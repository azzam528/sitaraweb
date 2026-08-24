<template>
  <div class="treatment-list-page">
    <!-- 1. Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Monitoring Pengobatan TB</h1>
        <p class="page-subtitle">Pemantauan terapi obat, fase kepatuhan, dan progres pasien TB secara real-time.</p>
      </div>
    </header>

    <!-- Notification Alert -->
    <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
    </div>

    <!-- 2. Statistic Cards Row -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper blue-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PENGOBATAN AKTIF</span>
          <span class="stat-value">{{ activeCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">FASE INTENSIF</span>
          <span class="stat-value">{{ intensiveCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">FASE LANJUTAN</span>
          <span class="stat-value">{{ continuationCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">SELESAI / SEMBUH</span>
          <span class="stat-value">{{ completedCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">PUTUS OBAT</span>
          <span class="stat-value">{{ droppedCount }}</span>
        </div>
      </div>
    </section>

    <!-- 3. Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Data Pengobatan</h2>
      </div>

      <div class="filter-grid-simple">
        <!-- 1. Search Name / NIK / Doctor -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari Nama Pasien, NIK, No RM, atau Dokter..." 
            class="form-control"
          />
        </div>

        <!-- 2. Fase Pengobatan -->
        <div class="form-group">
          <label>Fase Terapi</label>
          <select v-model="filterPhase" class="form-control">
            <option value="">Semua Fase</option>
            <option value="intensive">Fase Intensif</option>
            <option value="continuation">Fase Lanjutan</option>
          </select>
        </div>

        <!-- 3. Status Pengobatan -->
        <div class="form-group">
          <label>Status</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="completed">Selesai</option>
            <option value="dropped">Putus Obat</option>
          </select>
        </div>

        <!-- 4. Regimen -->
        <div class="form-group">
          <label>Regimen</label>
          <select v-model="filterRegimen" class="form-control">
            <option value="">Semua Regimen</option>
            <option value="category_1">Kategori 1</option>
            <option value="category_2">Kategori 2</option>
            <option value="mdr">TB-RO (MDR)</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 4. Treatment Monitoring Table -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="data-table custom-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Fase Terapi</th>
              <th>Progres Pengobatan</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data pengobatan...
              </td>
            </tr>
            <tr v-else-if="filteredTreatments.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Tidak ada data pengobatan yang cocok.
              </td>
            </tr>
            <tr v-else v-for="treatment in paginatedTreatments" :key="treatment.id">
              <td>
                <div class="patient-info">
                  <div class="avatar">
                    {{ getInitials(treatment.patient?.full_name || 'Pasien ' + treatment.patient_id) }}
                  </div>
                  <div>
                    <div class="patient-name font-semibold">
                      {{ treatment.patient?.full_name || 'Pasien #' + treatment.patient_id }}
                    </div>
                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ treatment.patient?.nik || '-' }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span class="phase-badge" :class="'badge-' + treatment.phase">
                  {{ formatPhase(treatment.phase) }}
                </span>
              </td>
              <td>
                <div class="progress-wrapper">
                  <div class="progress-bar-container">
                    <div 
                      class="progress-bar" 
                      :style="{ 
                        width: Math.max(6, calculateProgress(treatment).percentage) + '%', 
                        backgroundColor: getProgressColor(treatment) 
                      }"
                    ></div>
                  </div>
                  <div class="progress-text">
                    <span class="progress-pct font-bold" :style="{ color: getProgressColor(treatment) }">
                      {{ calculateProgress(treatment).percentage }}%
                    </span>
                    <span class="progress-days text-muted">
                      Hari ke-{{ calculateProgress(treatment).daysPassed }}/{{ calculateProgress(treatment).totalDays }}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span class="status-badge" :class="'status-' + treatment.status">
                  {{ formatStatus(treatment.status) }}
                </span>
              </td>
              <td class="text-center">
                <div class="action-dropdown-wrapper">
                  <button 
                    class="btn-more-actions" 
                    @click.stop="toggleDropdown(treatment.id)" 
                    title="Menu Aksi"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <div v-if="activeDropdown === treatment.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(treatment.id); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button class="dropdown-item" @click="openStatusModal(treatment); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Ubah Status</span>
                    </button>

                    <button 
                      v-if="treatment.patient?.phone" 
                      class="dropdown-item" 
                      @click="sendWhatsApp(treatment); activeDropdown = null"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Hubungi Pasien (WA)</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="confirmDelete(treatment); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus Rekam</span>
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
          Menampilkan {{ filteredTreatments.length === 0 ? 0 : (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredTreatments.length) }} dari {{ filteredTreatments.length }} pengobatan
        </div>
        <div class="pagination-controls" v-if="totalPages > 1">
          <button 
            class="btn-page" 
            :disabled="currentPage === 1" 
            @click="currentPage--"
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
            :disabled="currentPage === totalPages || totalPages === 0" 
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>


    <!-- MODAL: Ubah Status Pengobatan -->
    <div v-if="showStatusModal" class="modal-backdrop" @click="showStatusModal = false">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <div>
            <h3>Pembaruan Status Pengobatan</h3>
            <p>Ubah status terapi dan fase pengobatan pasien TB</p>
          </div>
          <button class="modal-close" @click="showStatusModal = false" title="Tutup">&times;</button>
        </div>

        <form @submit.prevent="submitUpdateStatus">
          <div class="modal-body">
            <!-- Patient Info Section -->
            <div class="detail-section mb-3">
              <div class="patient-summary-card">
                <div class="avatar avatar-md">
                  {{ getInitials(selectedTreatment?.patient?.full_name || 'TB') }}
                </div>
                <div class="patient-summary-details">
                  <div class="patient-name font-bold text-dark">
                    {{ selectedTreatment?.patient?.full_name || 'Pasien #' + selectedTreatment?.patient_id }}
                  </div>
                  <div class="patient-meta text-xs text-muted">
                    NIK: {{ selectedTreatment?.patient?.nik || "-" }} &bull; No. RM: {{ selectedTreatment?.patient?.medical_record_number || "-" }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group mb-3">
              <label>Status Pengobatan <span class="text-danger">*</span></label>
              <select v-model="statusForm.status" class="form-control" required>
                <option value="active">Aktif (Sedang Menjalani Terapi)</option>
                <option value="completed">Selesai / Sembuh (Lulus Terapi)</option>
                <option value="dropped">Putus Obat (Drop Out)</option>
              </select>
            </div>

            <div class="form-group mb-3">
              <label>Fase Pengobatan</label>
              <select v-model="statusForm.phase" class="form-control">
                <option value="intensive">Fase Intensif</option>
                <option value="continuation">Fase Lanjutan</option>
              </select>
            </div>

            <div class="form-group">
              <label>Catatan Dokter / Keterangan</label>
              <textarea 
                v-model="statusForm.doctor_note" 
                rows="3" 
                placeholder="Keterangan klinis perubahan status..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showStatusModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>Update Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./TreatmentListView.js"></script>

<style scoped src="./TreatmentListView.css"></style>
