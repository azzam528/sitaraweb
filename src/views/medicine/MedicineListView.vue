<template>
  <div class="medicine-list-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Logistik Obat OAT</h1>
        <p class="page-subtitle">Monitoring stok, permohonan refill, dan riwayat distribusi obat anti-tuberkulosis.</p>
      </div>
    </header>

    <!-- Notification Alert -->
    <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
    </div>

    <!-- Statistic Cards Row -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper teal-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL JENIS OAT</span>
          <span class="stat-value">{{ medicines.length }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper blue-circle">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL PERMINTAAN</span>
          <span class="stat-value">{{ requests.length }}</span>
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
          <span class="stat-label">MENUNGGU RESPON</span>
          <span class="stat-value">{{ pendingCount }}</span>
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
          <span class="stat-label">DISETUJUI</span>
          <span class="stat-value">{{ approvedCount }}</span>
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
          <span class="stat-label">DITOLAK</span>
          <span class="stat-value">{{ rejectedCount }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <h2>Filter Permintaan Obat</h2>
      </div>

      <div class="filter-grid-3">
        <!-- 1. Search Name / NIK / Obat -->
        <div class="form-group">
          <label>Pencarian</label>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari Nama Pasien, NIK, atau Nama Obat..." 
            class="form-control"
          />
        </div>

        <!-- 2. Tipe Obat -->
        <div class="form-group">
          <label>Kategori Obat OAT</label>
          <select v-model="filterCategory" class="form-control">
            <option value="">Semua Kategori Obat</option>
            <option value="Lini 1">Lini 1 (Kategori I)</option>
            <option value="Lini 2">Lini 2 (TB-RO)</option>
            <option value="FDC">Kombinasi FDC</option>
            <option value="Anak">Pediatrik / Anak</option>
          </select>
        </div>

        <!-- 3. Status Permintaan -->
        <div class="form-group">
          <label>Status Permintaan</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu Respon (Pending)</option>
            <option value="approved">Disetujui (Approved)</option>
            <option value="rejected">Ditolak (Rejected)</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Main Table Section -->
    <div class="card table-card">
      <div class="card-header-tabs flex-between">
        <h2 class="card-title">Permintaan Pengambilan Obat OAT</h2>
        <div class="pill-buttons">
          <button 
            class="pill-btn" 
            :class="{ active: filterStatusPill === '' }"
            @click="filterStatusPill = ''"
          >
            Semua ({{ requests.length }})
          </button>
          <button 
            class="pill-btn" 
            :class="{ active: filterStatusPill === 'pending' }"
            @click="filterStatusPill = 'pending'"
          >
            Menunggu ({{ pendingCount }})
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-responsive">
        <table class="data-table custom-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Obat Diminta</th>
              <th>Waktu Pengajuan</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data permintaan obat...
              </td>
            </tr>
            <tr v-else-if="filteredRequests.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Tidak ada data permintaan obat yang cocok.
              </td>
            </tr>
            <tr v-else v-for="req in paginatedRequests" :key="req.id">
              <td>
                <div class="patient-info">
                  <div class="avatar">
                    {{ getInitials(req.treatment?.patient?.full_name) }}
                  </div>
                  <div class="patient-meta">
                    <span class="patient-name font-semibold">
                      {{ req.treatment?.patient?.full_name || 'Pasien #' + req.treatment_id }}
                    </span>
                    <span class="patient-sub text-xs text-muted">
                      NIK: {{ req.treatment?.patient?.nik || '-' }}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <div class="med-requested">
                  <span :class="['type-pill', getTypeClass(req.medicine?.category)]">
                    {{ req.medicine?.name || 'OAT' }}
                  </span>
                  <span class="font-bold text-dark ml-2">{{ req.quantity }} {{ req.medicine?.unit || 'Tab' }}</span>
                </div>
              </td>
              <td>
                <div class="text-sm font-medium">{{ formatDate(req.created_at) }}</div>
                <div class="text-xs text-muted">{{ formatTime(req.created_at) }} WIB</div>
              </td>
              <td>
                <span :class="['status-pill', getStatusClass(req.status)]">
                  <span class="status-dot"></span>
                  {{ formatStatus(req.status) }}
                </span>
              </td>
              <td class="actions relative text-center">
                <div class="action-dropdown-wrapper">
                  <button class="btn-more-actions" @click.stop="toggleDropdown(req.id)" title="Aksi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                  
                  <div v-if="activeDropdown === req.id" class="dropdown-menu-floating" @click.stop>
                    <button class="dropdown-item" @click="viewDetail(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Rincian / Detail</span>
                    </button>

                    <button class="dropdown-item" @click="sendNotify(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Hubungi Pasien (WA)</span>
                    </button>

                    <button class="dropdown-item text-danger" @click="deleteRequest(req); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      <span>Hapus Permintaan</span>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination-section">
        <div class="pagination-info">
          Menampilkan {{ filteredRequests.length === 0 ? 0 : (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredRequests.length) }} dari {{ filteredRequests.length }} permohonan
        </div>
        <div class="pagination-controls" v-if="totalPages > 1">
          <button class="btn-page" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="btn-page" 
            :class="{ active: currentPage === page }"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button class="btn-page" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next</button>
        </div>
      </div>
    </div>

    <!-- Riwayat Distribusi OAT -->
    <div class="card distribution-card">
      <div class="card-header">
        <h2 class="card-title">Riwayat Distribusi OAT Terbaru</h2>
      </div>

      <div class="table-responsive">
        <table class="data-table custom-table">
          <thead>
            <tr>
              <th>Waktu Distribusi</th>
              <th>Pasien Penerima</th>
              <th>Jenis Obat OAT</th>
              <th>Jumlah</th>
              <th>Status Akhir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="distributionHistory.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Belum ada riwayat distribusi obat yang telah disetujui atau ditolak.
              </td>
            </tr>
            <tr v-else v-for="hist in distributionHistory" :key="hist.id">
              <td class="whitespace-nowrap font-medium text-sm">{{ formatDate(hist.created_at) }}</td>
              <td>
                <span class="font-semibold text-dark">{{ hist.treatment?.patient?.full_name || 'Pasien #' + hist.treatment_id }}</span>
                <span class="text-xs text-muted block">NIK: {{ hist.treatment?.patient?.nik || '-' }}</span>
              </td>
              <td>
                <span :class="['type-pill', getTypeClass(hist.medicine?.category)]">
                  {{ hist.medicine?.name || 'OAT' }}
                </span>
              </td>
              <td><span class="font-bold">{{ hist.quantity }}</span> {{ hist.medicine?.unit || 'Tablet' }}</td>
              <td>
                <span :class="['status-pill', getStatusClass(hist.status)]">
                  <span class="status-dot"></span>
                  {{ formatStatus(hist.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL: Rincian Lengkap Permintaan Obat -->
    <div v-if="showDetailModal" class="modal-backdrop" @click="closeDetailModal">
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Rincian Permintaan Refill OAT</h3>
          <button class="modal-close" @click="closeDetailModal">&times;</button>
        </div>

        <div class="modal-body">
          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Informasi Pasien</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Pasien:</span>
                <span class="detail-val font-semibold">{{ selectedRequest?.treatment?.patient?.full_name || 'Pasien' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">NIK / No. RM:</span>
                <span class="detail-val">{{ selectedRequest?.treatment?.patient?.nik || '-' }} / {{ selectedRequest?.treatment?.patient?.medical_record_number || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">PMO (Pendamping):</span>
                <span class="detail-val">{{ selectedRequest?.treatment?.patient?.pmo_name || '-' }} ({{ selectedRequest?.treatment?.patient?.pmo_phone || '-' }})</span>
              </div>
            </div>
          </div>

          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Rincian Obat & Permintaan</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Obat:</span>
                <span class="detail-val font-semibold">{{ selectedRequest?.medicine?.name }} ({{ selectedRequest?.medicine?.category }})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Jumlah Diminta:</span>
                <span class="detail-val font-bold text-primary">{{ selectedRequest?.quantity }} {{ selectedRequest?.medicine?.unit || 'Tablet' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Alasan Permintaan:</span>
                <span class="detail-val">{{ selectedRequest?.reason }}</span>
              </div>
              <div class="detail-row" v-if="selectedRequest?.description">
                <span class="detail-label">Catatan Tambahan:</span>
                <span class="detail-val italic">"{{ selectedRequest?.description }}"</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Waktu Pengajuan:</span>
                <span class="detail-val">{{ formatDate(selectedRequest?.created_at) }}, {{ formatTime(selectedRequest?.created_at) }} WIB</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-val">
                  <span class="status-pill" :class="getStatusClass(selectedRequest?.status)">
                    <span class="status-dot"></span>
                    {{ formatStatus(selectedRequest?.status) }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline" @click="closeDetailModal">Tutup</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="goToRefillPage(); closeDetailModal()"
          >
            Buka Halaman Verifikasi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./MedicineListView.js"></script>

<style scoped src="./MedicineListView.css"></style>
