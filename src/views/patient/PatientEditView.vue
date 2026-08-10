<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const patientData = ref({
  id: 'TB-2026-089',
  nik: '3273619263040005',
  bpjs: '0001234567890',
  name: 'Bpk. Ahmad Subarjo',
  dob: '1960-05-15',
  gender: 'L',
  phone: '0812-3456-7890',
  job: 'Pensiunan',
  address: 'Jl. Sukajadi No. 12, Sukajadi, Kota Bandung, Jawa Barat 40162',
  
  tbType: 'TB Paru SO',
  category: 'Kategori 1',
  regimen: '2RHZE/4RH',
  startDate: '2026-01-12',
  status: 'active',
  
  faskes: 'Puskesmas Sukajadi',
  doctor: 'dr. Heru Prasetyo',
  pmoName: 'Surya',
  pmoRelation: 'Anak',
  pmoPhone: '0812-9876-5432',
  kader: 'Agus Salim'
})

const savePatient = () => {
  // Mock save
  router.push('/dashboard/patients/1')
}

const cancelEdit = () => {
  router.push('/dashboard/patients/1')
}
</script>

<template>
  <div class="patient-edit-page">
    <div class="header-nav">
      <button @click="cancelEdit" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Batal & Kembali
      </button>
    </div>

    <div class="page-header">
      <h1 class="page-title">Edit Data Pasien</h1>
      <p class="subtitle">Perbarui informasi personal, medis, dan tim kesehatan pasien.</p>
    </div>

    <form @submit.prevent="savePatient" class="edit-form">
      <div class="grid-layout">
        <!-- Kolom Kiri -->
        <div class="left-col">
          <div class="card form-card">
            <h3 class="card-title">Identitas Lengkap</h3>
            
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input type="text" v-model="patientData.name" class="form-control" required>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>NIK</label>
                <input type="text" v-model="patientData.nik" class="form-control" required>
              </div>
              <div class="form-group half">
                <label>No. BPJS</label>
                <input type="text" v-model="patientData.bpjs" class="form-control">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Tanggal Lahir</label>
                <input type="date" v-model="patientData.dob" class="form-control">
              </div>
              <div class="form-group half">
                <label>Jenis Kelamin</label>
                <select v-model="patientData.gender" class="form-select">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Nomor Telepon</label>
                <input type="tel" v-model="patientData.phone" class="form-control">
              </div>
              <div class="form-group half">
                <label>Pekerjaan</label>
                <input type="text" v-model="patientData.job" class="form-control">
              </div>
            </div>

            <div class="form-group">
              <label>Alamat Lengkap</label>
              <textarea v-model="patientData.address" class="form-control" rows="3"></textarea>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan -->
        <div class="right-col">
          <div class="card form-card">
            <h3 class="card-title">Informasi Medis</h3>
            
            <div class="form-row">
              <div class="form-group half">
                <label>Tipe TB</label>
                <select v-model="patientData.tbType" class="form-select">
                  <option value="TB Paru SO">TB Paru SO</option>
                  <option value="TB Paru RO">TB Paru RO</option>
                  <option value="TB Ekstra Paru">TB Ekstra Paru</option>
                </select>
              </div>
              <div class="form-group half">
                <label>Kategori</label>
                <select v-model="patientData.category" class="form-select">
                  <option value="Kategori 1">Kategori 1</option>
                  <option value="Kategori 2">Kategori 2</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Resimen Pengobatan</label>
                <input type="text" v-model="patientData.regimen" class="form-control">
              </div>
              <div class="form-group half">
                <label>Tanggal Mulai</label>
                <input type="date" v-model="patientData.startDate" class="form-control">
              </div>
            </div>
            
            <div class="form-group">
              <label>Status Pengobatan</label>
              <select v-model="patientData.status" class="form-select status-select">
                <option value="active">Aktif Pengobatan</option>
                <option value="completed">Selesai (Sembuh)</option>
                <option value="dropout">Putus Berobat</option>
                <option value="transferred">Pindah Faskes</option>
              </select>
            </div>
          </div>

          <div class="card form-card">
            <h3 class="card-title">Tim Kesehatan & PMO</h3>
            
            <div class="form-row">
              <div class="form-group half">
                <label>Dokter Penanggung Jawab</label>
                <input type="text" v-model="patientData.doctor" class="form-control">
              </div>
              <div class="form-group half">
                <label>Kader Pendamping</label>
                <input type="text" v-model="patientData.kader" class="form-control">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Nama PMO</label>
                <input type="text" v-model="patientData.pmoName" class="form-control">
              </div>
              <div class="form-group half">
                <label>Hubungan PMO</label>
                <input type="text" v-model="patientData.pmoRelation" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label>Kontak PMO</label>
              <input type="tel" v-model="patientData.pmoPhone" class="form-control">
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="form-actions">
        <button type="button" @click="cancelEdit" class="btn btn-outline btn-lg">Batal</button>
        <button type="submit" class="btn btn-primary btn-lg">Simpan Perubahan</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.patient-edit-page {
  padding: 24px;
  background-color: #F8FAFC;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.header-nav {
  margin-bottom: 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.back-link:hover {
  color: #006591;
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

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 24px;
}

.card:last-child {
  margin-bottom: 0;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #0f172a;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group.half {
  flex: 1;
  margin-bottom: 0;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.form-control, .form-select {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s;
  background-color: white;
  color: #1e293b;
  width: 100%;
  box-sizing: border-box;
}

textarea.form-control {
  resize: vertical;
}

.form-control:focus, .form-select:focus {
  outline: none;
  border-color: #006591;
  box-shadow: 0 0 0 2px rgba(0, 101, 145, 0.1);
}

.status-select {
  font-weight: 600;
  color: #006591;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.btn-lg {
  padding: 12px 24px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #006591;
  color: white;
}

.btn-primary:hover {
  background-color: #005378;
}

.btn-outline {
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;
}

.btn-outline:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
</style>
