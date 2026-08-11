<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  nik: '',
  bpjs: '',
  name: '',
  dob: '',
  gender: 'L',
  phone: '',
  job: '',
  address: '',
  
  tbType: 'TB Paru SO',
  category: 'Kategori 1',
  regimen: '',
  startDate: '',
  
  faskes: 'Puskesmas Sukajadi',
  doctor: '',
  pmoName: '',
  pmoRelation: '',
  pmoPhone: '',
  kader: ''
})

const createAccount = ref(true)
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

const savePatient = () => {
  isSubmitting.value = true
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    showSuccessModal.value = true
  }, 1000)
}

const finishAndRedirect = () => {
  showSuccessModal.value = false
  router.push('/dashboard/patients')
}

const cancelAdd = () => {
  router.push('/dashboard/patients')
}
</script>

<template>
  <div class="patient-add-page">
    <div class="header-nav">
      <button @click="cancelAdd" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Batal & Kembali
      </button>
    </div>

    <div class="page-header">
      <h1 class="page-title">Tambah Pasien Baru</h1>
      <p class="subtitle">Daftarkan pasien TB baru dan buatkan akun aplikasinya agar bisa memantau pengobatan.</p>
    </div>

    <form @submit.prevent="savePatient" class="add-form">
      
      <!-- Konfigurasi Akun -->
      <div class="card form-card account-card">
        <div class="account-header">
          <div class="account-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div class="account-text">
            <h3>Buat Akun & Kirim via WhatsApp</h3>
            <p>Sistem akan otomatis membuatkan username dan password untuk pasien. Kredensial akan dikirim melalui pesan WhatsApp ke nomor telepon pasien.</p>
          </div>
          <div class="account-toggle">
            <label class="switch">
              <input type="checkbox" v-model="createAccount">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="grid-layout">
        <!-- Kolom Kiri -->
        <div class="left-col">
          <div class="card form-card">
            <h3 class="card-title">Identitas Lengkap</h3>
            
            <div class="form-group">
              <label>Nama Lengkap <span class="required">*</span></label>
              <input type="text" v-model="formData.name" class="form-control" placeholder="Contoh: Budi Santoso" required>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>NIK <span class="required">*</span></label>
                <input type="text" v-model="formData.nik" class="form-control" placeholder="16 Digit NIK" required>
              </div>
              <div class="form-group half">
                <label>No. BPJS</label>
                <input type="text" v-model="formData.bpjs" class="form-control" placeholder="Opsional">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Tanggal Lahir <span class="required">*</span></label>
                <input type="date" v-model="formData.dob" class="form-control" required>
              </div>
              <div class="form-group half">
                <label>Jenis Kelamin</label>
                <select v-model="formData.gender" class="form-select">
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Nomor Telepon (WhatsApp) <span class="required" v-if="createAccount">*</span></label>
                <input type="tel" v-model="formData.phone" class="form-control" placeholder="Contoh: 081234567890" :required="createAccount">
                <small v-if="createAccount" class="text-primary mt-1 d-block">Nomor ini akan menerima kredensial akun.</small>
              </div>
              <div class="form-group half">
                <label>Pekerjaan</label>
                <input type="text" v-model="formData.job" class="form-control" placeholder="Pekerjaan">
              </div>
            </div>

            <div class="form-group">
              <label>Alamat Lengkap <span class="required">*</span></label>
              <textarea v-model="formData.address" class="form-control" rows="3" required></textarea>
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
                <select v-model="formData.tbType" class="form-select">
                  <option value="TB Paru SO">TB Paru SO</option>
                  <option value="TB Paru RO">TB Paru RO</option>
                  <option value="TB Ekstra Paru">TB Ekstra Paru</option>
                </select>
              </div>
              <div class="form-group half">
                <label>Kategori</label>
                <select v-model="formData.category" class="form-select">
                  <option value="Kategori 1">Kategori 1</option>
                  <option value="Kategori 2">Kategori 2</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Resimen Pengobatan</label>
                <input type="text" v-model="formData.regimen" class="form-control" placeholder="Contoh: 2RHZE/4RH">
              </div>
              <div class="form-group half">
                <label>Tanggal Mulai <span class="required">*</span></label>
                <input type="date" v-model="formData.startDate" class="form-control" required>
              </div>
            </div>
          </div>

          <div class="card form-card">
            <h3 class="card-title">Tim Kesehatan & PMO</h3>
            
            <div class="form-row">
              <div class="form-group half">
                <label>Dokter Penanggung Jawab</label>
                <input type="text" v-model="formData.doctor" class="form-control" placeholder="Nama Dokter">
              </div>
              <div class="form-group half">
                <label>Kader Pendamping</label>
                <input type="text" v-model="formData.kader" class="form-control" placeholder="Nama Kader">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Nama PMO</label>
                <input type="text" v-model="formData.pmoName" class="form-control" placeholder="Nama PMO">
              </div>
              <div class="form-group half">
                <label>Hubungan PMO</label>
                <input type="text" v-model="formData.pmoRelation" class="form-control" placeholder="Cth: Suami/Istri/Anak">
              </div>
            </div>
            <div class="form-group">
              <label>Kontak PMO</label>
              <input type="tel" v-model="formData.pmoPhone" class="form-control" placeholder="Nomor Telepon PMO">
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="form-actions">
        <button type="button" @click="cancelAdd" class="btn btn-outline btn-lg" :disabled="isSubmitting">Batal</button>
        <button type="submit" class="btn btn-primary btn-lg" :disabled="isSubmitting">
          <span v-if="isSubmitting">Menyimpan...</span>
          <span v-else>
            {{ createAccount ? 'Simpan & Kirim Kredensial' : 'Simpan Data Pasien' }}
          </span>
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div class="modal-overlay" v-if="showSuccessModal">
      <div class="modal-content">
        <div class="modal-icon success">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h2>Pendaftaran Berhasil!</h2>
        <p>Data pasien <strong>{{ formData.name }}</strong> telah berhasil ditambahkan ke dalam sistem.</p>
        
        <div v-if="createAccount" class="whatsapp-success">
          <div class="wa-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div>
            <h4>Kredensial WhatsApp Terkirim</h4>
            <p>Pesan otomatis berisi username dan password telah dikirimkan ke nomor <strong>{{ formData.phone }}</strong>.</p>
          </div>
        </div>

        <button class="btn btn-primary btn-block" @click="finishAndRedirect">Kembali ke Daftar Pasien</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PatientAddView.css"></style>
