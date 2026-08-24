<template>
  <div class="treatment-create-page">
    <!-- HEADER NAV -->
    <div class="header-nav mb-3">
      <button type="button" class="back-link" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Batal & Kembali
      </button>
    </div>

    <!-- PAGE HEADER -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Tambah Pengobatan Baru</h1>
        <p class="page-subtitle">Daftarkan rekam terapi pengobatan TB untuk pasien.</p>
      </div>
    </div>

    <!-- ERROR ALERT -->
    <div v-if="error" class="toast-alert toast-error">
      <span>{{ error }}</span>
    </div>

    <!-- LOADING PATIENT -->
    <div v-if="loading" class="card loading-state">
      <div class="spinner"></div>
      <p>Memuat data pasien...</p>
    </div>

    <!-- CONTENT -->
    <template v-else-if="patient">
      <!-- DATA PASIEN -->
      <section class="card mb-4">
        <div class="card-header">
          <h2 class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Data Pasien Penerima Terapi
          </h2>
        </div>

        <div class="patient-grid">
          <div class="info-item">
            <span class="label">Nama Lengkap</span>
            <span class="value font-semibold">{{ patient.full_name || "-" }}</span>
          </div>

          <div class="info-item">
            <span class="label">NIK</span>
            <span class="value font-mono">{{ patient.nik || "-" }}</span>
          </div>

          <div class="info-item">
            <span class="label">Nomor Rekam Medis</span>
            <span class="value text-primary font-semibold">{{ patient.medical_record_number || "-" }}</span>
          </div>

          <div class="info-item">
            <span class="label">Nomor Telepon</span>
            <span class="value">{{ patient.phone || "-" }}</span>
          </div>
        </div>
      </section>

      <!-- FORM TREATMENT -->
      <form class="card" @submit.prevent="submitTreatment">
        <div class="card-header">
          <h2 class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            Data Rencana Pengobatan
          </h2>
        </div>

        <div class="form-grid">
          <!-- DIAGNOSIS -->
          <div class="form-group">
            <label for="diagnosis_date">
              Tanggal Diagnosis
              <span class="required">*</span>
            </label>
            <input
              id="diagnosis_date"
              v-model="form.diagnosis_date"
              type="date"
              class="form-control"
              required
            />
          </div>

          <!-- THERAPY START -->
          <div class="form-group">
            <label for="therapy_start_date">
              Tanggal Mulai Terapi
              <span class="required">*</span>
            </label>
            <input
              id="therapy_start_date"
              v-model="form.therapy_start_date"
              type="date"
              class="form-control"
              required
            />
          </div>

          <!-- THERAPY END -->
          <div class="form-group">
            <label for="therapy_end_date">Tanggal Selesai Terapi (Estimasi)</label>
            <input
              id="therapy_end_date"
              v-model="form.therapy_end_date"
              type="date"
              class="form-control"
            />
          </div>

          <!-- PHASE -->
          <div class="form-group">
            <label for="phase">
              Fase Pengobatan
              <span class="required">*</span>
            </label>
            <select id="phase" v-model="form.phase" class="form-control" required>
              <option value="">Pilih Fase</option>
              <option value="intensive">Fase Intensif (2 Bulan)</option>
              <option value="continuation">Fase Lanjutan (4 Bulan)</option>
            </select>
          </div>

          <!-- REGIMEN -->
          <div class="form-group">
            <label for="regimen">
              Regimen Obat
              <span class="required">*</span>
            </label>
            <select id="regimen" v-model="form.regimen" class="form-control" required>
              <option value="">Pilih Regimen</option>
              <option value="category_1">Kategori 1 (2HRZE / 4H3R3)</option>
              <option value="category_2">Kategori 2 (2HRZES / 1HRZE / 5H3R3E3)</option>
              <option value="mdr">TB-RO (MDR)</option>
            </select>
          </div>

          <!-- STATUS -->
          <div class="form-group">
            <label for="status">
              Status Pengobatan
              <span class="required">*</span>
            </label>
            <select id="status" v-model="form.status" class="form-control" required>
              <option value="active">Aktif (Sedang Berjalan)</option>
              <option value="completed">Selesai / Sembuh</option>
              <option value="dropped">Putus Berobat</option>
            </select>
          </div>

          <!-- DOCTOR -->
          <div class="form-group full-width">
            <label for="doctor_name">
              Dokter Penanggung Jawab
              <span class="required">*</span>
            </label>
            <input
              id="doctor_name"
              v-model="form.doctor_name"
              type="text"
              class="form-control"
              placeholder="Contoh: dr. Budi Santoso, Sp.P"
              required
            />
          </div>

          <!-- NOTE -->
          <div class="form-group full-width">
            <label for="doctor_note">Catatan Dokter / Instruksi Klinis</label>
            <textarea
              id="doctor_note"
              v-model="form.doctor_note"
              rows="4"
              class="form-control"
              placeholder="Masukkan catatan atau instruksi khusus terapi..."
            ></textarea>
          </div>
        </div>

        <!-- ACTION -->
        <div class="form-actions">
          <button
            type="button"
            class="btn btn-outline btn-lg"
            @click="goBack"
            :disabled="submitting"
          >
            Batal
          </button>

          <button type="submit" class="btn btn-primary btn-lg" :disabled="submitting">
            <span v-if="submitting">Menyimpan...</span>
            <span v-else>Simpan Pengobatan</span>
          </button>
        </div>
      </form>
    </template>

    <!-- PATIENT NOT FOUND -->
    <div v-else class="card empty-state">
      <h2>Data Pasien Tidak Ditemukan</h2>
      <p>Pasien yang ingin diberikan pengobatan tidak dapat ditemukan atau telah dihapus.</p>
      <button type="button" class="btn btn-outline" @click="goBack">
        Kembali
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTreatmentCreateView } from "./TreatmentCreateView.js";

import "./TreatmentCreateView.css";

const { patient, loading, submitting, error, form, submitTreatment, goBack } =
  useTreatmentCreateView();
</script>
