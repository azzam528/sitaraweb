<template>
  <div class="patient-detail-page">
    <div class="header-nav">
      <RouterLink to="/dashboard/patients" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Kembali ke Daftar Pasien
      </RouterLink>
    </div>

    <!-- 1. Patient Profile Header -->
    <div class="card profile-header">
      <div class="profile-top">
        <div class="profile-left">
          <div class="avatar-large">
            <span class="initials">AS</span>
          </div>
          <div class="profile-info">
            <div class="name-row">
              <h2>Bpk. Ahmad Subarjo</h2>
              <span class="badge badge-success">Aktif Pengobatan</span>
            </div>
            <div class="meta-row">
              <span>NIK: 3273619263040005</span>
              <span class="dot">•</span>
              <span>64 Tahun</span>
              <span class="dot">•</span>
              <span>Laki-laki</span>
              <span class="dot">•</span>
              <span>Kota Bandung</span>
            </div>
          </div>
        </div>
        <div class="profile-actions">
          <RouterLink to="/dashboard/patients/1/edit" class="btn btn-outline">Edit Data Pasien</RouterLink>
          <button class="btn btn-filled">Hubungi Pasien</button>
          <button class="btn btn-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
          </button>
        </div>
      </div>
      <div class="profile-bottom">
        <div class="data-field">
          <div class="field-label">TANGGAL MULAI</div>
          <div class="field-value text-primary">12 Jan 2026</div>
        </div>
        <div class="data-field">
          <div class="field-label">TIPE TB</div>
          <div class="field-value">TB Paru SO</div>
        </div>
        <div class="data-field">
          <div class="field-label">KATEGORI</div>
          <div class="field-value">Kategori 1</div>
        </div>
        <div class="data-field">
          <div class="field-label">RESIMEN</div>
          <div class="field-value">2RHZE/4RH</div>
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
            <span class="key">Alamat Lengkap</span>
            <span class="value">Jl. Sukajadi No. 12, Sukajadi, Kota Bandung, Jawa Barat 40162</span>
          </div>
          <div class="key-value">
            <span class="key">Nomor Telepon</span>
            <span class="value">0812-3456-7890</span>
          </div>
          <div class="key-value">
            <span class="key">Tanggal Lahir</span>
            <span class="value">15 Mei 1960</span>
          </div>
          <div class="key-value">
            <span class="key">Pekerjaan</span>
            <span class="value">Pensiunan</span>
          </div>
          <div class="key-value">
            <span class="key">No. BPJS</span>
            <span class="value">0001234567890</span>
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
            <span class="key">Fase</span>
            <span class="value text-primary font-semibold">Fase Lanjutan</span>
          </div>
          <div class="key-value">
            <span class="key">Tanggal Diagnosis</span>
            <span class="value">02 Jan 2026</span>
          </div>
          <div class="key-value">
            <span class="key">Mulai Terapi</span>
            <span class="value">12 Jan 2026</span>
          </div>
          <div class="key-value">
            <span class="key">Pemeriksaan Awal</span>
            <span class="value"><span class="badge badge-danger">BTA (+)</span></span>
          </div>
          <div class="key-value">
            <span class="key">Komorbiditas</span>
            <span class="value">Diabetes Melitus</span>
          </div>
        </div>
      </div>

      <!-- Pendampingan -->
      <div class="card info-card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3>Pendampingan</h3>
        </div>
        <div class="card-body">
          <div class="person-card">
            <div class="person-info">
              <div class="avatar-small">S</div>
              <div>
                <div class="person-name">Surya</div>
                <div class="person-role">PMO / Istri</div>
              </div>
            </div>
            <button class="btn-icon-small">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </button>
          </div>
          <div class="person-card">
            <div class="person-info">
              <div class="avatar-small bg-blue">AS</div>
              <div>
                <div class="person-name">Agus Salim</div>
                <div class="person-role">Kader</div>
              </div>
            </div>
            <button class="btn-icon-small">
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
            <h3>Logistik OAT (Obat Anti Tuberkulosis)</h3>
          </div>
          <a href="#" class="link-primary">Lihat Semua Riwayat</a>
        </div>
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>TANGGAL AMBIL</th>
                <th>JENIS OAT</th>
                <th>JUMLAH</th>
                <th>PETUGAS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>19 Jul 2026</td>
                <td>Kategori 1 4FDC</td>
                <td>28 Tab</td>
                <td>Ns. Hendra</td>
                <td><span class="badge badge-success">Sudah Diambil</span></td>
              </tr>
              <tr>
                <td>13 Jun 2026</td>
                <td>Kategori 1 4FDC</td>
                <td>28 Tab</td>
                <td>Ns. Siti</td>
                <td><span class="badge badge-success">Sudah Diambil</span></td>
              </tr>
              <tr>
                <td>14 Mei 2026</td>
                <td>Kategori 1 4FDC</td>
                <td>28 Tab</td>
                <td>Ns. Hendra</td>
                <td><span class="badge badge-success">Sudah Diambil</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Garis Waktu Pengobatan -->
      <div class="card">
        <div class="card-header">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <h3>Garis Waktu Pengobatan</h3>
        </div>
        <div class="card-body">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot dot-primary"></div>
              <div class="timeline-content">
                <div class="timeline-date">12 Jan 2026</div>
                <div class="timeline-title">Mulai Terapi (OAT)</div>
                <div class="timeline-desc">Fase Intensif Dimulai</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot dot-primary"></div>
              <div class="timeline-content">
                <div class="timeline-date">12 Mar 2026</div>
                <div class="timeline-title">Perubahan Fase</div>
                <div class="timeline-desc">Masuk Fase Lanjutan</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot dot-success"></div>
              <div class="timeline-content">
                <div class="timeline-date">10 Jul 2026</div>
                <div class="timeline-title">Pemeriksaan Lab Terakhir</div>
                <div class="timeline-desc"><span class="badge badge-success-outline">Tes Sputum - Negatif</span></div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot dot-gray"></div>
              <div class="timeline-content">
                <div class="timeline-date">15 Agu 2026</div>
                <div class="timeline-title text-muted">Jadwal Kontrol Berikutnya</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Bottom Row -->
    <div class="grid-layout-65-35">
      <!-- Catatan Klinis & Administrasi -->
      <div class="card">
        <div class="card-header space-between">
          <h3>Catatan Klinis & Administrasi</h3>
          <button class="btn btn-filled-small">+ Tambah Catatan</button>
        </div>
        <div class="card-body p-0">
          <div class="note-list">
            <div class="note-item">
              <div class="note-avatar bg-blue-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <div class="note-content-wrapper">
                <div class="note-header">
                  <span class="note-author">Dr. Heru Prasetyo</span>
                  <span class="note-time">10 Jul 2026, 09:30</span>
                </div>
                <div class="note-text">
                  Hasil BTA negatif (follow up bulan ke-3). Kondisi pasien stabil, keluhan batuk sudah berkurang signifikan. Lanjutkan OAT fase lanjutan.
                </div>
              </div>
            </div>
            <div class="note-item">
              <div class="note-avatar bg-green-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div class="note-content-wrapper">
                <div class="note-header">
                  <span class="note-author">Ns. Hendra</span>
                  <span class="note-time">12 Jun 2026, 14:15</span>
                </div>
                <div class="note-text">
                  Pasien datang mengambil obat tepat waktu. Berat badan naik 1.5kg dari bulan sebelumnya. Edukasi PMO terkait kepatuhan tetap dilakukan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Jadwal Kontrol Berikutnya -->
      <div class="card schedule-card">
        <div class="schedule-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Jadwal Kontrol Berikutnya</span>
        </div>
        <div class="schedule-date">15 Agu 2026</div>
        <div class="schedule-location">Pukul 09:00 WIB • Poli TB (Lantai 2)</div>
        
        <div class="doctor-info">
          <div class="avatar-small">HP</div>
          <div class="doctor-details">
            <div class="doctor-name">Dr. Heru Prasetyo</div>
            <div class="doctor-spec">Dokter Spesialis Paru</div>
          </div>
        </div>

        <div class="schedule-actions">
          <button class="btn btn-white">Jadwal Ulang</button>
          <button class="btn-icon-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
// Optional: Use route.params.id if you need to fetch real data
// const patientId = route.params.id
</script>

<style scoped src="./PatientDetailView.css"></style>
