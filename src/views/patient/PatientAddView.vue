<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import patientService from '../../services/patient.service'

const router = useRouter()

// =====================================================
// FORM DATA
// =====================================================

const formData = ref({
  medicalRecordNumber: '',
  name: '',
  nik: '',
  dob: '',
  gender: 'male',
  phone: '',
  address: '',
  job: '',
  pmoName: '',
  pmoPhone: '',
  clinicalNote: ''
})

// =====================================================
// STATE
// =====================================================

const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const errorMessage = ref('')

const createdCredentials = ref({
  username: '',
  password: ''
})

// =====================================================
// VALIDATION
// =====================================================

const validateForm = () => {
  errorMessage.value = ''

  if (!formData.value.medicalRecordNumber.trim()) {
    errorMessage.value = 'Nomor rekam medis wajib diisi.'
    return false
  }

  if (!formData.value.name.trim()) {
    errorMessage.value = 'Nama lengkap wajib diisi.'
    return false
  }

  if (!/^\d{16}$/.test(formData.value.nik.trim())) {
    errorMessage.value = 'NIK harus terdiri dari 16 digit.'
    return false
  }

  if (!formData.value.dob) {
    errorMessage.value = 'Tanggal lahir wajib diisi.'
    return false
  }

  if (!formData.value.gender) {
    errorMessage.value = 'Jenis kelamin wajib dipilih.'
    return false
  }

  if (!formData.value.phone.trim()) {
    errorMessage.value = 'Nomor telepon wajib diisi.'
    return false
  }

  if (!formData.value.address.trim()) {
    errorMessage.value = 'Alamat wajib diisi.'
    return false
  }

  if (!formData.value.job.trim()) {
    errorMessage.value = 'Pekerjaan wajib diisi.'
    return false
  }

  if (!formData.value.pmoName.trim()) {
    errorMessage.value = 'Nama PMO wajib diisi.'
    return false
  }

  if (!formData.value.pmoPhone.trim()) {
    errorMessage.value = 'Nomor telepon PMO wajib diisi.'
    return false
  }

  return true
}

// =====================================================
// SAVE PATIENT
// =====================================================

const savePatient = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const payload = {
      medical_record_number:
        formData.value.medicalRecordNumber.trim(),

      full_name:
        formData.value.name.trim(),

      nik:
        formData.value.nik.trim(),

      birth_date:
        formData.value.dob,

      gender:
        formData.value.gender,

      phone:
        formData.value.phone.trim(),

      address:
        formData.value.address.trim(),

      occupation:
        formData.value.job.trim(),

      pmo_name:
        formData.value.pmoName.trim(),

      pmo_phone:
        formData.value.pmoPhone.trim(),

      clinical_note:
        formData.value.clinicalNote.trim() || null
    }

    console.log('POST /patients:', payload)

    const response = await patientService.createPatient(payload)

    console.log('Patient created:', response.data)

    // Credential dibuat oleh BACKEND
    createdCredentials.value = {
      username: response.data.username,
      password: response.data.temporary_password
    }

    showSuccessModal.value = true

  } catch (error) {
    console.error('Create patient failed:', error)

    const detail = error?.response?.data?.detail

    if (Array.isArray(detail)) {
      errorMessage.value = detail
        .map(item => item.msg)
        .join(', ')
    } else {
      errorMessage.value =
        detail || 'Gagal menambahkan pasien.'
    }

  } finally {
    isSubmitting.value = false
  }
}

// =====================================================
// CANCEL
// =====================================================

const cancelAdd = () => {
  if (isSubmitting.value) {
    return
  }

  router.push('/dashboard/patients')
}

// =====================================================
// FINISH
// =====================================================

const finishAndRedirect = () => {
  showSuccessModal.value = false

  router.push('/dashboard/patients')
}
</script>


<template>
  <div class="patient-add-page">

    <!-- ================================================= -->
    <!-- HEADER -->
    <!-- ================================================= -->

    <div class="header-nav">
      <button
        type="button"
        class="back-link"
        @click="cancelAdd"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line
            x1="19"
            y1="12"
            x2="5"
            y2="12"
          />
          <polyline
            points="12 19 5 12 12 5"
          />
        </svg>

        Batal & Kembali
      </button>
    </div>


    <!-- ================================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================================= -->

    <div class="page-header">
      <h1 class="page-title">
        Tambah Pasien Baru
      </h1>

      <p class="subtitle">
        Daftarkan pasien TB baru dan buatkan
        akun aplikasinya untuk pemantauan
        pengobatan.
      </p>
    </div>


    <!-- ================================================= -->
    <!-- ERROR -->
    <!-- ================================================= -->

    <div
      v-if="errorMessage"
      class="error-alert"
    >
      <strong>Gagal:</strong>
      {{ errorMessage }}
    </div>


    <!-- ================================================= -->
    <!-- FORM -->
    <!-- ================================================= -->

    <form
      class="add-form"
      @submit.prevent="savePatient"
    >

      <div class="grid-layout">

        <!-- ============================================= -->
        <!-- LEFT COLUMN -->
        <!-- ============================================= -->

        <div class="left-col">

          <!-- =========================================== -->
          <!-- IDENTITAS -->
          <!-- =========================================== -->

          <div class="card form-card">

            <h3 class="card-title">
              Identitas Lengkap
            </h3>


            <!-- Nomor Rekam Medis -->

            <div class="form-group">
              <label>
                Nomor Rekam Medis
                <span class="required">*</span>
              </label>

              <input
                v-model="formData.medicalRecordNumber"
                type="text"
                class="form-control"
                placeholder="Contoh: RM-TB-2026-001"
                maxlength="20"
                required
              />
            </div>


            <!-- Nama -->

            <div class="form-group">
              <label>
                Nama Lengkap
                <span class="required">*</span>
              </label>

              <input
                v-model="formData.name"
                type="text"
                class="form-control"
                placeholder="Contoh: Budi Santoso"
                maxlength="255"
                required
              />
            </div>


            <!-- NIK -->

            <div class="form-group">
              <label>
                NIK
                <span class="required">*</span>
              </label>

              <input
                v-model="formData.nik"
                type="text"
                class="form-control"
                placeholder="16 Digit NIK"
                maxlength="16"
                minlength="16"
                inputmode="numeric"
                required
              />
            </div>


            <!-- Tanggal lahir + Gender -->

            <div class="form-row">

              <div class="form-group half">
                <label>
                  Tanggal Lahir
                  <span class="required">*</span>
                </label>

                <input
                  v-model="formData.dob"
                  type="date"
                  class="form-control"
                  required
                />
              </div>


              <div class="form-group half">
                <label>
                  Jenis Kelamin
                  <span class="required">*</span>
                </label>

                <select
                  v-model="formData.gender"
                  class="form-select"
                  required
                >
                  <option value="male">
                    Laki-laki
                  </option>

                  <option value="female">
                    Perempuan
                  </option>
                </select>
              </div>

            </div>


            <!-- Telepon + Pekerjaan -->

            <div class="form-row">

              <div class="form-group half">
                <label>
                  Nomor Telepon
                  <span class="required">*</span>
                </label>

                <input
                  v-model="formData.phone"
                  type="tel"
                  class="form-control"
                  placeholder="081234567890"
                  maxlength="15"
                  required
                />
              </div>


              <div class="form-group half">
                <label>
                  Pekerjaan
                  <span class="required">*</span>
                </label>

                <input
                  v-model="formData.job"
                  type="text"
                  class="form-control"
                  placeholder="Contoh: Karyawan Swasta"
                  maxlength="100"
                  required
                />
              </div>

            </div>


            <!-- Alamat -->

            <div class="form-group">
              <label>
                Alamat Lengkap
                <span class="required">*</span>
              </label>

              <textarea
                v-model="formData.address"
                class="form-control"
                rows="4"
                placeholder="Alamat lengkap pasien"
                required
              ></textarea>
            </div>


            <!-- Clinical Note -->

            <div class="form-group">
              <label>
                Catatan Klinis
              </label>

              <textarea
                v-model="formData.clinicalNote"
                class="form-control"
                rows="4"
                placeholder="Catatan tambahan mengenai pasien"
              ></textarea>
            </div>

          </div>

        </div>


        <!-- ============================================= -->
        <!-- RIGHT COLUMN -->
        <!-- ============================================= -->

        <div class="right-col">

          <!-- =========================================== -->
          <!-- PMO -->
          <!-- =========================================== -->

          <div class="card form-card">

            <h3 class="card-title">
              Informasi PMO
            </h3>

            <p class="text-muted">
              Pengawas Minum Obat pasien.
            </p>


            <div class="form-group">
              <label>
                Nama PMO
                <span class="required">*</span>
              </label>

              <input
                v-model="formData.pmoName"
                type="text"
                class="form-control"
                placeholder="Nama PMO"
                maxlength="100"
                required
              />
            </div>


            <div class="form-group">
              <label>
                Nomor Telepon PMO
                <span class="required">*</span>
              </label>

              <input
                v-model="formData.pmoPhone"
                type="tel"
                class="form-control"
                placeholder="081234567890"
                maxlength="15"
                required
              />
            </div>

          </div>


          <!-- =========================================== -->
          <!-- INFORMASI TREATMENT -->
          <!-- =========================================== -->

          <div class="card form-card">

            <h3 class="card-title">
              Informasi Pengobatan
            </h3>

            <p class="text-muted">
              Data TB, regimen obat, tanggal mulai
              pengobatan, dan status terapi dikelola
              melalui modul Treatment setelah pasien
              berhasil dibuat.
            </p>


            <div class="info-box">

              <strong>
                Alur berikutnya
              </strong>

              <ul>
                <li>Buat pasien</li>
                <li>Buat treatment</li>
                <li>Atur medicine schedule</li>
                <li>Atur control schedule</li>
              </ul>

            </div>

          </div>

        </div>

      </div>


      <!-- ================================================= -->
      <!-- FOOTER ACTION -->
      <!-- ================================================= -->

      <div class="form-actions">

        <button
          type="button"
          class="btn btn-outline btn-lg"
          :disabled="isSubmitting"
          @click="cancelAdd"
        >
          Batal
        </button>


        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="isSubmitting"
        >

          <span v-if="isSubmitting">
            Menyimpan...
          </span>

          <span v-else>
            Simpan Pasien
          </span>

        </button>

      </div>

    </form>


    <!-- ================================================= -->
    <!-- SUCCESS MODAL -->
    <!-- ================================================= -->

    <div
      v-if="showSuccessModal"
      class="modal-overlay"
    >

      <div class="modal-content">

        <div class="modal-icon success">
          ✓
        </div>


        <h2>
          Pasien Berhasil Ditambahkan
        </h2>


        <p>
          Data pasien
          <strong>
            {{ formData.name }}
          </strong>
          berhasil disimpan.
        </p>


        <!-- Credential pasien -->

        <div class="credentials-box">

          <h4>
            Akun Pasien
          </h4>


          <div class="credential-row">

            <span>
              Username
            </span>

            <strong>
              {{ createdCredentials.username }}
            </strong>

          </div>


          <div class="credential-row">

            <span>
              Password Sementara
            </span>

            <strong>
              {{ createdCredentials.password }}
            </strong>

          </div>

        </div>


        <p class="text-muted">
          Berikan username dan password sementara
          ini kepada pasien. Pasien dapat menggunakan
          akun tersebut untuk login ke SITARA.
        </p>


        <button
          type="button"
          class="btn btn-primary btn-block"
          @click="finishAndRedirect"
        >
          Lanjut ke Daftar Pasien
        </button>

      </div>

    </div>

  </div>
</template>

<style scoped>
.patient-add-page {
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

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #0f172a;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

/* Account Configuration Card */
.account-card {
  background: linear-gradient(145deg, #f0f9ff, #ffffff);
  border: 1px solid #bae6fd;
}

.account-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.account-icon {
  width: 48px;
  height: 48px;
  background-color: #006591;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.account-text {
  flex: 1;
}

.account-text h3 {
  margin: 0 0 4px 0;
  font-size: 1.125rem;
  color: #0f172a;
}

.account-text p {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
}

/* Toggle Switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #006591;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
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

.required {
  color: #dc2626;
}

.mt-1 { margin-top: 4px; }
.d-block { display: block; font-size: 0.75rem; }
.text-primary { color: #006591; }

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

.btn-block {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #006591;
  color: white;
}

.btn-primary:hover {
  background-color: #005378;
}

.btn-primary:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.btn-outline {
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #475569;
}

.btn-outline:hover:not(:disabled) {
  background-color: #f1f5f9;
  color: #0f172a;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.3s ease;
}

.modal-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.modal-icon.success {
  background-color: #dcfce7;
  color: #16a34a;
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px 0;
}

.modal-content p {
  color: #475569;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.whatsapp-success {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 16px;
  border-radius: 8px;
  text-align: left;
  margin-bottom: 24px;
}

.wa-icon {
  color: #16a34a;
  background: white;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.whatsapp-success h4 {
  margin: 0 0 4px 0;
  color: #166534;
  font-size: 0.95rem;
}

.whatsapp-success p {
  margin: 0;
  font-size: 0.8rem;
  color: #15803d;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}
</style>
