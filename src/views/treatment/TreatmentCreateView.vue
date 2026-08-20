<template>
  <div class="treatment-create-page">
    <!-- HEADER -->
    <div class="page-header">
      <div>
        <h1>Tambah Pengobatan</h1>
        <p>Tambahkan data pengobatan untuk pasien.</p>
      </div>

      <button type="button" class="btn-secondary" @click="goBack">
        Kembali
      </button>
    </div>

    <!-- ERROR -->
    <div v-if="error" class="alert-error">
      {{ error }}
    </div>

    <!-- LOADING PATIENT -->
    <div v-if="loading" class="card loading">Memuat data pasien...</div>

    <!-- CONTENT -->
    <template v-else-if="patient">
      <!-- DATA PASIEN -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2>Data Pasien</h2>
            <p>Data pasien yang akan diberikan pengobatan.</p>
          </div>
        </div>

        <div class="patient-grid">
          <div class="info-item">
            <span class="label"> Nama Lengkap </span>

            <span class="value">
              {{ patient.full_name || "-" }}
            </span>
          </div>

          <div class="info-item">
            <span class="label"> NIK </span>

            <span class="value">
              {{ patient.nik || "-" }}
            </span>
          </div>

          <div class="info-item">
            <span class="label"> Nomor Rekam Medis </span>

            <span class="value">
              {{ patient.medical_record_number || "-" }}
            </span>
          </div>

          <div class="info-item">
            <span class="label"> Nomor Telepon </span>

            <span class="value">
              {{ patient.phone || "-" }}
            </span>
          </div>
        </div>
      </section>

      <!-- FORM TREATMENT -->
      <form class="card" @submit.prevent="submitTreatment">
        <div class="card-header">
          <div>
            <h2>Data Pengobatan</h2>
            <p>Masukkan informasi terapi pasien.</p>
          </div>
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
              required
            />
          </div>

          <!-- THERAPY END -->
          <div class="form-group">
            <label for="therapy_end_date"> Tanggal Selesai Terapi </label>

            <input
              id="therapy_end_date"
              v-model="form.therapy_end_date"
              type="date"
            />
          </div>

          <!-- PHASE -->
          <div class="form-group">
            <label for="phase">
              Fase Pengobatan
              <span class="required">*</span>
            </label>

            <select id="phase" v-model="form.phase" required>
              <option value="">Pilih fase</option>

              <option value="intensive">Fase Intensif</option>

              <option value="continuation">Fase Lanjutan</option>
            </select>
          </div>

          <!-- REGIMEN -->
          <div class="form-group">
            <label for="regimen">
              Regimen
              <span class="required">*</span>
            </label>

            <select id="regimen" v-model="form.regimen" required>
              <option value="">Pilih regimen</option>

              <option value="category_1">Kategori 1</option>

              <option value="category_2">Kategori 2</option>

              <option value="mdr">MDR</option>
            </select>
          </div>

          <!-- STATUS -->
          <div class="form-group">
            <label for="status">
              Status Pengobatan
              <span class="required">*</span>
            </label>

            <select id="status" v-model="form.status" required>
              <option value="active">Aktif</option>

              <option value="completed">Selesai</option>

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
              placeholder="Contoh: dr. Budi Santoso"
              required
            />
          </div>

          <!-- NOTE -->
          <div class="form-group full-width">
            <label for="doctor_note"> Catatan Dokter </label>

            <textarea
              id="doctor_note"
              v-model="form.doctor_note"
              rows="5"
              placeholder="Masukkan catatan atau instruksi dokter..."
            ></textarea>
          </div>
        </div>

        <!-- ACTION -->
        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="goBack"
            :disabled="submitting"
          >
            Batal
          </button>

          <button type="submit" class="btn-primary" :disabled="submitting">
            <span v-if="submitting"> Menyimpan... </span>

            <span v-else> Simpan Pengobatan </span>
          </button>
        </div>
      </form>
    </template>

    <!-- PATIENT NOT FOUND -->
    <div v-else class="card empty-state">
      <h2>Data pasien tidak ditemukan</h2>

      <p>Pasien yang ingin diberikan pengobatan tidak dapat ditemukan.</p>

      <button type="button" class="btn-secondary" @click="goBack">
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
