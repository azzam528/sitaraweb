<template>
  <div class="report-view">
    <!-- Non-Printable Controls & Filters -->
    <div class="no-print">
      <div class="page-header">
        <h1 class="page-title">Laporan & Rekapitulasi Evaluasi TB</h1>
        <p class="subtitle">Buat, filter, unduh data CSV, dan cetak dokumen evaluasi program penanggulangan TB.</p>
      </div>

      <!-- Controls Card -->
      <div class="filter-card card">
        <div class="filter-grid">
          <!-- 1. Report Type -->
          <div class="form-group">
            <label>Jenis Rekapitulasi</label>
            <select class="form-select" v-model="selectedReportType">
              <option value="treatment">Rekapitulasi Pengobatan Pasien TB</option>
              <option value="refill">Rekapitulasi Permintaan Refill Obat OAT</option>
              <option value="complaint">Rekapitulasi Keluhan Efek Samping (ESO)</option>
            </select>
          </div>

          <!-- 2. Period Filter -->
          <div class="form-group">
            <label>Periode Waktu</label>
            <select class="form-select" v-model="selectedPeriod">
              <option value="all">Semua Waktu</option>
              <option value="this_month">Bulan Ini ({{ currentMonthName }})</option>
              <option value="last_3_months">3 Bulan Terakhir</option>
              <option value="this_year">Tahun Ini (2026)</option>
            </select>
          </div>

          <!-- 3. Status Filter (Specific to Treatment Report) -->
          <div class="form-group" v-if="selectedReportType === 'treatment'">
            <label>Status Pengobatan</label>
            <select class="form-select" v-model="filterTreatmentStatus">
              <option value="">Semua Status</option>
              <option value="active">Aktif Pengobatan</option>
              <option value="completed">Selesai (Sembuh)</option>
              <option value="defaulted">Putus Berobat</option>
            </select>
          </div>

          <!-- 4. Facility Name -->
          <div class="form-group">
            <label>Nama Fasilitas Kesehatan (Faskes)</label>
            <input type="text" class="form-input" v-model="facilityName" placeholder="Contoh: Puskesmas Sukajadi" />
          </div>
        </div>

        <div class="action-buttons-group">
          <button @click="exportCSV" class="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Ekspor Data (CSV)
          </button>

          <button @click="printReport" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Cetak Dokumen (Print / PDF)
          </button>
        </div>
      </div>
    </div>

    <!-- Printable Report Document Section -->
    <div class="printable-report card">
      <!-- Loading State -->
      <div v-if="isLoading" class="report-loading">
        <div class="spinner"></div>
        <p>Menyiapkan data laporan dari server...</p>
      </div>

      <div v-else>
        <!-- Report Header / Kop Dokumen -->
        <div class="report-header">
          <div class="report-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#006591" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div class="report-title-section">
            <h2>SISTEM INFORMASI MONITORING TUBERKULOSIS (SITARA)</h2>
            <h3>{{ facilityName.toUpperCase() }}</h3>
            <p class="report-subtitle">
              {{ getReportTitle() }} &bull; Periode: {{ getPeriodLabel() }}
            </p>
          </div>
          <div class="report-meta-right">
            <span class="report-date">Dicetak: {{ currentDateFormatted }}</span>
            <span class="report-version">Dokumen Resmi SITARA TB</span>
          </div>
        </div>

        <hr class="report-divider" />

        <!-- Summary KPI Section -->
        <div class="report-summary">
          <div class="summary-box">
            <span class="summary-label">TOTAL REKAM DATA</span>
            <span class="summary-value">{{ filteredData.length }}</span>
          </div>

          <template v-if="selectedReportType === 'treatment'">
            <div class="summary-box">
              <span class="summary-label">AKTIF PENGOBATAN</span>
              <span class="summary-value text-primary">{{ treatmentActiveCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">SELESAI / SEMBUH</span>
              <span class="summary-value text-success">{{ treatmentCompletedCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">PUTUS BEROBAT</span>
              <span class="summary-value text-danger">{{ treatmentDefaultedCount }}</span>
            </div>
          </template>

          <template v-else-if="selectedReportType === 'refill'">
            <div class="summary-box">
              <span class="summary-label">MENUNGGU VERIFIKASI</span>
              <span class="summary-value text-warning">{{ refillPendingCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">DISETUJUI</span>
              <span class="summary-value text-success">{{ refillApprovedCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">DITOLAK</span>
              <span class="summary-value text-danger">{{ refillRejectedCount }}</span>
            </div>
          </template>

          <template v-else>
            <div class="summary-box">
              <span class="summary-label">MENUNGGU TINDAKAN</span>
              <span class="summary-value text-warning">{{ complaintPendingCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">SEDANG DIPROSES</span>
              <span class="summary-value text-primary">{{ complaintInProgressCount }}</span>
            </div>
            <div class="summary-box">
              <span class="summary-label">TERATASI (RESOLVED)</span>
              <span class="summary-value text-success">{{ complaintResolvedCount }}</span>
            </div>
          </template>
        </div>

        <!-- ============================================================= -->
        <!-- TABLE 1: REKAPITULASI PROGRAM PENGOBATAN TB -->
        <!-- ============================================================= -->
        <div v-if="selectedReportType === 'treatment'" class="report-table-container">
          <table class="report-table">
            <thead>
              <tr>
                <th style="width: 40px;">No.</th>
                <th>NIK</th>
                <th>Nama Pasien</th>
                <th>No. RM</th>
                <th>Tgl Mulai</th>
                <th>Tgl Selesai (Target)</th>
                <th>Status Terapi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredTreatments.length === 0">
                <td colspan="7" class="text-center py-6 text-muted">Tidak ada data pengobatan pada periode ini.</td>
              </tr>
              <tr v-for="(item, index) in filteredTreatments" :key="item.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="font-mono text-xs">{{ item.patient?.nik || '-' }}</td>
                <td class="font-semibold">{{ item.patient?.full_name || 'Pasien #' + item.patient_id }}</td>
                <td class="font-mono text-xs">{{ item.patient?.medical_record_number || '-' }}</td>
                <td>{{ formatDate(item.start_date) }}</td>
                <td>{{ formatDate(item.end_date) }}</td>
                <td>
                  <span class="status-cell" :class="'cell-' + item.status">
                    {{ formatTreatmentStatus(item.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ============================================================= -->
        <!-- TABLE 2: REKAPITULASI PERMINTAAN REFILL OBAT OAT -->
        <!-- ============================================================= -->
        <div v-else-if="selectedReportType === 'refill'" class="report-table-container">
          <table class="report-table">
            <thead>
              <tr>
                <th style="width: 40px;">No.</th>
                <th>Nama Pasien</th>
                <th>NIK</th>
                <th>No. RM</th>
                <th>Sisa Obat</th>
                <th>Waktu Pengajuan</th>
                <th>Status Permintaan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredRefills.length === 0">
                <td colspan="7" class="text-center py-6 text-muted">Tidak ada data permintaan refill pada periode ini.</td>
              </tr>
              <tr v-for="(item, index) in filteredRefills" :key="item.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="font-semibold">{{ item.treatment?.patient?.full_name || 'Pengobatan #' + item.treatment_id }}</td>
                <td class="font-mono text-xs">{{ item.treatment?.patient?.nik || '-' }}</td>
                <td class="font-mono text-xs">{{ item.treatment?.patient?.medical_record_number || '-' }}</td>
                <td>{{ item.remaining_days }} Hari</td>
                <td>{{ formatDate(item.request_date) }}</td>
                <td>
                  <span class="status-cell" :class="'cell-' + item.status">
                    {{ formatRefillStatus(item.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- ============================================================= -->
        <!-- TABLE 3: REKAPITULASI KELUHAN EFEK SAMPING (ESO) -->
        <!-- ============================================================= -->
        <div v-else class="report-table-container">
          <table class="report-table">
            <thead>
              <tr>
                <th style="width: 40px;">No.</th>
                <th>Nama Pasien</th>
                <th>NIK</th>
                <th>Kategori Keluhan</th>
                <th>Deskripsi Keluhan Pasien</th>
                <th>Waktu Laporan</th>
                <th>Tanggapan / Tindakan Medis</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredComplaints.length === 0">
                <td colspan="8" class="text-center py-6 text-muted">Tidak ada data keluhan klinis pada periode ini.</td>
              </tr>
              <tr v-for="(item, index) in filteredComplaints" :key="item.id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="font-semibold">{{ item.treatment?.patient?.full_name || 'Pengobatan #' + item.treatment_id }}</td>
                <td class="font-mono text-xs">{{ item.treatment?.patient?.nik || '-' }}</td>
                <td class="font-medium">{{ item.category }}</td>
                <td class="text-xs italic">"{{ item.description }}"</td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td class="text-xs">{{ item.response || 'Belum ada tanggapan' }}</td>
                <td>
                  <span class="status-cell" :class="'cell-' + item.status">
                    {{ formatComplaintStatus(item.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Signatures Block for Official Stamp & Printing -->
        <div class="report-signatures">
          <div class="signature-box">
            <p>Mengetahui,</p>
            <p class="role">Kepala {{ facilityName }}</p>
            <div class="signature-space"></div>
            <p class="name">dr. H. Wahyudi, Sp.PD</p>
            <p class="nip">NIP. 19750312 200212 1 004</p>
          </div>

          <div class="signature-box">
            <p>{{ reportCity }}, {{ currentDateFormatted }}</p>
            <p class="role">Penanggung Jawab Program TB</p>
            <div class="signature-space"></div>
            <p class="name">{{ currentOfficerName }}</p>
            <p class="nip">NIP. 19880415 201101 2 008</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ReportView.js"></script>

<style scoped src="./ReportView.css"></style>
