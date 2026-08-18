<script setup>
import './PatientAddView.css'
import { usePatientAddView } from './PatientAddView.js'

const {
  formData,
  isSubmitting,
  showSuccessModal,
  errorMessage,
  createdCredentials,
  savePatient,
  cancelAdd,
  finishAndRedirect
} = usePatientAddView()
</script>

<template>
  <div class="patient-add-page">
    <!-- Header Nav -->
    <div class="header-nav">
      <button type="button" class="back-link" @click="cancelAdd">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Batal & Kembali
      </button>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Tambah Pasien Baru</h1>
      <p class="subtitle">
        Daftarkan pasien TB baru dan buatkan akun aplikasinya untuk pemantauan pengobatan.
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="error-alert">
      <strong>Gagal:</strong> {{ errorMessage }}
    </div>

    <!-- Form -->
    <form class="add-form" @submit.prevent="savePatient">
      <div class="grid-layout">
        <!-- Left Column: Identitas -->
        <div class="left-col">
          <div class="card form-card">
            <h3 class="card-title">Identitas Lengkap</h3>

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

            <!-- Tanggal Lahir + Gender -->
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
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
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
              <label>Catatan Klinis</label>
              <textarea
                v-model="formData.clinicalNote"
                class="form-control"
                rows="4"
                placeholder="Catatan tambahan mengenai pasien"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Right Column: PMO & Treatment Info -->
        <div class="right-col">
          <!-- PMO -->
          <div class="card form-card">
            <h3 class="card-title">Informasi PMO</h3>
            <p class="text-muted">Pengawas Minum Obat pasien.</p>

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

          <!-- Treatment Info -->
          <div class="card form-card">
            <h3 class="card-title">Informasi Pengobatan</h3>
            <p class="text-muted">
              Data TB, regimen obat, tanggal mulai pengobatan, dan status terapi dikelola melalui modul Treatment setelah pasien berhasil dibuat.
            </p>

            <div class="info-box">
              <strong>Alur berikutnya:</strong>
              <ul>
                <li>1. Buat pasien</li>
                <li>2. Buat treatment</li>
                <li>3. Atur jadwal obat (medicine schedule)</li>
                <li>4. Atur jadwal kontrol (control schedule)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action -->
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
          <span v-if="isSubmitting">Menyimpan...</span>
          <span v-else>Simpan Pasien</span>
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-icon success">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h2>Pasien Berhasil Ditambahkan</h2>
        <p>
          Data pasien <strong>{{ formData.name }}</strong> berhasil disimpan ke dalam sistem.
        </p>

        <!-- Credential box -->
        <div class="credentials-box">
          <h4>Akun Pasien</h4>
          <div class="credential-row">
            <span>Username:</span>
            <strong>{{ createdCredentials.username }}</strong>
          </div>
          <div class="credential-row">
            <span>Password Sementara:</span>
            <strong>{{ createdCredentials.password }}</strong>
          </div>
        </div>

        <p class="text-muted text-sm mt-3">
          Berikan kredensial di atas kepada pasien untuk dapat login ke aplikasi SITARA.
        </p>

        <button
          type="button"
          class="btn btn-primary btn-block mt-4"
          @click="finishAndRedirect"
        >
          Lanjut ke Daftar Pasien
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PatientAddView.css"></style>
