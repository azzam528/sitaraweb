<template>
  <div class="treatment-detail-page">
    <!-- Header Nav -->
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
      <button class="btn btn-primary mt-3" @click="goBack">
        Kembali ke Daftar
      </button>
    </div>

    <!-- Main Content -->
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

      <!-- 1. Top Section: Patient Profile Banner -->
      <DetailHeader
        :title="treatment.patient?.full_name || 'Pasien #' + treatment.patient_id"
        :initials="getInitials(treatment.patient?.full_name || 'TB')"
      >
        <template #status>
          <span class="status-badge" :class="'status-' + treatment.status">
            {{ formatStatus(treatment.status) }}
          </span>
        </template>

        <template #metadata>
          <span class="meta-item">
            <strong>NIK:</strong> {{ treatment.patient?.nik || "-" }}
          </span>
          <span class="meta-dot">&bull;</span>
          <span class="meta-item">
            <strong>No. RM:</strong> {{ treatment.patient?.medical_record_number || "-" }}
          </span>
          <template v-if="treatment.patient?.phone">
            <span class="meta-dot">&bull;</span>
            <span class="meta-item">
              <strong>Telp:</strong> {{ treatment.patient?.phone }}
            </span>
          </template>
        </template>
      </DetailHeader>

      <!-- 2. Treatment Tabs Navigation -->
      <div class="treatment-tabs-bar">
        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'treatment' }"
          @click="switchTab('treatment')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Informasi Treatment
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'medicines' }"
          @click="switchTab('medicines')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
            <path d="m8.5 8.5 7 7"></path>
          </svg>
          Jadwal Obat
          <span class="tab-count-badge">{{ medicineSchedules.length }}</span>
        </button>

        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'controls' }"
          @click="switchTab('controls')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Jadwal Kontrol
          <span class="tab-count-badge">{{ controlSchedules.length }}</span>
        </button>
      </div>

      <!-- ======================================================== -->
      <!-- TAB 1: INFORMASI TREATMENT -->
      <!-- ======================================================== -->
      <div v-if="activeTab === 'treatment'" class="tab-pane">
        <!-- Info Metrics Row -->
        <div class="info-grid">
          <!-- PROGRES PENGOBATAN -->
          <div class="card info-card progress-card">
            <div class="info-header">
              <span class="info-label">Progres Durasi Terapi</span>
              <span class="info-value-highlight font-bold">
                {{ progressData.daysPassed }} / {{ progressData.totalDays }} Hari
              </span>
            </div>

            <div class="progress-wrapper">
              <div class="progress-bar-container">
                <div
                  class="progress-bar"
                  :style="{
                    width: Math.max(6, progressData.percentage) + '%',
                    backgroundColor: getProgressColor(treatment),
                  }"
                ></div>
              </div>
            </div>

            <p class="info-subtext text-muted">
              {{ progressData.percentage }}% durasi telah berjalan
            </p>

            <p class="info-subtext text-muted">
              Estimasi selesai:
              <strong>
                {{ formatDate(treatment.therapy_end_date) }}
              </strong>
            </p>
          </div>

          <!-- TANGGAL DIAGNOSIS & TERAPI -->
          <div class="card info-card doctor-card">
            <div class="doctor-card-content">
              <div class="doctor-icon">
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
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>

              <div>
                <span class="info-label">Tanggal Diagnosis</span>

                <p class="doctor-name">
                  {{ formatDate(treatment.diagnosis_date) }}
                </p>

                <p class="info-subtext text-muted">
                  Mulai Terapi: {{ formatDate(treatment.therapy_start_date) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Detail Sections (Two Columns) -->
        <div class="grid-layout">
          <!-- Left Column: Detail Terapi & Pasien -->
          <div class="left-col">
            <!-- Detail Terapi -->
            <div class="card">
              <h3 class="section-title">Informasi Detail Terapi</h3>

              <div class="detail-list">
                <div class="detail-row">
                  <span class="detail-label">Fase Terapi (Phase):</span>
                  <span class="detail-val">{{ formatPhase(treatment.phase) }}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Paduan Regimen OAT:</span>
                  <span class="detail-val">{{ formatRegimen(treatment.regimen) }}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Status Pengobatan:</span>
                  <span class="detail-val">
                    <span
                      class="status-badge"
                      :class="'status-' + treatment.status"
                    >
                      {{ formatStatus(treatment.status) }}
                    </span>
                  </span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Tanggal Diagnosis:</span>
                  <span class="detail-val">{{
                    formatDate(treatment.diagnosis_date)
                  }}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Mulai Pengobatan:</span>
                  <span class="detail-val">{{
                    formatDate(treatment.therapy_start_date)
                  }}</span>
                </div>

                <div class="detail-row">
                  <span class="detail-label">Estimasi Selesai:</span>
                  <span class="detail-val">{{
                    formatDate(treatment.therapy_end_date)
                  }}</span>
                </div>
              </div>

              <div class="note-box mt-3" v-if="treatment.doctor_note">
                <h4>Catatan Dokter / Keterangan Klinis:</h4>
                <p>{{ treatment.doctor_note }}</p>
              </div>
            </div>

            <!-- Data Pasien Lengkap -->
            <div class="card" v-if="treatment.patient">
              <h3 class="section-title">Biodata & Informasi Pasien</h3>

              <div class="detail-list">
                <div class="detail-row">
                  <span class="detail-label">Nama Lengkap:</span>
                  <span class="detail-val font-semibold">{{
                    treatment.patient.full_name
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">NIK:</span>
                  <span class="detail-val">{{ treatment.patient.nik }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">No. Rekam Medis:</span>
                  <span class="detail-val">{{
                    treatment.patient.medical_record_number
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tanggal Lahir:</span>
                  <span class="detail-val">{{
                    formatDate(treatment.patient.birth_date)
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Jenis Kelamin:</span>
                  <span class="detail-val">{{
                    treatment.patient.gender === "male" ||
                    treatment.patient.gender === "L"
                      ? "Laki-laki"
                      : "Perempuan"
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Nomor Telepon:</span>
                  <span class="detail-val">{{
                    treatment.patient.phone || "-"
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Pekerjaan:</span>
                  <span class="detail-val">{{
                    treatment.patient.occupation || "-"
                  }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Alamat Domisili:</span>
                  <span class="detail-val">{{
                    treatment.patient.address || "-"
                  }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Tindakan & Aksi Cepat -->
          <div class="right-col">
            <div class="card action-card">
              <h3 class="section-title">Tindakan Pengobatan</h3>

              <div class="action-buttons-list">
                <button
                  class="btn btn-primary btn-block"
                  @click="openStatusModal"
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
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                  Ubah Status Terapi
                </button>

                <button
                  v-if="treatment.patient?.phone"
                  class="btn btn-outline btn-block"
                  @click="
                    sendWhatsApp(
                      treatment.patient.phone,
                      treatment.patient?.full_name,
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
                  Kirim Pengingat Pasien (WA)
                </button>

                <button
                  v-if="treatment.patient?.pmo_phone"
                  class="btn btn-outline btn-block"
                  @click="
                    sendWhatsApp(
                      treatment.patient.pmo_phone,
                      treatment.patient?.pmo_name,
                      'PMO',
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
                  Kirim Laporan ke PMO (WA)
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
                  Hapus Rekam Pengobatan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- TAB 2: JADWAL OBAT (MEDICINE SCHEDULES) -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'medicines'" class="tab-pane">
        <div class="card">
          <div class="card-header space-between">
            <div>
              <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
                  <path d="m8.5 8.5 7 7"></path>
                </svg>
                Jadwal Minum Obat Pasien
              </h2>
              <p class="section-subtitle">
                Atur jadwal, dosis, dan stok obat untuk konsumsi pasien serta verifikasi AI-VOT.
              </p>
            </div>

            <button
              type="button"
              class="btn btn-primary"
              @click="openAddMedicineModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Tambah Jadwal Obat
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loadingMedicines" class="loading-inline">
            <div class="spinner-sm"></div>
            <span>Memuat jadwal obat...</span>
          </div>

          <!-- Table -->
          <div v-else-if="medicineSchedules.length > 0" class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>OBAT</th>
                  <th>DOSIS</th>
                  <th>JAM MINUM</th>
                  <th>JUMLAH AWAL</th>
                  <th>JUMLAH TERSISA</th>
                  <th>STATUS</th>
                  <th style="text-align: right;">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in medicineSchedules" :key="item.id">
                  <td>
                    <strong class="text-primary">{{ getMedicineName(item.medicine_id) }}</strong>
                  </td>
                  <td>{{ item.dosage }}</td>
                  <td>
                    <span class="time-badge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {{ formatTime(item.drink_time) }}
                    </span>
                  </td>
                  <td>{{ item.quantity_initial }}</td>
                  <td>
                    <span
                      class="stock-badge"
                      :class="item.quantity_remaining <= 5 ? 'stock-low' : 'stock-ok'"
                    >
                      {{ item.quantity_remaining }}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge status-active">Aktif</span>
                  </td>
                  <td style="text-align: right;">
                    <div class="action-btn-group">
                      <button
                        type="button"
                        class="btn-icon"
                        title="Edit Jadwal"
                        @click="openEditMedicineModal(item)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="btn-icon text-danger"
                        title="Hapus Jadwal"
                        @click="confirmDeleteMedicineSchedule(item)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-tab-state">
            <div class="empty-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
                <path d="m8.5 8.5 7 7"></path>
              </svg>
            </div>
            <h3>Belum Ada Jadwal Obat</h3>
            <p>Pasien belum memiliki jadwal obat terdaftar untuk terapi TB ini.</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="openAddMedicineModal"
            >
              + Tambah Jadwal Obat Sekarang
            </button>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- TAB 3: JADWAL KONTROL (CONTROL SCHEDULES) -->
      <!-- ======================================================== -->
      <div v-else-if="activeTab === 'controls'" class="tab-pane">
        <div class="card">
          <div class="card-header space-between">
            <div>
              <h2 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Jadwal Kunjungan Kontrol Faskes
              </h2>
              <p class="section-subtitle">
                Atur jadwal kunjungan kontrol berkala pasien untuk evaluasi klinis dan radiologis.
              </p>
            </div>

            <button
              type="button"
              class="btn btn-primary"
              @click="openAddControlModal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Tambah Jadwal Kontrol
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loadingControls" class="loading-inline">
            <div class="spinner-sm"></div>
            <span>Memuat jadwal kontrol...</span>
          </div>

          <!-- Table -->
          <div v-else-if="controlSchedules.length > 0" class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>TANGGAL KONTROL</th>
                  <th>JAM</th>
                  <th>STATUS</th>
                  <th>CATATAN DOKTER</th>
                  <th style="text-align: right;">AKSI</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in controlSchedules" :key="item.id">
                  <td>
                    <strong class="text-primary">{{ formatDate(item.control_date) }}</strong>
                  </td>
                  <td>
                    <span class="time-badge">
                      {{ formatTime(item.control_time) }}
                    </span>
                  </td>
                  <td>
                    <span class="status-badge" :class="getControlBadgeClass(item.status)">
                      {{ formatControlStatus(item.status) }}
                    </span>
                  </td>
                  <td>{{ item.doctor_note || "-" }}</td>
                  <td style="text-align: right;">
                    <div class="action-btn-group">
                      <button
                        type="button"
                        class="btn-icon"
                        title="Edit Kontrol"
                        @click="openEditControlModal(item)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="btn-icon text-danger"
                        title="Hapus Kontrol"
                        @click="confirmDeleteControlSchedule(item)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-tab-state">
            <div class="empty-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3>Belum Ada Jadwal Kontrol</h3>
            <p>Pasien belum memiliki jadwal kontrol berkala terdaftar.</p>
            <button
              type="button"
              class="btn btn-primary"
              @click="openAddControlModal"
            >
              + Tambah Jadwal Kontrol Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL: UBAH STATUS TERAPI -->
    <!-- ======================================================== -->
    <div
      v-if="showStatusModal"
      class="modal-backdrop"
      @click="showStatusModal = false"
    >
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Ubah Status Terapi</h3>
          <button class="btn-close" @click="showStatusModal = false">&times;</button>
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
            <button
              type="button"
              class="btn btn-outline"
              @click="showStatusModal = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Menyimpan...</span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL: TAMBAH / EDIT JADWAL OBAT -->
    <!-- ======================================================== -->
    <div
      v-if="showMedicineModal"
      class="modal-backdrop"
      @click="showMedicineModal = false"
    >
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ isEditingMedicine ? "Edit Jadwal Obat" : "Tambah Jadwal Obat" }}
          </h3>
          <button class="btn-close" @click="showMedicineModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitMedicineSchedule">
          <div class="modal-body">
            <!-- OBAT SELECTION -->
            <div class="form-group mb-3">
              <label>Nama Obat <span class="text-danger">*</span></label>
              <select
                v-if="!isEditingMedicine"
                v-model="medicineForm.medicine_id"
                class="form-control"
                required
              >
                <option value="" disabled>Pilih Obat TB...</option>
                <option
                  v-for="med in medicinesList"
                  :key="med.id"
                  :value="med.id"
                >
                  {{ med.name }} {{ med.strength ? `(${med.strength})` : "" }} - {{ med.unit }}
                </option>
              </select>
              <input
                v-else
                type="text"
                class="form-control"
                :value="getMedicineName(medicineForm.medicine_id)"
                disabled
              />
            </div>

            <!-- DOSIS -->
            <div class="form-group mb-3">
              <label>Dosis / Aturan Pakai <span class="text-danger">*</span></label>
              <input
                v-model="medicineForm.dosage"
                type="text"
                class="form-control"
                placeholder="Contoh: 1 tablet, 2 kaplet, 1 kapsul"
                required
              />
            </div>

            <!-- JAM MINUM -->
            <div class="form-group mb-3">
              <label>Jam Minum Obat <span class="text-danger">*</span></label>
              <input
                v-model="medicineForm.drink_time"
                type="time"
                class="form-control"
                required
              />
            </div>

            <div class="form-row-2 mb-3">
              <!-- JUMLAH AWAL -->
              <div class="form-group">
                <label>Jumlah Awal <span class="text-danger">*</span></label>
                <input
                  v-model.number="medicineForm.quantity_initial"
                  type="number"
                  min="1"
                  class="form-control"
                  required
                />
              </div>

              <!-- JUMLAH TERSISA -->
              <div class="form-group">
                <label>Jumlah Tersisa <span class="text-danger">*</span></label>
                <input
                  v-model.number="medicineForm.quantity_remaining"
                  type="number"
                  min="0"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline"
              @click="showMedicineModal = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="submittingMedicine"
            >
              <span v-if="submittingMedicine">Menyimpan...</span>
              <span v-else>{{ isEditingMedicine ? "Simpan Perubahan" : "Tambah Jadwal" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL: TAMBAH / EDIT JADWAL KONTROL -->
    <!-- ======================================================== -->
    <div
      v-if="showControlModal"
      class="modal-backdrop"
      @click="showControlModal = false"
    >
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ isEditingControl ? "Edit Jadwal Kontrol" : "Tambah Jadwal Kontrol" }}
          </h3>
          <button class="btn-close" @click="showControlModal = false">&times;</button>
        </div>

        <form @submit.prevent="submitControlSchedule">
          <div class="modal-body">
            <div class="form-row-2 mb-3">
              <!-- TANGGAL KONTROL -->
              <div class="form-group">
                <label>Tanggal Kontrol <span class="text-danger">*</span></label>
                <input
                  v-model="controlForm.control_date"
                  type="date"
                  class="form-control"
                  required
                />
              </div>

              <!-- JAM KONTROL -->
              <div class="form-group">
                <label>Jam Kontrol <span class="text-danger">*</span></label>
                <input
                  v-model="controlForm.control_time"
                  type="time"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <!-- STATUS (if editing) -->
            <div v-if="isEditingControl" class="form-group mb-3">
              <label>Status Kunjungan <span class="text-danger">*</span></label>
              <select v-model="controlForm.status" class="form-control" required>
                <option value="pending">Terjadwal (Pending)</option>
                <option value="completed">Selesai (Completed)</option>
                <option value="missed">Terlewat (Missed)</option>
                <option value="cancelled">Dibatalkan (Cancelled)</option>
              </select>
            </div>

            <!-- CATATAN DOKTER -->
            <div class="form-group">
              <label>Catatan Dokter / Agenda Kontrol</label>
              <textarea
                v-model="controlForm.doctor_note"
                rows="3"
                placeholder="Contoh: Evaluasi sputum BTA akhir bulan ke-2, foto toraks ulang..."
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline"
              @click="showControlModal = false"
            >
              Batal
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="submittingControl"
            >
              <span v-if="submittingControl">Menyimpan...</span>
              <span v-else>{{ isEditingControl ? "Simpan Perubahan" : "Jadwalkan Kontrol" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./TreatmentDetailView.js"></script>

<style scoped src="./TreatmentDetailView.css"></style>
