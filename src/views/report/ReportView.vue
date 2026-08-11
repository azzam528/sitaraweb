<script setup>
import { ref } from 'vue'

const printReport = () => {
  window.print()
}

const currentMonth = ref('Juli 2026')
const facilityName = ref('Puskesmas Sukajadi')

const reportData = ref([
  { id: 'TB-2026-089', name: 'Bpk. Ahmad Subarjo', type: 'TB Paru SO', startDate: '12 Jan 2026', status: 'Selesai (Sembuh)', compliance: '98%' },
  { id: 'TB-2026-112', name: 'Ratna Sari', type: 'TB Paru SO', startDate: '05 Feb 2026', status: 'Aktif Pengobatan', compliance: '95%' },
  { id: 'TB-2026-045', name: 'Dedi Kurniawan', type: 'TB Ekstra Paru', startDate: '20 Mar 2026', status: 'Aktif Pengobatan', compliance: '88%' },
  { id: 'TB-2026-156', name: 'Ahmad Faisal', type: 'Anak', startDate: '15 Apr 2026', status: 'Putus Berobat', compliance: '45%' },
  { id: 'TB-2026-201', name: 'Siti Ayu', type: 'TB Paru RO', startDate: '01 Mei 2026', status: 'Aktif Pengobatan', compliance: '92%' }
])
</script>

<template>
  <div class="report-view">
    
    <!-- Non-Printable Header and Filters -->
    <div class="no-print">
      <div class="page-header">
        <h1 class="page-title">Laporan Evaluasi TB</h1>
        <p class="subtitle">Buat dan cetak laporan rekapitulasi pasien TB.</p>
      </div>

      <div class="filter-card card">
        <div class="filter-group">
          <div class="form-group">
            <label>Periode Laporan</label>
            <select class="form-select" v-model="currentMonth">
              <option value="Juli 2026">Juli 2026</option>
              <option value="Juni 2026">Juni 2026</option>
              <option value="Mei 2026">Mei 2026</option>
            </select>
          </div>
        </div>
        <div class="action-group">
          <button @click="printReport" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Cetak Laporan (Print)
          </button>
        </div>
      </div>
    </div>

    <!-- Printable Report Section -->
    <div class="printable-report card">
      
      <!-- Report Header -->
      <div class="report-header">
        <div class="report-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#006591" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        </div>
        <div class="report-title-section">
          <h2>REKAPITULASI EVALUASI PASIEN TUBERKULOSIS</h2>
          <h3>{{ facilityName }}</h3>
          <p>Periode: {{ currentMonth }}</p>
        </div>
      </div>

      <hr class="report-divider" />

      <!-- Report Table -->
      <div class="report-table-container">
        <table class="report-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID Pasien</th>
              <th>Nama Pasien</th>
              <th>Tipe TB</th>
              <th>Tanggal Mulai</th>
              <th>Tingkat Kepatuhan</th>
              <th>Status Akhir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(patient, index) in reportData" :key="patient.id">
              <td>{{ index + 1 }}</td>
              <td>{{ patient.id }}</td>
              <td class="fw-600">{{ patient.name }}</td>
              <td>{{ patient.type }}</td>
              <td>{{ patient.startDate }}</td>
              <td>{{ patient.compliance }}</td>
              <td>{{ patient.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Signatures -->
      <div class="report-signatures">
        <div class="signature-box">
          <p>Mengetahui,</p>
          <p class="role">Kepala Puskesmas</p>
          <div class="signature-space"></div>
          <p class="name">dr. H. Wahyudi, Sp.PD</p>
          <p class="nip">NIP. 19700101 199903 1 002</p>
        </div>
        <div class="signature-box">
          <p>Bandung, 31 Juli 2026</p>
          <p class="role">Petugas Program TB</p>
          <div class="signature-space"></div>
          <p class="name">Ns. Siti Fatimah, S.Kep</p>
          <p class="nip">NIP. 19850212 201001 2 003</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped src="./ReportView.css"></style>
