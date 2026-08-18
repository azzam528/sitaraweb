<template>
  <div class="patient-detail-page">
    <div class="header-nav">
      <RouterLink to="/dashboard/patients" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Kembali ke Daftar Pasien
      </RouterLink>
    </div>

    <div v-if="isLoading" class="card text-center py-10">
      <p class="text-secondary font-medium">Memuat data detail pasien...</p>
    </div>

    <div v-else-if="error" class="card text-center py-10">
      <p class="text-danger font-medium">{{ error }}</p>
    </div>

    <div v-else-if="patient">
      <!-- 1. Patient Profile Header -->
      <div class="card profile-header">
        <div class="profile-top">
          <div class="profile-left">
            <div class="avatar-large">
              <span class="initials">{{ initials }}</span>
            </div>
            <div class="profile-info">
              <div class="name-row">
                <h2>{{ patient.full_name }}</h2>
                <span class="badge" :class="patient.is_active ? 'badge-success' : 'badge-danger'">
                  {{ patient.is_active ? 'Aktif Pengobatan' : 'Non-Aktif' }}
                </span>
              </div>
              <div class="meta-row">
                <span>NIK: {{ patient.nik }}</span>
                <span class="dot">•</span>
                <span>{{ age }} Tahun</span>
                <span class="dot">•</span>
                <span>{{ genderText }}</span>
                <span class="dot">•</span>
                <span>{{ patient.address ? patient.address.split(',')[0] : 'Bandung' }}</span>
              </div>
            </div>
          </div>
          <div class="profile-actions">
            <RouterLink :to="`/dashboard/patients/${patient.id}/edit`" class="btn btn-outline">Edit Data Pasien</RouterLink>
            <button class="btn btn-filled" @click="contactPatient">Hubungi Pasien</button>
          </div>
        </div>
        <div class="profile-bottom">
          <div class="data-field">
            <div class="field-label">TANGGAL MULAI</div>
            <div class="field-value text-primary">{{ treatment ? formatDate(treatment.therapy_start_date) : '-' }}</div>
          </div>
          <div class="data-field">
            <div class="field-label">TIPE TB</div>
            <div class="field-value">{{ treatment?.regimen === 'mdr' ? 'TB RO (MDR)' : 'TB Paru SO' }}</div>
          </div>
          <div class="data-field">
            <div class="field-label">KATEGORI / REJIMEN</div>
            <div class="field-value">{{ treatment?.regimen || 'Kategori 1' }}</div>
          </div>
          <div class="data-field">
            <div class="field-label">FASE TERAPI</div>
            <div class="field-value">{{ treatment?.phase || 'Fase Intensif' }}</div>
          </div>
        </div>
      </div>

      <!-- 2. Three Info Cards Row -->
      <div class="grid-3">
        <!-- Identitas Lengkap -->
        <div class="card info-card">
          <div class="card-header">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h3>Identitas Lengkap</h3>
          </div>
          <div class="card-body">
            <div class="key-value">
              <span class="key">No. Rekam Medis</span>
              <span class="value font-semibold text-primary">{{ patient.medical_record_number }}</span>
            </div>
            <div class="key-value">
              <span class="key">Alamat Lengkap</span>
              <span class="value">{{ patient.address || '-' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Nomor Telepon</span>
              <span class="value">{{ patient.phone || '-' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Tanggal Lahir</span>
              <span class="value">{{ formatDate(patient.birth_date) }}</span>
            </div>
            <div class="key-value">
              <span class="key">Pekerjaan</span>
              <span class="value">{{ patient.occupation || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Informasi Medis -->
        <div class="card info-card">
          <div class="card-header">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <h3>Informasi Medis</h3>
          </div>
          <div class="card-body">
            <div class="key-value">
              <span class="key">Fase Terapi</span>
              <span class="value text-primary font-semibold">{{ treatment?.phase || 'Fase Intensif' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Tanggal Diagnosis</span>
              <span class="value">{{ treatment ? formatDate(treatment.diagnosis_date) : '-' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Target Selesai</span>
              <span class="value">{{ treatment ? formatDate(treatment.therapy_end_date) : '-' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Dokter Penanggungjawab</span>
              <span class="value">{{ treatment?.doctor_name || 'dr. Siti Rahmawati, Sp.P' }}</span>
            </div>
            <div class="key-value">
              <span class="key">Catatan Klinis</span>
              <span class="value">{{ patient.clinical_note || 'Toleransi terapi OAT baik.' }}</span>
            </div>
          </div>
        </div>

        <!-- Pendampingan -->
        <div class="card info-card">
          <div class="card-header">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <h3>Pendampingan PMO</h3>
          </div>
          <div class="card-body">
            <div class="person-card">
              <div class="person-info">
                <div class="avatar-small">P</div>
                <div>
                  <div class="person-name">{{ patient.pmo_name || 'PMO Belum Diisi' }}</div>
                  <div class="person-role">Pengawas Minum Obat</div>
                  <div class="text-xs text-secondary mt-0.5">{{ patient.pmo_phone || 'Tidak ada no. telp' }}</div>
                </div>
              </div>
              <button class="btn-icon-small" v-if="patient.pmo_phone" @click="window.open('tel:' + patient.pmo_phone)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Middle Row -->
      <div class="grid-layout-65-35">
        <!-- Logistik OAT -->
        <div class="card">
          <div class="card-header space-between">
            <div class="d-flex align-center">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3>Riwayat Pengambilan Logistik OAT</h3>
            </div>
            <RouterLink to="/dashboard/refill-requests" class="link-primary">Lihat Semua Refill</RouterLink>
          </div>
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>TANGGAL PENGAJUAN</th>
                  <th>JUMLAH</th>
                  <th>ALASAN</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="refills.length === 0">
                  <td colspan="4" class="text-center py-6 text-muted">Belum ada riwayat permohonan refill obat.</td>
                </tr>
                <tr v-for="refill in refills" :key="refill.id">
                  <td>{{ formatDate(refill.created_at) }}</td>
                  <td>{{ refill.quantity }} Paket / Tablet</td>
                  <td>{{ refill.reason || 'Rutin' }}</td>
                  <td>
                    <span class="badge" :class="refill.status === 'approved' ? 'badge-success' : refill.status === 'rejected' ? 'badge-danger' : 'badge-warning'">
                      {{ refill.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Jadwal Kontrol Dokter -->
        <div class="card schedule-card">
          <div class="schedule-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Jadwal Kontrol Berikutnya</span>
          </div>
          <div v-if="nextControl">
            <div class="schedule-date">{{ formatDate(nextControl.control_date) }}</div>
            <div class="schedule-location">Pukul {{ nextControl.control_time || '09:00' }} WIB • Poli TB Paru</div>
            
            <div class="doctor-info">
              <div class="avatar-small">DR</div>
              <div class="doctor-details">
                <div class="doctor-name">{{ treatment?.doctor_name || 'dr. Spesialis Paru' }}</div>
                <div class="doctor-spec">{{ nextControl.doctor_note || 'Pemeriksaan rutin berkala' }}</div>
              </div>
            </div>
          </div>
          <div v-else class="py-6 text-center text-muted">
            <p>Tidak ada jadwal kontrol terdekat.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./PatientDetailView.js"></script>

<style scoped src="./PatientDetailView.css"></style>

