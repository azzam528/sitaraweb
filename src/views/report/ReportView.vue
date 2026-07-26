<script setup>
import { ref } from 'vue'

const printReport = () => {
  window.print()
}

const currentMonth = ref('Oktober 2024')
const facilityName = ref('Puskesmas Sukajadi')

const reportData = ref([
  { id: 'TB-2023-089', name: 'Bpk. Ahmad Subarjo', type: 'TB Paru SO', startDate: '12 Jan 2024', status: 'Selesai (Sembuh)', compliance: '98%' },
  { id: 'TB-2023-112', name: 'Ratna Sari', type: 'TB Paru SO', startDate: '05 Feb 2024', status: 'Aktif Pengobatan', compliance: '95%' },
  { id: 'TB-2023-045', name: 'Dedi Kurniawan', type: 'TB Ekstra Paru', startDate: '20 Mar 2024', status: 'Aktif Pengobatan', compliance: '88%' },
  { id: 'TB-2023-156', name: 'Ahmad Faisal', type: 'Anak', startDate: '15 Apr 2024', status: 'Putus Berobat', compliance: '45%' },
  { id: 'TB-2023-201', name: 'Siti Aminah', type: 'TB Paru RO', startDate: '01 Mei 2024', status: 'Aktif Pengobatan', compliance: '92%' }
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
              <option value="Oktober 2024">Oktober 2024</option>
              <option value="September 2024">September 2024</option>
              <option value="Agustus 2024">Agustus 2024</option>
            </select>
          </div>
          <div class="form-group">
            <label>Fasilitas Kesehatan</label>
            <select class="form-select" v-model="facilityName">
              <option value="Puskesmas Sukajadi">Puskesmas Sukajadi</option>
              <option value="RSUD Kota Bandung">RSUD Kota Bandung</option>
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

      <!-- Report Summary -->
      <div class="report-summary">
        <div class="summary-box">
          <span class="summary-label">Total Pasien Aktif</span>
          <span class="summary-value">45</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Pasien Sembuh (Bulan Ini)</span>
          <span class="summary-value text-success">8</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Pasien Putus Obat</span>
          <span class="summary-value text-danger">2</span>
        </div>
        <div class="summary-box">
          <span class="summary-label">Rata-rata Kepatuhan</span>
          <span class="summary-value text-primary">92%</span>
        </div>
      </div>

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
          <p>Bandung, 31 Oktober 2024</p>
          <p class="role">Petugas Program TB</p>
          <div class="signature-space"></div>
          <p class="name">Ns. Siti Fatimah, S.Kep</p>
          <p class="nip">NIP. 19850212 201001 2 003</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.report-view {
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #64748b;
  margin: 0;
  font-size: 0.875rem;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 24px;
}

.filter-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-group {
  display: flex;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.form-select {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  min-width: 200px;
  background-color: white;
}

.form-select:focus {
  outline: none;
  border-color: #006591;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #006591;
  color: white;
}

.btn-primary:hover {
  background-color: #004d70;
}

/* Printable Report Styles */
.printable-report {
  padding: 40px;
}

.report-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.report-title-section h2 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 4px 0;
  color: #0f172a;
  letter-spacing: 0.5px;
}

.report-title-section h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #334155;
}

.report-title-section p {
  font-size: 0.875rem;
  margin: 0;
  color: #475569;
}

.report-divider {
  border: none;
  border-top: 2px solid #006591;
  margin-bottom: 24px;
}

.report-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.summary-box {
  padding: 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  text-align: center;
}

.summary-label {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}

.summary-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.text-success { color: #16a34a; }
.text-danger { color: #dc2626; }
.text-primary { color: #006591; }

.report-table-container {
  margin-bottom: 40px;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th, .report-table td {
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  text-align: left;
  font-size: 0.875rem;
}

.report-table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #334155;
}

.fw-600 {
  font-weight: 600;
}

.report-signatures {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
}

.signature-box {
  text-align: center;
  width: 250px;
}

.signature-box p {
  margin: 0 0 4px 0;
  font-size: 0.875rem;
}

.signature-box .role {
  font-weight: 600;
}

.signature-space {
  height: 80px; /* Space for signature */
}

.signature-box .name {
  font-weight: 700;
  text-decoration: underline;
}

.signature-box .nip {
  font-size: 0.75rem;
  color: #475569;
}

/* 
  Print CSS Media Query
  This section controls how the page looks when printed (CTRL+P)
*/
@media print {
  /* Hide all non-printable elements */
  .no-print {
    display: none !important;
  }
  
  /* Reset background and padding for the page */
  body, .report-view {
    background-color: white !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* Force the printable card to act as the full page */
  .printable-report {
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  /* Ensure colors and backgrounds print correctly */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* You may need to hide the global sidebar and navbar if they are outside this component.
     Since Vue scoped CSS won't affect global elements easily, 
     it's usually better to put a global print CSS in index.css. 
     But we can try doing it by targeting the global classes if they are not scoped. */
  :deep(.sidebar), :deep(.navbar) {
    display: none !important;
  }
}
</style>
