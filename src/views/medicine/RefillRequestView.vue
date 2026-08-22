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
          <span class="stat-label">MENUNGGU VERIFIKASI</span>
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
            <option value="pending">Menunggu (Pending)</option>
            <option value="approved">Disetujui (Approved)</option>
            <option value="rejected">Ditolak (Rejected)</option>
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
                  {{ formatStatus(refill.status) }}
                </span>
              </td>
              <td class="text-center">
                <!-- Action Buttons for Pending Requests -->
                <div v-if="refill.status === 'pending'" class="quick-actions">
                  <button
                    class="btn-icon-approve"
                    title="Setujui Permintaan"
                    @click="openVerifyModal(refill, 'approved')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Setujui
                  </button>

                  <button
                    class="btn-icon-reject"
                    title="Tolak Permintaan"
                    @click="openVerifyModal(refill, 'rejected')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Tolak
                  </button>

                  <button
                    class="btn-more-actions"
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
                    <button
                      class="dropdown-item"
                      @click="
                        openDetailModal(refill);
                        activeDropdown = null;
                      "
                    >
                      <span>Lihat Rincian</span>
                    </button>
                    <button
                      v-if="refill.treatment?.patient?.phone"
                      class="dropdown-item"
                      @click="
                        sendWhatsApp(refill);
                        activeDropdown = null;
                      "
                    >
                      <span>Hubungi Pasien (WA)</span>
                    </button>
                    <button
                      class="dropdown-item text-danger"
                      @click="
                        confirmDelete(refill);
                        activeDropdown = null;
                      "
                    >
                      <span>Hapus Permintaan</span>
                    </button>
                  </div>
                </div>

                <!-- Action Dropdown for Processed Requests -->
                <div v-else class="action-dropdown-wrapper">
                  <button
                    class="btn btn-sm btn-outline"
                    @click="openDetailModal(refill)"
                  >
                    Lihat Rincian
                  </button>
                  <button
                    class="btn-more-actions"
                    @click.stop="toggleDropdown(refill.id)"
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
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>

                  <div
                    v-if="activeDropdown === refill.id"
                    class="dropdown-menu-floating"
                    @click.stop
                  >
                    <button
                      v-if="refill.treatment?.patient?.phone"
                      class="dropdown-item"
                      @click="
                        sendWhatsApp(refill);
                        activeDropdown = null;
                      "
                    >
                      <span>Hubungi Pasien (WA)</span>
                    </button>
                    <button
                      class="dropdown-item text-danger"
                      @click="
                        confirmDelete(refill);
                        activeDropdown = null;
                      "
                    >
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

    <!-- MODAL: Verifikasi Refill (Approve / Reject) -->
    <div
      v-if="showVerifyModal"
      class="modal-backdrop"
      @click="showVerifyModal = false"
    >
      <div class="modal-dialog modal-sm" @click.stop>
        <div class="modal-header">
          <h3>
            {{
              verifyTargetStatus === "approved"
                ? "Setujui Permintaan Obat"
                : "Tolak Permintaan Obat"
            }}
          </h3>
          <button class="modal-close" @click="showVerifyModal = false">
            &times;
          </button>
        </div>

        <form @submit.prevent="submitVerification">
          <div class="modal-body">
            <div class="refill-summary-box mb-3">
              <div class="font-semibold text-dark">
                {{ selectedRefill?.treatment?.patient?.full_name || "Pasien" }}
              </div>
              <div class="text-sm mt-1">
                Obat: <strong>{{ selectedRefill?.medicine?.name }}</strong> ({{
                  selectedRefill?.quantity
                }}
                {{ selectedRefill?.medicine?.unit || "Tablet" }})
              </div>
              <div class="text-xs text-muted mt-0.5">
                Alasan: {{ selectedRefill?.reason }}
              </div>
            </div>

            <div class="form-group">
              <label>Catatan Tenaga Kesehatan / Alasan</label>
              <textarea
                v-model="verifyNurseNote"
                rows="3"
                :placeholder="
                  verifyTargetStatus === 'approved'
                    ? 'Contoh: Disetujui untuk pengambilan 28 tablet di farmasi puskesmas...'
                    : 'Contoh: Ditolak karena jadwal kontrol belum tiba atau dosis masih mencukupi...'
                "
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline"
              @click="showVerifyModal = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn"
              :class="
                verifyTargetStatus === 'approved' ? 'btn-success' : 'btn-danger'
              "
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>{{
                verifyTargetStatus === "approved"
                  ? "Konfirmasi Setujui"
                  : "Konfirmasi Tolak"
              }}</span>
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
      <div class="modal-dialog" @click.stop>
        <div class="modal-header">
          <h3>Rincian Permintaan Obat</h3>
          <button class="modal-close" @click="showDetailModal = false">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Informasi Pasien</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Pasien:</span>
                <span class="detail-val font-semibold">{{
                  selectedRefill?.treatment?.patient?.full_name
                }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">NIK / No. RM:</span>
                <span class="detail-val"
                  >{{ selectedRefill?.treatment?.patient?.nik }} /
                  {{
                    selectedRefill?.treatment?.patient?.medical_record_number
                  }}</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">Dokter PJ:</span>
                <span class="detail-val">{{
                  selectedRefill?.treatment?.doctor_name
                }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">No. WhatsApp:</span>
                <span class="detail-val">
                  {{ selectedRefill?.treatment?.patient?.phone || "-" }}
                </span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Alamat:</span>
                <span class="detail-val">
                  {{ selectedRefill?.treatment?.patient?.address || "-" }}
                </span>
              </div>
            </div>
          </div>

          <div class="detail-section mb-3">
            <h4 class="detail-sec-title">Rincian Obat & Permintaan</h4>
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Obat:</span>
                <span class="detail-val font-semibold"
                  >{{ selectedRefill?.medicine?.name }} ({{
                    selectedRefill?.medicine?.code
                  }})</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">Jumlah Diminta:</span>
                <span class="detail-val font-bold text-primary"
                  >{{ selectedRefill?.quantity }}
                  {{ selectedRefill?.medicine?.unit || "Tablet" }}</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">Alasan Permintaan:</span>
                <span class="detail-val">{{ selectedRefill?.reason }}</span>
              </div>
              <div class="detail-row" v-if="selectedRefill?.description">
                <span class="detail-label">Catatan Pasien:</span>
                <span class="detail-val italic"
                  >"{{ selectedRefill?.description }}"</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">Waktu Pengajuan:</span>
                <span class="detail-val"
                  >{{ formatDate(selectedRefill?.created_at) }},
                  {{ formatTime(selectedRefill?.created_at) }} WIB</span
                >
              </div>
              <div class="detail-row">
                <span class="detail-label">Status Saat Ini:</span>
                <span class="detail-val">
                  <span
                    class="status-badge"
                    :class="'status-' + selectedRefill?.status"
                  >
                    {{ formatStatus(selectedRefill?.status) }}
                  </span>
                </span>
              </div>
              <div class="detail-row" v-if="selectedRefill?.nurse_note">
                <span class="detail-label">Catatan Nakes:</span>
                <span class="detail-val font-medium text-dark">{{
                  selectedRefill?.nurse_note
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./RefillRequestView.js"></script>

<style scoped src="./RefillRequestView.css"></style>
