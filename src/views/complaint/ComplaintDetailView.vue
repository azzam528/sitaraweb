<template>
  <div class="complaint-detail-page">
    <!-- Nav Back -->
    <div class="header-nav mb-3">
      <button @click="goBack" class="back-link">
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
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Daftar Keluhan
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state card">
      <div class="spinner"></div>
      <p>Memuat detail keluhan pasien...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="!complaint" class="error-state card">
      <h3>Data Keluhan Tidak Ditemukan</h3>
      <p>Laporan keluhan dengan ID ini tidak tersedia atau telah dihapus.</p>
      <button class="btn btn-primary mt-3" @click="goBack">
        Kembali ke Daftar
      </button>
    </div>

    <!-- Main Detail Content -->
    <div v-else class="detail-container">
      <!-- Toast Alert -->
      <div
        v-if="alertMessage"
        class="toast-alert"
        :class="'toast-' + alertType"
      >
        <span>{{ alertMessage }}</span>
        <button class="btn-close-toast" @click="alertMessage = ''">
          &times;
        </button>
      </div>

      <!-- 1. Patient Profile Header Card -->
      <DetailHeader
        :title="complaint.treatment?.patient?.full_name || 'Pasien #' + complaint.treatment_id"
        :initials="getInitials(complaint.treatment?.patient?.full_name || 'TB')"
      >
        <template #status>
          <span class="status-badge" :class="'status-' + complaint.status">
            {{ formatStatus(complaint.status) }}
          </span>
        </template>

        <template #metadata>
          <span class="meta-item">
            <strong>NIK:</strong> {{ complaint.treatment?.patient?.nik || "-" }}
          </span>
          <span class="meta-dot">&bull;</span>
          <span class="meta-item">
            <strong>No. RM:</strong> {{ complaint.treatment?.patient?.medical_record_number || "-" }}
          </span>
          <span class="meta-dot">&bull;</span>
          <span class="meta-item">
            <strong>Kategori:</strong> {{ formatCategory(complaint.category) }}
          </span>
        </template>
      </DetailHeader>

      <!-- 2. Grid Layout -->
      <div class="row-grid">
        <!-- Left Column: Detail Keluhan & Deskripsi Pasien -->
        <div class="col-main">
          <!-- Detail Keluhan Box -->
          <div class="card">
            <div class="card-header-row">
              <div class="card-title-with-icon">
                <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h3 class="section-title">Detail Laporan ESO / Keluhan</h3>
              </div>
              <span class="category-badge">{{ formatCategory(complaint.category) }}</span>
            </div>

            <div class="complaint-quote-box">
              <p class="complaint-quote">"{{ complaint.description || 'Tidak ada deskripsi keluhan tertulis.' }}"</p>
            </div>

            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Kategori Efek Samping:</span>
                <span class="detail-val font-semibold">{{ formatCategory(complaint.category) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Waktu Dilaporkan:</span>
                <span class="detail-val">{{ formatDate(complaint.created_at) }} ({{ formatTime(complaint.created_at) }})</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tingkat Keparahan:</span>
                <span class="detail-val">
                  <span class="severity-badge" :class="'severity-' + (complaint.severity || 'mild')">
                    {{ formatSeverity(complaint.severity) }}
                  </span>
                </span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Status Penanganan:</span>
                <span class="detail-val">
                  <span class="status-badge" :class="'status-' + complaint.status">
                    {{ formatStatus(complaint.status) }}
                  </span>
                </span>
              </div>
            </div>

            <!-- Respon Medis Tersimpan -->
            <div v-if="complaint.response" class="response-history-box">
              <div class="response-header-row mb-1">
                <h4 class="response-title">Tanggapan & Rekomendasi Medis:</h4>
                <span class="status-badge status-resolved text-xs">Telah Ditanggapi</span>
              </div>
              <p class="response-text">{{ complaint.response }}</p>
              <span class="response-meta" v-if="complaint.responded_at || complaint.updated_at">
                Diperbarui: {{ formatDate(complaint.responded_at || complaint.updated_at) }} ({{ formatTime(complaint.responded_at || complaint.updated_at) }} WIB)
              </span>
            </div>
          </div>

          <!-- Kontak & Informasi Pasien -->
          <div class="card" v-if="complaint.treatment?.patient">
            <h3 class="section-title">Kontak & Alamat Pasien</h3>

            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nomor Telepon Pasien:</span>
                <span class="detail-val font-semibold">
                  {{ complaint.treatment.patient.phone || "-" }}
                </span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Alamat Lengkap:</span>
                <span class="detail-val">
                  {{ complaint.treatment.patient.address || "-" }}
                </span>
              </div>
            </div>
          </div>
        </div>

          <!-- Right Column: Tindakan Medis (Beri / Perbarui Tanggapan) -->
          <div class="col-side">
            <!-- Form Tanggapan Medis -->
            <div class="card action-card">
              <div class="card-header-row mb-3">
                <h3 class="side-title">
                  {{ complaint.status === 'resolved' || complaint.response ? 'Perbarui Tanggapan Medis' : 'Beri Tanggapan Medis' }}
                </h3>
                <span class="status-badge" :class="'status-' + (complaint.status || 'pending')">
                  {{ formatStatus(complaint.status) }}
                </span>
              </div>

              <form @submit.prevent="submitUpdateStatus">
                <div class="form-group mb-3">
                  <label for="clinicalResponse">
                    Instruksi / Rekomendasi Klinis <span class="text-danger">*</span>
                  </label>
                  <textarea
                    id="clinicalResponse"
                    v-model="responseForm.response"
                    rows="5"
                    placeholder="Tuliskan instruksi penanganan klinis, anjuran kontrol, atau resep obat simtomatis untuk pasien..."
                    class="form-control"
                    required
                  ></textarea>
                  <p class="text-xs text-muted mt-2">
                    * Laporan keluhan akan otomatis berstatus <strong>Selesai</strong> setelah tanggapan disimpan.
                  </p>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  :disabled="isSubmitting || !responseForm.response?.trim()"
                >
                  <span v-if="isSubmitting" class="spinner-sm"></span>
                  <span v-else>
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
                      class="btn-icon"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    {{ complaint.status === 'resolved' || complaint.response ? 'Simpan Perubahan Tanggapan' : 'Kirim Tanggapan (Selesaikan)' }}
                  </span>
                </button>
              </form>
            </div>

            <!-- Aksi Cepat / Hubungi Pasien -->
            <div class="card">
              <h3 class="side-title">Aksi Cepat</h3>
              <div class="action-buttons-list">
                <button
                  v-if="complaint.treatment?.patient?.phone"
                  class="btn btn-outline-success btn-block"
                  @click="
                    sendWhatsApp(
                      complaint.treatment.patient.phone,
                      complaint.treatment.patient.full_name,
                      'Pasien',
                    )
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
                  Hubungi Pasien (WA)
                </button>

                <button
                  class="btn btn-outline-danger btn-block"
                  @click="confirmDelete"
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
                  Hapus Laporan Keluhan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./ComplaintDetailView.js"></script>

<style scoped src="./ComplaintDetailView.css"></style>
