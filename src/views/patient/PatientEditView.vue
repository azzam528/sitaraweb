<script setup>
import { usePatientEditView } from './PatientEditView.js'

const {
  patientData,
  treatment,
  loading,
  saving,
  error,
  success,
  fetchPatient,
  savePatient,
  cancelEdit
} = usePatientEditView()
</script>

<template>
  <div class="patient-edit-page">
    <!-- Header Navigation -->
    <div class="header-nav">
      <button type="button" @click="cancelEdit" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Batal & Kembali
      </button>
    </div>

    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Edit Data Pasien</h1>
      <p class="subtitle">
        Perbarui informasi personal dan data pendamping pasien.
      </p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="card form-card">
      <div class="loading-state">
        Memuat data pasien...
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error && !patientData.id" class="card form-card">
      <div class="error-state">
        <strong>Gagal memuat data pasien</strong>
        <p>{{ error }}</p>
        <button type="button" class="btn btn-primary" @click="fetchPatient">
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="savePatient" class="edit-form">
      <!-- Success Message -->
      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- Main Grid -->
      <div class="grid-layout">
        <!-- Kolom Kiri: Identitas -->
        <div class="left-col">
          <div class="card form-card">
            <h3 class="card-title">Identitas Lengkap</h3>

            <!-- Nomor Rekam Medis -->
            <div class="form-group">
              <label>Nomor Rekam Medis</label>
              <input
                type="text"
                v-model="patientData.medical_record_number"
                class="form-control"
                disabled
              />
              <small class="form-help">
                Nomor rekam medis tidak dapat diubah.
              </small>
            </div>

            <!-- Nama Lengkap -->
            <div class="form-group">
              <label>
                Nama Lengkap
                <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="patientData.full_name"
                class="form-control"
                placeholder="Nama lengkap pasien"
                required
              />
            </div>

            <!-- NIK -->
            <div class="form-group">
              <label>NIK</label>
              <input
                type="text"
                v-model="patientData.nik"
                class="form-control"
                disabled
              />
              <small class="form-help">
                NIK tidak dapat diubah melalui form ini.
              </small>
            </div>

            <!-- Tanggal Lahir + Gender -->
            <div class="form-row">
              <div class="form-group half">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  v-model="patientData.birth_date"
                  class="form-control"
                  disabled
                />
              </div>

              <div class="form-group half">
                <label>Jenis Kelamin</label>
                <select
                  v-model="patientData.gender"
                  class="form-select"
                  disabled
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>

            <!-- Telepon + Pekerjaan -->
            <div class="form-row">
              <div class="form-group half">
                <label>Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  v-model="patientData.phone"
                  class="form-control"
                  disabled
                />
                <small class="form-help">
                  Nomor WhatsApp terikat dengan username akun pasien.
                </small>
              </div>

              <div class="form-group half">
                <label>Pekerjaan</label>
                <input
                  type="text"
                  v-model="patientData.occupation"
                  class="form-control"
                  placeholder="Pekerjaan pasien"
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
                v-model="patientData.address"
                class="form-control"
                rows="3"
                placeholder="Alamat lengkap pasien"
                required
              ></textarea>
            </div>

            <!-- Catatan Klinis -->
            <div class="form-group">
              <label>Catatan Klinis</label>
              <textarea
                v-model="patientData.clinical_note"
                class="form-control"
                rows="4"
                placeholder="Catatan tambahan mengenai pasien"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: PMO & Medis -->
        <div class="right-col">
          <!-- Tim Kesehatan & PMO -->
          <div class="card form-card">
            <h3 class="card-title">Tim Kesehatan & PMO</h3>
            <p class="card-description">
              Informasi pendamping minum obat pasien.
            </p>

            <!-- Nama PMO -->
            <div class="form-group">
              <label>
                Nama PMO
                <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="patientData.pmo_name"
                class="form-control"
                placeholder="Nama PMO"
                required
              />
            </div>

            <!-- Nomor PMO -->
            <div class="form-group">
              <label>
                Nomor Telepon PMO
                <span class="required">*</span>
              </label>
              <input
                type="tel"
                v-model="patientData.pmo_phone"
                class="form-control"
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>
          </div>

          <!-- Informasi Medis -->
          <div class="card form-card">
            <h3 class="card-title">Informasi Medis</h3>
            <p class="card-description">
              Data diagnosis dan pengobatan pasien dikelola melalui modul Treatment.
            </p>

            <!-- Diagnosis -->
            <div class="form-group">
              <label>Tanggal Diagnosis</label>
              <input
                type="date"
                :value="treatment?.diagnosis_date || ''"
                class="form-control"
                disabled
              />
            </div>

            <!-- Mulai Terapi -->
            <div class="form-group">
              <label>Tanggal Mulai Terapi</label>
              <input
                type="date"
                :value="treatment?.therapy_start_date || ''"
                class="form-control"
                disabled
              />
            </div>

            <!-- Selesai Terapi -->
            <div class="form-group">
              <label>Tanggal Selesai Terapi</label>
              <input
                type="date"
                :value="treatment?.therapy_end_date || ''"
                class="form-control"
                disabled
              />
            </div>

            <!-- Status -->
            <div class="form-group">
              <label>Status Pengobatan</label>
              <input
                type="text"
                :value="
                  treatment?.status === 'active'
                    ? 'Aktif'
                    : treatment?.status === 'completed'
                      ? 'Selesai'
                      : treatment?.status === 'dropped'
                        ? 'Putus Berobat'
                        : '-'
                "
                class="form-control"
                disabled
              />
            </div>

            <div v-if="treatment" class="medical-info-note">
              Untuk mengubah data pengobatan, gunakan modul <strong>Monitoring Pengobatan</strong>.
            </div>
            <div v-else class="medical-info-note">
              Pasien ini belum memiliki data treatment aktif.
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="form-actions">
        <button
          type="button"
          @click="cancelEdit"
          class="btn btn-outline btn-lg"
          :disabled="saving"
        >
          Batal
        </button>

        <button
          type="submit"
          class="btn btn-primary btn-lg"
          :disabled="saving"
        >
          <span v-if="saving">Menyimpan...</span>
          <span v-else>Simpan Perubahan</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped src="./PatientEditView.css"></style>
