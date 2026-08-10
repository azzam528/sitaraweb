<template>
  <div class="page-container">
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-col">
        
        <!-- Patient Profile Card -->
        <div class="card profile-card">
          <div class="profile-header">
            <div class="profile-info-wrap">
              <div class="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div class="profile-details">
                <h2>Bp. Ahmad Subarjo</h2>
                <p class="patient-id">TB-2026-00892 • 64 Tahun</p>
                <div class="badges">
                  <span class="badge badge-accent">Kategori I</span>
                  <span class="badge badge-primary-light">Fase Lanjutan</span>
                </div>
              </div>
            </div>
            <div class="progress-info">
              <div class="progress-days">
                <span class="day-current">45</span>
                <span class="day-total">/ 180</span>
              </div>
              <p class="progress-label">Progres Pengobatan</p>
            </div>
          </div>

          <div class="profile-stats">
            <div class="stat-item">
              <p class="stat-label">KEPATUHAN</p>
              <p class="stat-value text-success">98.5%</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">SISA OBAT EST.</p>
              <p class="stat-value text-danger">3 Hari</p>
            </div>
            <div class="stat-item">
              <p class="stat-label">KONTROL BERIKUTNYA</p>
              <p class="stat-value">28 Jul 2026</p>
            </div>
          </div>

          <div class="profile-footer">
            <div class="person-item">
              <div class="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div class="person-info">
                <span class="person-role">PMO</span>
                <span class="person-name">Surya</span>
              </div>
            </div>
            <div class="person-item">
              <div class="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <div class="person-info">
                <span class="person-role">KADER</span>
                <span class="person-name">Agus Salim</span>
              </div>
            </div>
            <div class="person-item">
              <div class="icon-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75v-3.75a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>
              </div>
              <div class="person-info">
                <span class="person-role">DOKTER</span>
                <span class="person-name">dr. Heru Prasetyo</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline Card -->
        <div class="card timeline-card">
          <div class="card-header">
            <svg class="header-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>Riwayat Pengambilan Obat</h3>
          </div>
          <div class="timeline">
            <!-- Timeline Item 3 (Current) -->
            <div class="timeline-item">
              <div class="timeline-marker marker-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <h4>Permintaan Saat Ini</h4>
                  <span class="status-badge status-waiting">Menunggu</span>
                </div>
                <p class="timeline-subtext">Kategori I (4FDC) - 28 Tablet.</p>
              </div>
            </div>

            <!-- Timeline Item 2 -->
            <div class="timeline-item">
              <div class="timeline-marker marker-success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <h4>Pengambilan Tahap 2</h4>
                  <span class="timeline-date">15 Jun 2026</span>
                </div>
                <p class="timeline-subtext">28 Tablet (4FDC) - Berhasil diserahkan oleh Kader Agus Salim.</p>
              </div>
            </div>

            <!-- Timeline Item 1 -->
            <div class="timeline-item pb-0">
              <div class="timeline-marker marker-success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <h4>Pengambilan Tahap 1</h4>
                  <span class="timeline-date">18 Mei 2026</span>
                </div>
                <p class="timeline-subtext">28 Tablet (4FDC) - Berhasil diserahkan di Puskesmas.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column -->
      <div class="right-col">
        <div class="card request-info-card">
          <div class="card-header border-bottom">
            <h3>Informasi Permintaan</h3>
          </div>
          
          <div class="info-rows">
            <div class="info-row">
              <span class="info-label">Jenis Obat</span>
              <span class="info-value font-bold">Kategori I (4FDC)</span>
            </div>
            <div class="info-row">
              <span class="info-label">Jumlah Diminta</span>
              <span class="info-value font-bold text-primary">28 Tablet</span>
            </div>
            <div class="info-row">
              <span class="info-label">Alasan</span>
              <span class="info-value">Obat Hilang</span>
            </div>
          </div>

          <div class="form-section">
            <label for="notes" class="form-label">Catatan Tenaga Kesehatan</label>
            <textarea 
              id="notes" 
              class="form-textarea" 
              rows="4" 
              placeholder="Masukkan catatan persetujuan atau alasan penolakan di sini..."
              v-model="notes"
            ></textarea>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary btn-block" @click="approveRequest">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Setujui Permintaan
            </button>
            <button class="btn btn-outline-danger btn-block" @click="rejectRequest">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Tolak Permintaan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notes = ref('')

const approveRequest = () => {
  console.log('Request approved', notes.value)
}

const rejectRequest = () => {
  console.log('Request rejected', notes.value)
}
</script>

<style scoped>
/* Base Variables & Setup */
* {
  box-sizing: border-box;
}

:root {
  --primary: #006591;
  --primary-light: #e6f0f5;
  --accent: #6DF5E1;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --card-bg: #FFFFFF;
  --border-radius: 12px;
}

.page-container {
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  color: var(--gray-800);
}

.content-grid {
  display: grid;
  grid-template-columns: 65% calc(35% - 1.5rem);
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.card-header.border-bottom {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-800);
}

.header-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary);
}

/* Typography Helpers */
.text-success { color: #22C55E !important; }
.text-danger { color: #EF4444 !important; }
.text-primary { color: #006591 !important; }
.font-bold { font-weight: 600 !important; }
.pb-0 { padding-bottom: 0 !important; }

/* --- Profile Card --- */
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.profile-info-wrap {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar {
  width: 4rem;
  height: 4rem;
  background-color: var(--gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
}

.avatar svg {
  width: 2rem;
  height: 2rem;
}

.profile-details h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.patient-id {
  margin: 0 0 0.5rem 0;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-accent {
  background-color: #e6fcf9;
  color: #0b9e8a;
}

.badge-primary-light {
  background-color: #e6f0f5;
  color: #006591;
}

.progress-info {
  text-align: right;
}

.progress-days {
  margin-bottom: 0.25rem;
}

.day-current {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.day-total {
  font-size: 1rem;
  color: var(--gray-500);
  font-weight: 500;
}

.progress-label {
  margin: 0;
  font-size: 0.75rem;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);
  padding: 1rem 0;
}

.stat-item {
  text-align: center;
  border-right: 1px solid var(--gray-200);
}

.stat-item:last-child {
  border-right: none;
}

.stat-label {
  margin: 0 0 0.25rem 0;
  font-size: 0.75rem;
  color: var(--gray-500);
  font-weight: 600;
}

.stat-value {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-800);
}

.profile-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.person-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon-wrap {
  width: 2rem;
  height: 2rem;
  background-color: var(--gray-100);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-600);
}

.icon-wrap svg {
  width: 1.25rem;
  height: 1.25rem;
}

.person-info {
  display: flex;
  flex-direction: column;
}

.person-role {
  font-size: 0.7rem;
  color: var(--gray-500);
  font-weight: 600;
}

.person-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-800);
}

/* --- Timeline --- */
.timeline {
  position: relative;
  padding-left: 1.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 21px; /* Center of the marker icon */
  width: 2px;
  background-color: var(--gray-200);
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-marker {
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 1;
}

.timeline-marker svg {
  width: 1.5rem;
  height: 1.5rem;
}

.marker-primary { color: #006591; }
.marker-success { color: #22C55E; }

.timeline-content {
  padding-left: 1rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.timeline-header h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.timeline-subtext {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-600);
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
}

.status-waiting {
  background-color: #e6f0f5;
  color: #006591;
}

/* --- Right Column Info --- */
.request-info-card {
  display: flex;
  flex-direction: column;
}

.info-rows {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: var(--gray-50);
  border-radius: 8px;
}

.info-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.info-value {
  font-size: 0.875rem;
  color: var(--gray-800);
}

.form-section {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.875rem;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  border-color: #006591;
  box-shadow: 0 0 0 2px rgba(0, 101, 145, 0.1);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-block {
  width: 100%;
}

.btn-primary {
  background-color: #006591;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #005378;
}

.btn-outline-danger {
  background-color: transparent;
  color: #EF4444;
  border: 1px solid #EF4444;
}

.btn-outline-danger:hover {
  background-color: #fef2f2;
}
</style>
