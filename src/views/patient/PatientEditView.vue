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

<style scoped src="./PatientEditView.css"></style>
