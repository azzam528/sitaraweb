<template>
  <div class="complaint-list-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Laporan Keluhan & Efek Samping (ESO)</h1>
        <p class="page-subtitle">
          Monitoring dan penanganan keluhan klinis yang dikirimkan oleh pasien
          TB melalui aplikasi mobile.
        </p>
      </div>
    </header>

    <!-- Toast Alert -->
    <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
      <span>{{ alertMessage }}</span>
      <button class="btn-close-toast" @click="alertMessage = ''">
        &times;
      </button>
    </div>

    <!-- Stats Row -->
    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrapper blue-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL KELUHAN</span>
          <span class="stat-value">{{ complaints.length }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper red-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU TANGGAPAN</span>
          <span class="stat-value">{{ pendingCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper green-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
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
          <span class="stat-label">SELESAI / DITANGGAPI</span>
          <span class="stat-value">{{ resolvedCount }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper blue-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TINGKAT RESOLUSI</span>
          <span class="stat-value">{{ resolutionRate }}</span>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section card">
      <div class="filter-header">
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
          <polygon
            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
          ></polygon>
        </svg>
        <h2>Filter Laporan Keluhan</h2>
      </div>

      <div class="filter-grid-3">
        <!-- 1. Search Name / NIK / Category / Description -->
        <div class="form-group">
          <label>Pencarian</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari Nama Pasien, NIK, Kategori, atau Deskripsi..."
            class="form-control"
          />
        </div>

        <!-- 2. Filter Status -->
        <div class="form-group">
          <label>Status Penanganan</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu Tanggapan</option>
            <option value="resolved">Selesai</option>
          </select>
        </div>

        <!-- 3. Filter Category -->
        <div class="form-group">
          <label>Kategori Keluhan</label>
          <select v-model="filterCategory" class="form-control">
            <option value="">Semua Kategori</option>
            <option value="Mual & Muntah">Mual & Muntah</option>
            <option value="Pusing & Sakit Kepala">Pusing & Sakit Kepala</option>
            <option value="Gatal & Ruam Kulit">Gatal & Ruam Kulit</option>
            <option value="Nyeri Sendi">Nyeri Sendi</option>
            <option value="Mata / Kulit Kuning">
              Mata / Kulit Kuning (Hepatotoksik)
            </option>
            <option value="Gangguan Penglihatan">Gangguan Penglihatan</option>
            <option value="Efek Samping Obat">Efek Samping Obat (ESO)</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Table Card -->
    <div class="table-card card">
      <div class="table-responsive">
        <table class="data-table custom-table">
          <thead>
            <tr>
              <th>Pasien</th>
              <th>Kategori Keluhan</th>
              <th>Waktu Laporan</th>
              <th>Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat laporan keluhan...
              </td>
            </tr>
            <tr v-else-if="filteredComplaints.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Tidak ada data keluhan yang cocok.
              </td>
            </tr>
            <tr v-else v-for="comp in paginatedComplaints" :key="comp.id">
              <td>
                <div class="patient-info">
                  <div class="avatar">
                    {{
                      getInitials(comp.treatment?.patient?.full_name || "TB")
                    }}
                  </div>

                  <div>
                    <div class="patient-name font-semibold text-dark">
                      {{ comp.treatment?.patient?.full_name || "Pasien" }}
                    </div>

                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ comp.treatment?.patient?.nik || "-" }}
                    </div>

                    <div class="patient-meta text-xs text-muted">
                      No. RM:
                      {{
                        comp.treatment?.patient?.medical_record_number || "-"
                      }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="category-badge">{{ comp.category }}</div>
              </td>
              <td>
                <div class="date-text text-sm font-medium">
                  {{ formatDate(comp.created_at) }}
                </div>
                <div class="time-text text-xs text-muted">
                  {{ formatTime(comp.created_at) }} WIB
                </div>
              </td>
              <td>
                <span class="status-badge" :class="'status-' + comp.status">
                  {{ formatStatus(comp.status) }}
                </span>
              </td>
              <td class="text-center">
                <div class="action-dropdown-wrapper">
                  <button
                    class="btn-more-actions"
                    @click.stop="toggleDropdown(comp.id)"
                    title="Menu Aksi"
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

                  <div
                    v-if="activeDropdown === comp.id"
                    class="dropdown-menu-floating"
                    @click.stop
                  >
                    <button
                      class="dropdown-item"
                      @click="
                        viewDetail(comp.id);
                        activeDropdown = null;
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
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"
                        ></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>Lihat Detail</span>
                    </button>

                    <button
                      v-if="comp.treatment?.patient?.phone"
                      class="dropdown-item"
                      @click="
                        sendWhatsApp(comp);
                        activeDropdown = null;
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
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        ></path>
                      </svg>
                      <span>Hubungi Pasien (WA)</span>
                    </button>

                    <button
                      class="dropdown-item text-danger"
                      @click="
                        confirmDelete(comp);
                        activeDropdown = null;
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
                        <path
                          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                        ></path>
                      </svg>
                      <span>Hapus Keluhan</span>
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
          Menampilkan
          {{
            filteredComplaints.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1
          }}
          -
          {{ Math.min(currentPage * pageSize, filteredComplaints.length) }} dari
          {{ filteredComplaints.length }} keluhan
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
  </div>
</template>

<script src="./ComplaintListView.js"></script>

<style scoped src="./ComplaintListView.css"></style>
