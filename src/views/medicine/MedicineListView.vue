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
          <span class="stat-value">{{ medicines.length }} <span class="stat-unit">Sediaan</span></span>
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
          <span class="stat-value text-warning">{{ pendingCount }}</span>
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
          <span class="stat-value text-success">{{ approvedCount }}</span>
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
          <span class="stat-value text-danger">{{ rejectedCount }}</span>
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

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Memuat data permintaan obat...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredRequests.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <h3>Belum Ada Permintaan Obat</h3>
        <p v-if="searchQuery || filterCategory || filterStatus || filterStatusPill">
          Tidak ditemukan permintaan obat yang cocok dengan filter yang dipilih.
        </p>
        <p v-else>
          Belum ada permohonan refill atau pengambilan obat OAT yang diajukan oleh pasien.
        </p>
      </div>

      <!-- Data Table -->
      <div v-else class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Pendamping (PMO)</th>
              <th>Obat Diminta</th>
              <th>Jumlah</th>
              <th>Alasan</th>
              <th>Waktu Pengajuan</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in paginatedRequests" :key="req.id">
              <td>
                <div class="patient-info">
                  <div class="avatar" :class="'avatar-' + getAvatarColor(req.id)">
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
                <span class="text-sm font-medium text-dark">
                  {{ req.treatment?.patient?.pmo_name || '-' }}
                </span>
                <span v-if="req.treatment?.patient?.pmo_relation" class="text-xs text-muted block">
                  ({{ req.treatment?.patient?.pmo_relation }})
                </span>
              </td>
              <td>
                <span :class="['type-pill', getTypeClass(req.medicine?.category)]">
                  {{ req.medicine?.name || 'OAT' }}
                </span>
              </td>
              <td>
                <span class="font-bold text-dark">{{ req.quantity }}</span> {{ req.medicine?.unit || 'Tab' }}
              </td>
              <td>
                <span class="text-xs text-muted italic">"{{ req.reason }}"</span>
              </td>
              <td>
                <div class="text-sm font-medium">{{ formatDate(req.created_at) }}</div>
                <div class="text-xs text-muted">{{ formatTime(req.created_at) }}</div>
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
                    <button class="dropdown-item" @click="viewDetail(); activeDropdown = null">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Verifikasi / Detail</span>
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
      <div v-if="filteredRequests.length > 0" class="pagination-wrapper">
        <div class="pagination-info">
          Menampilkan {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredRequests.length) }} dari {{ filteredRequests.length }} permohonan
        </div>
        <div class="pagination-controls">
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

      <div v-if="distributionHistory.length === 0" class="empty-state-subtle">
        <p>Belum ada riwayat distribusi obat yang telah disetujui atau ditolak.</p>
      </div>

      <div v-else class="table-responsive">
        <table class="data-table">
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
            <tr v-for="hist in distributionHistory" :key="hist.id">
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
  </div>
</template>

<script src="./MedicineListView.js"></script>

<style scoped src="./MedicineListView.css"></style>
