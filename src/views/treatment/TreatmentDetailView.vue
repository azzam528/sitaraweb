<template>
  <div class="treatment-detail-page">
    <!-- Header Nav -->
    <div class="header-nav mb-3">
      <button @click="goBack" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Kembali ke Monitoring Pengobatan
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state card">
      <div class="spinner"></div>
      <p>Memuat rincian pengobatan...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="!treatment" class="error-state card">
      <h3>Data Pengobatan Tidak Ditemukan</h3>
      <p>Rekam pengobatan dengan ID ini tidak tersedia atau telah dihapus.</p>
      <button class="btn btn-primary mt-3" @click="goBack">Kembali ke Daftar</button>
    </div>

    <!-- Main Content -->
    <div v-else class="detail-container">
      <!-- Toast Alert -->
      <div v-if="alertMessage" class="toast-alert" :class="'toast-' + alertType">
        <span>{{ alertMessage }}</span>
        <button class="btn-close-toast" @click="alertMessage = ''">&times;</button>
      </div>

      <!-- 1. Top Section: Patient Profile Banner -->
      <div class="card profile-banner">
        <div class="profile-main">
          <div class="avatar-lg">
            {{ getInitials(treatment.patient?.full_name || 'TB') }}
          </div>
          <div class="profile-info">
            <div class="profile-header-row">
              <h2 class="patient-title">{{ treatment.patient?.full_name || 'Pasien #' + treatment.patient_id }}</h2>
              <span class="status-badge" :class="'status-' + treatment.status">
                {{ formatStatus(treatment.status) }}
              </span>
            </div>

            <div class="profile-badges">
              <span class="meta-item">
                <strong>NIK:</strong> {{ treatment.patient?.nik || '-' }}
              </span>
              <span class="meta-item">
                <strong>No. RM:</strong> {{ treatment.patient?.medical_record_number || '-' }}
              </span>
              <span class="meta-item" v-if="treatment.patient?.phone">
                <strong>Telp:</strong> {{ treatment.patient?.phone }}
              </span>
            </div>

            <div class="treatment-tags mt-2">
              <span class="tag-pill tag-phase">
                {{ formatPhase(treatment.phase) }}
              </span>
              <span class="tag-pill tag-regimen">
                {{ formatRegimen(treatment.regimen) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Info Metrics Row -->
      <div class="info-grid">
        <!-- Progres Pengobatan -->
        <div class="card info-card">
          <div class="info-header">
            <span class="info-label">Progres Durasi Terapi</span>
            <span class="info-value-highlight font-bold">{{ progressData.daysPassed }} / {{ progressData.totalDays }} Hari</span>
          </div>
          <div class="progress-wrapper">
            <div class="progress-bar-container">
              <div 
                class="progress-bar" 
                :class="getProgressColorClass(treatment)" 
                :style="{ width: progressData.percentage + '%' }"
              ></div>
            </div>
          </div>
          <p class="info-subtext text-muted">
            {{ progressData.percentage }}% durasi telah berjalan (Estimasi selesai: {{ formatDate(treatment.therapy_end_date) }})
          </p>
        </div>

        <!-- Petugas Monitoring (PMO) -->
        <div class="card info-card">
          <div class="info-header">
            <span class="info-label">Pengawas Menelan Obat (PMO)</span>
          </div>
          <p class="info-value font-bold">{{ treatment.patient?.pmo_name || 'Belum Ditentukan' }}</p>
          <p class="info-subtext text-muted">
            No. HP: {{ treatment.patient?.pmo_phone || '-' }}
          </p>
          <button 
            v-if="treatment.patient?.pmo_phone" 
            class="btn btn-sm btn-outline-success mt-2" 
            @click="sendWhatsApp(treatment.patient.pmo_phone, treatment.patient?.pmo_name, 'PMO')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Hubungi PMO (WA)
          </button>
        </div>

        <!-- Dokter Penanggung Jawab -->
        <div class="card info-card">
          <div class="info-header">
            <span class="info-label">Dokter Penanggung Jawab</span>
          </div>
          <p class="info-value font-bold">{{ treatment.doctor_name || '-' }}</p>
          <p class="info-subtext text-muted">
            Diagnosis: {{ formatDate(treatment.diagnosis_date) }}
          </p>
        </div>
      </div>

      <!-- 3. Main Detail Sections (Two Columns) -->
      <div class="grid-layout">
        <!-- Left Column: Klinis & Data Pasien -->
        <div class="left-col">
          <!-- Detail Terapi -->
          <div class="card">
            <h3 class="section-title">Informasi Detail Terapi</h3>
            
            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Status Pengobatan:</span>
                <span class="detail-val">
                  <span class="status-badge" :class="'status-' + treatment.status">
                    {{ formatStatus(treatment.status) }}
                  </span>
                </span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Fase Terapi:</span>
                <span class="detail-val font-semibold">{{ formatPhase(treatment.phase) }}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Regimen Obat:</span>
                <span class="detail-val font-semibold">{{ formatRegimen(treatment.regimen) }}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Tanggal Diagnosis:</span>
                <span class="detail-val">{{ formatDate(treatment.diagnosis_date) }}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Mulai Pengobatan:</span>
                <span class="detail-val">{{ formatDate(treatment.therapy_start_date) }}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Estimasi Selesai:</span>
                <span class="detail-val">{{ formatDate(treatment.therapy_end_date) }}</span>
              </div>

              <div class="detail-row">
                <span class="detail-label">Dokter PJ:</span>
                <span class="detail-val">{{ treatment.doctor_name }}</span>
              </div>
            </div>

            <div class="note-box mt-3" v-if="treatment.doctor_note">
              <h4>Catatan Dokter / Instruksi Klinis:</h4>
              <p>{{ treatment.doctor_note }}</p>
            </div>
          </div>

          <!-- Data Pasien Lengkap -->
          <div class="card" v-if="treatment.patient">
            <h3 class="section-title">Biodata & Informasi Pasien</h3>

            <div class="detail-list">
              <div class="detail-row">
                <span class="detail-label">Nama Lengkap:</span>
                <span class="detail-val font-semibold">{{ treatment.patient.full_name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">NIK:</span>
                <span class="detail-val">{{ treatment.patient.nik }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">No. Rekam Medis:</span>
                <span class="detail-val">{{ treatment.patient.medical_record_number }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Tanggal Lahir:</span>
                <span class="detail-val">{{ formatDate(treatment.patient.birth_date) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Jenis Kelamin:</span>
                <span class="detail-val">{{ treatment.patient.gender === 'male' || treatment.patient.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Nomor Telepon:</span>
                <span class="detail-val">{{ treatment.patient.phone || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Pekerjaan:</span>
                <span class="detail-val">{{ treatment.patient.occupation || '-' }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Alamat Domisili:</span>
                <span class="detail-val">{{ treatment.patient.address || '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Tindakan & Aksi Cepat -->
        <div class="right-col">
          <div class="card action-card">
            <h3 class="section-title">Tindakan Pengobatan</h3>

            <div class="action-buttons-list">
              <button class="btn btn-primary btn-block" @click="openStatusModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Ubah Status & Fase
              </button>

              <button 
                v-if="treatment.patient?.phone" 
                class="btn btn-outline btn-block" 
                @click="sendWhatsApp(treatment.patient.phone, treatment.patient?.full_name, 'Pasien')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Kirim Pengingat Pasien (WA)
              </button>

              <button 
                v-if="treatment.patient?.pmo_phone" 
                class="btn btn-outline btn-block" 
                @click="sendWhatsApp(treatment.patient.pmo_phone, treatment.patient?.pmo_name, 'PMO')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Kirim Laporan ke PMO (WA)
              </button>

              <button class="btn btn-outline-danger btn-block" @click="confirmDelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Hapus Rekam Pengobatan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: Ubah Status & Fase -->
    <div v-if="showStatusModal" class="modal-backdrop" @click="showStatusModal = false">
      <div class="modal-dialog modal-sm" @click.stop>
        <div class="modal-header">
          <h3>Ubah Status & Fase Terapi</h3>
          <button class="modal-close" @click="showStatusModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitUpdateStatus">
          <div class="modal-body">
            <div class="form-group mb-3">
              <label>Status Pengobatan <span class="text-danger">*</span></label>
              <select v-model="statusForm.status" class="form-control" required>
                <option value="active">Aktif (Sedang Berjalan)</option>
                <option value="completed">Selesai / Sembuh (Lulus Terapi)</option>
                <option value="dropped">Putus Obat (Drop Out)</option>
              </select>
            </div>

            <div class="form-group mb-3">
              <label>Fase Pengobatan <span class="text-danger">*</span></label>
              <select v-model="statusForm.phase" class="form-control" required>
                <option value="intensive">Fase Intensif (2 Bulan)</option>
                <option value="continuation">Fase Lanjutan (4 Bulan)</option>
              </select>
            </div>

            <div class="form-group mb-3">
              <label>Regimen</label>
              <select v-model="statusForm.regimen" class="form-control">
                <option value="category_1">Kategori 1 (2HRZE / 4H3R3)</option>
                <option value="category_2">Kategori 2 (2HRZES / 1HRZE / 5H3R3E3)</option>
                <option value="mdr">TB-RO (MDR)</option>
              </select>
            </div>

            <div class="form-group">
              <label>Catatan Dokter / Keterangan Tambahan</label>
              <textarea 
                v-model="statusForm.doctor_note" 
                rows="3" 
                placeholder="Catatan perkembangan terapi..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" @click="showStatusModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-sm"></span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./TreatmentDetailView.js"></script>

<style scoped src="./TreatmentDetailView.css"></style>
