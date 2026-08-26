<template>
  <div class="refill-page">
    <!-- Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">Permintaan Obat</h1>
        <p class="page-subtitle">
          Kelola permintaan obat pasien dan lakukan verifikasi pengajuan.
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
        <div class="stat-icon-wrapper teal-circle">
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
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">TOTAL PERMINTAAN</span>
          <span class="stat-value">{{ refills.length }}</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon-wrapper orange-circle">
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
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">MENUNGGU PERSETUJUAN</span>
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
          <span class="stat-label">DISETUJUI</span>
          <span class="stat-value">{{ approvedCount }}</span>
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
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="stat-info">
          <span class="stat-label">DITOLAK</span>
          <span class="stat-value">{{ rejectedCount }}</span>
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
          <span class="stat-label">TINGKAT PERSETUJUAN</span>
          <span class="stat-value">{{ approvalRate }}</span>
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
        <h2>Filter Permintaan Obat</h2>
      </div>

      <div class="filter-grid-3">
        <!-- 1. Search Name / NIK / Medicine -->
        <div class="form-group">
          <label>Pencarian</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari Nama Pasien, NIK, No RM, atau Obat..."
            class="form-control"
          />
        </div>

        <!-- 2. Filter Status -->
        <div class="form-group">
          <label>Status Permintaan</label>
          <select v-model="filterStatus" class="form-control">
            <option value="">Semua Status</option>
            <option value="pending">Menunggu Persetujuan</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        <!-- 3. Filter Alasan -->
        <div class="form-group">
          <label>Alasan Refill</label>
          <select v-model="filterReason" class="form-control">
            <option value="">Semua Alasan</option>
            <option value="Stok Habis">Stok Habis / Menipis</option>
            <option value="Kontrol Rutin">Jadwal Kontrol Rutin</option>
            <option value="Obat Hilang">Obat Hilang / Rusak</option>
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
              <th>Obat Diminta</th>
              <th>Tgl Permintaan</th>
              <th>Status</th>
              <th class="text-center">Aksi Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="text-center py-6 text-muted">
                Memuat data permintaan obat...
              </td>
            </tr>
            <tr v-else-if="filteredRefills.length === 0">
              <td colspan="5" class="text-center py-6 text-muted">
                Tidak ada data permintaan obat yang cocok.
              </td>
            </tr>
            <tr v-else v-for="refill in paginatedRefills" :key="refill.id">
              <td>
                <div class="patient-info">
                  <div class="avatar">
                    {{
                      getInitials(refill.treatment?.patient?.full_name || "TB")
                    }}
                  </div>
                  <div>
                    <div class="patient-name font-semibold text-dark">
                      {{
                        refill.treatment?.patient?.full_name ||
                        "Pengobatan #" + refill.treatment_id
                      }}
                    </div>
                    <div class="patient-meta text-xs text-muted">
                      NIK: {{ refill.treatment?.patient?.nik || "-" }}
                      <span v-if="refill.treatment?.patient?.medical_record_number">
                        &bull; No. RM: {{ refill.treatment.patient.medical_record_number }}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="med-info">
                  <span class="font-medium text-dark">{{
                    refill.medicine?.name || "Obat #" + refill.medicine_id
                  }}</span>
                  <span class="text-xs text-muted block font-semibold"
                    >{{ refill.quantity }}
                    {{ refill.medicine?.unit || "Tablet" }} •
                    {{ refill.reason }}</span
                  >
                </div>
              </td>
              <td>
                <div class="date-text text-sm font-medium">
                  {{ formatDate(refill.created_at) }}
                </div>
                <div class="time-text text-xs text-muted">
                  {{ formatTime(refill.created_at) }} WIB
                </div>
              </td>
              <td>
                <span class="status-badge" :class="'status-' + refill.status">
                  <span class="status-dot"></span>
                  {{ formatStatus(refill.status) }}
                </span>
              </td>
              <td class="text-center">
                <div class="action-dropdown-wrapper">
                  <button
                    class="btn-more-actions"
                    title="Opsi Aksi"
                    @click.stop="toggleDropdown(refill.id)"
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
                    v-if="activeDropdown === refill.id"
                    class="dropdown-menu-floating"
                    @click.stop
                  >
                    <!-- 1. Lihat Rincian (Semua status) -->
                    <button
                      class="dropdown-item"
                      @click="
                        openDetailModal(refill);
                        activeDropdown = null;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
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
                      <span>Lihat Rincian</span>
                    </button>

                    <!-- 2. Setujui (Hanya status pending) -->
                    <button
                      v-if="refill.status === 'pending'"
                      class="dropdown-item text-success"
                      @click="
                        openVerifyModal(refill, 'approved');
                        activeDropdown = null;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Setujui</span>
                    </button>

                    <!-- 3. Tolak (Hanya status pending) -->
                    <button
                      v-if="refill.status === 'pending'"
                      class="dropdown-item text-danger"
                      @click="
                        openVerifyModal(refill, 'rejected');
                        activeDropdown = null;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <span>Tolak</span>
                    </button>

                    <!-- 4. Hapus Permintaan (Semua status) -->
                    <button
                      class="dropdown-item text-danger"
                      @click="
                        confirmDelete(refill);
                        activeDropdown = null;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
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
          Menampilkan
          {{
            filteredRefills.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
          }}
          - {{ Math.min(currentPage * pageSize, filteredRefills.length) }} dari
          {{ filteredRefills.length }} permintaan
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

    <!-- MODAL: Proses Verifikasi Permintaan Obat (Approve / Reject) -->
    <div
      v-if="showVerifyModal"
      class="modal-backdrop"
      @click="showVerifyModal = false"
    >
      <div class="verify-modal" @click.stop>
        <!-- HEADER -->
        <div class="verify-modal-header">
          <div class="verify-title-wrapper">
            <div
              class="verify-icon"
              :class="
                verifyTargetStatus === 'approved'
                  ? 'verify-icon-success'
                  : 'verify-icon-danger'
              "
            >
              <svg
                v-if="verifyTargetStatus === 'approved'"
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
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>

              <svg
                v-else
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>

            <div>
              <h3>
                {{
                  verifyTargetStatus === "approved"
                    ? "Setujui Permintaan Obat"
                    : "Tolak Permintaan Obat"
                }}
              </h3>

              <p>
                {{
                  verifyTargetStatus === "approved"
                    ? "Tinjau informasi sebelum menyetujui permintaan."
                    : "Berikan alasan penolakan permintaan obat pasien."
                }}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="modal-close"
            @click="showVerifyModal = false"
          >
            &times;
          </button>
        </div>

        <!-- BODY -->
        <form @submit.prevent="submitVerification">
          <div class="verify-modal-body">
            <!-- INFORMASI PASIEN -->
            <div class="verify-section">
              <div class="verify-section-title">INFORMASI PASIEN</div>

              <div class="patient-summary">
                <div class="patient-avatar">
                  {{
                    getInitials(selectedRefill?.treatment?.patient?.full_name)
                  }}
                </div>

                <div class="patient-summary-info">
                  <div class="patient-summary-name">
                    {{
                      selectedRefill?.treatment?.patient?.full_name || "Pasien"
                    }}
                  </div>

                  <div class="patient-summary-meta">
                    NIK:
                    {{ selectedRefill?.treatment?.patient?.nik || "-" }}
                    <span>•</span>
                    No. RM:
                    {{
                      selectedRefill?.treatment?.patient
                        ?.medical_record_number || "-"
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- RINCIAN PERMINTAAN -->
            <div class="verify-section">
              <div class="verify-section-title">RINCIAN PERMINTAAN</div>

              <div class="request-detail-grid">
                <div class="request-detail-item">
                  <span>Nama Obat</span>
                  <strong>
                    {{ selectedRefill?.medicine?.name || "-" }}
                  </strong>
                </div>

                <div class="request-detail-item">
                  <span>Jumlah Diminta</span>
                  <strong>
                    {{ selectedRefill?.quantity || 0 }}
                    {{ selectedRefill?.medicine?.unit || "Tablet" }}
                  </strong>
                </div>

                <div class="request-detail-item">
                  <span>Alasan Permintaan</span>
                  <strong>
                    {{ selectedRefill?.reason || "-" }}
                  </strong>
                </div>

                <div
                  v-if="selectedRefill?.description"
                  class="request-detail-item full-width"
                >
                  <span>Catatan Pasien</span>
                  <strong class="request-description">
                    "{{ selectedRefill.description }}"
                  </strong>
                </div>
              </div>
            </div>

            <!-- CATATAN NAKES -->
            <div class="verify-section">
              <div class="verify-section-title">
                {{
                  verifyTargetStatus === "approved"
                    ? "CATATAN TENAGA KESEHATAN (OPSIONAL)"
                    : "ALASAN PENOLAKAN"
                }}

                <span
                  v-if="verifyTargetStatus === 'rejected'"
                  class="required-mark"
                >
                  *
                </span>
              </div>

              <textarea
                v-model="verifyNurseNote"
                class="verify-textarea"
                rows="3"
                :placeholder="
                  verifyTargetStatus === 'approved'
                    ? 'Tambahkan instruksi untuk pasien, misalnya waktu atau lokasi pengambilan obat...'
                    : 'Tuliskan alasan penolakan permintaan obat...'
                "
              ></textarea>

              <small v-if="verifyTargetStatus === 'approved'" class="form-hint text-muted">
                Tambahkan instruksi untuk pasien, misalnya waktu atau lokasi pengambilan obat.
              </small>

              <small v-else class="form-hint text-danger font-medium">
                Alasan penolakan wajib diisi.
              </small>
            </div>
          </div>

          <!-- FOOTER -->
          <div class="verify-modal-footer">
            <button
              type="button"
              class="btn btn-outline"
              @click="showVerifyModal = false"
            >
              Batal
            </button>

            <button
              type="submit"
              class="verify-submit-btn"
              :class="
                verifyTargetStatus === 'approved'
                  ? 'verify-submit-success'
                  : 'verify-submit-danger'
              "
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-sm"></span>

              <template v-else>
                <svg
                  v-if="verifyTargetStatus === 'approved'"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>

                {{
                  verifyTargetStatus === "approved"
                    ? "Setujui Permintaan"
                    : "Tolak Permintaan"
                }}
              </template>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- MODAL: Rincian Lengkap Permintaan -->
    <div
      v-if="showDetailModal"
      class="modal-backdrop"
      @click="showDetailModal = false"
    >
      <div class="modal-dialog modal-lg" @click.stop>
        <div class="modal-header">
          <div>
            <h3>Rincian Permintaan Obat</h3>
            <p>Detail permohonan logistik OAT dari pasien</p>
          </div>
          <button class="modal-close" @click="showDetailModal = false" title="Tutup">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <!-- 1. INFORMASI PASIEN -->
          <div class="detail-section">
            <h4 class="detail-sec-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              INFORMASI PASIEN
            </h4>
            <div class="patient-summary-card">
              <div class="avatar avatar-md">
                {{ getInitials(selectedRefill?.treatment?.patient?.full_name || 'TB') }}
              </div>
              <div class="patient-summary-details">
                <div class="patient-name font-bold text-dark">
                  {{ selectedRefill?.treatment?.patient?.full_name || "Pasien #" + selectedRefill?.treatment_id }}
                </div>
                <div class="patient-meta text-xs text-muted">
                  NIK: {{ selectedRefill?.treatment?.patient?.nik || "-" }} &bull; No. RM: {{ selectedRefill?.treatment?.patient?.medical_record_number || "-" }}
                </div>
                <div class="text-xs text-muted mt-1" v-if="selectedRefill?.treatment?.patient?.address">
                  Alamat: {{ selectedRefill?.treatment?.patient?.address }}
                </div>
                <div class="text-xs text-muted" v-if="selectedRefill?.treatment?.patient?.phone">
                  Telepon: {{ selectedRefill?.treatment?.patient?.phone }}
                </div>
              </div>
            </div>
          </div>

          <!-- 2. RINCIAN PERMINTAAN OBAT -->
          <div class="detail-section">
            <h4 class="detail-sec-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
              RINCIAN PERMINTAAN OBAT
            </h4>
            <div class="detail-keyvalue-grid">
              <div class="kv-item">
                <span class="kv-label">Nama Obat</span>
                <span class="kv-value font-semibold">
                  {{ selectedRefill?.medicine?.name || "OAT" }}
                  <span v-if="selectedRefill?.medicine?.code" class="text-muted text-xs">({{ selectedRefill?.medicine?.code }})</span>
                </span>
              </div>
              <div class="kv-item">
                <span class="kv-label">Jumlah Diminta</span>
                <span class="kv-value font-bold text-primary">
                  {{ selectedRefill?.quantity }} {{ selectedRefill?.medicine?.unit || "Tablet" }}
                </span>
              </div>
              <div class="kv-item">
                <span class="kv-label">Alasan Permintaan</span>
                <span class="kv-value">{{ selectedRefill?.reason || "-" }}</span>
              </div>
              <div class="kv-item">
                <span class="kv-label">Waktu Pengajuan</span>
                <span class="kv-value">
                  {{ formatDate(selectedRefill?.created_at) }}, {{ formatTime(selectedRefill?.created_at) }} WIB
                </span>
              </div>
              <div class="kv-item full-width" v-if="selectedRefill?.description">
                <span class="kv-label">Catatan Pasien</span>
                <span class="kv-value italic text-secondary">"{{ selectedRefill.description }}"</span>
              </div>
            </div>
          </div>

          <!-- 3. STATUS & CATATAN NAKES -->
          <div class="detail-section">
            <h4 class="detail-sec-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              STATUS & CATATAN NAKES
            </h4>
            <div class="detail-keyvalue-grid">
              <div class="kv-item">
                <span class="kv-label">Status Saat Ini</span>
                <span class="kv-value">
                  <span
                    class="status-badge"
                    :class="'status-' + selectedRefill?.status"
                  >
                    <span class="status-dot"></span>
                    {{ formatStatus(selectedRefill?.status) }}
                  </span>
                </span>
              </div>
              <div class="kv-item" v-if="selectedRefill?.approved_at">
                <span class="kv-label">Waktu Verifikasi</span>
                <span class="kv-value">
                  {{ formatDate(selectedRefill.approved_at) }}, {{ formatTime(selectedRefill.approved_at) }} WIB
                </span>
              </div>
              <div class="kv-item full-width">
                <span class="kv-label">Catatan Tenaga Kesehatan</span>
                <div v-if="selectedRefill?.nurse_note" class="nurse-note-box">
                  {{ selectedRefill.nurse_note }}
                </div>
                <span v-else class="kv-value text-muted italic">
                  Belum ada catatan khusus dari tenaga kesehatan.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <!-- Action buttons for Pending Status inside Detail Modal -->
          <template v-if="selectedRefill?.status === 'pending'">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="openVerifyModal(selectedRefill, 'rejected'); showDetailModal = false"
            >
              Tolak
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click="openVerifyModal(selectedRefill, 'approved'); showDetailModal = false"
            >
              Setujui
            </button>
            <button
              type="button"
              class="btn btn-outline"
              @click="showDetailModal = false"
            >
              Tutup
            </button>
          </template>

          <!-- Action buttons for Processed Status (Approved / Rejected) -->
          <template v-else>
            <button
              type="button"
              class="btn btn-outline"
              @click="showDetailModal = false"
            >
              Tutup
            </button>
            <button
              v-if="selectedRefill?.treatment?.patient?.phone"
              type="button"
              class="btn btn-outline-success"
              @click="sendWhatsApp(selectedRefill)"
            >
              Hubungi Pasien (WA)
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./RefillRequestView.js"></script>

<style scoped src="./RefillRequestView.css"></style>

