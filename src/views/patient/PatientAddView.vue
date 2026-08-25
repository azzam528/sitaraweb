<script setup>
import "./PatientAddView.css";
import { usePatientAddView } from "./PatientAddView.js";

const {
  formData,
  isSubmitting,
  showSuccessModal,
  errorMessage,
  createdCredentials,
  copiedLink,
  copiedMessage,
  fullWhatsAppMessage,
  generateAutoRM,
  savePatient,
  copyActivationLink,
  copyWhatsAppMessage,
  cancelAdd,
  finishAndRedirect,
  viewNewPatientDetail,
  addAnotherPatient,
} = usePatientAddView();
</script>

<template>
  <div class="patient-add-page">
    <!-- Header Nav -->
    <div class="header-nav">
      <button type="button" class="back-link" @click="cancelAdd">
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
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Batal & Kembali ke Daftar Pasien
      </button>
    </div>

    <!-- Page Header -->
    <div class="page-header-wrapper">
      <div class="page-header">
        <div class="page-header-content">
          <h1 class="page-title">Pendaftaran Pasien Baru</h1>
          <p class="subtitle">
            Lengkapi data identitas pasien TB, kontak PMO, dan buatkan akun aplikasi SITARA secara instan.
          </p>
        </div>
        <div class="wa-integration-badge">
          <span class="wa-badge-dot"></span>
          <svg class="wa-badge-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.769.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.385 8.163c-.145.408-.847.77-1.199.818-.328.044-.757.067-2.45-.634-1.928-.798-3.161-2.766-3.256-2.894-.096-.128-.779-1.037-.779-1.978 0-.94.492-1.403.666-1.595.174-.192.381-.24.509-.24.127 0 .254.001.365.006.118.006.275-.045.43.328.16.386.545 1.332.593 1.429.048.096.08.209.016.337-.064.128-.096.208-.192.32-.096.113-.202.253-.288.339-.096.096-.197.2-.085.392.112.192.498.822 1.069 1.331.735.655 1.355.858 1.547.954.192.096.304.08.416-.048.113-.128.481-.561.609-.753.128-.192.256-.16.432-.096.176.064 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.097.872z"/>
          </svg>
          <span>Aktivasi Otomatis via WhatsApp</span>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="error-alert">
      <svg class="alert-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <div class="alert-text">
        <strong>Pendaftaran Belum Lengkap:</strong>
        <span>{{ errorMessage }}</span>
      </div>
    </div>

    <!-- Form -->
    <form class="add-form" @submit.prevent="savePatient">
      <div class="grid-layout">
        <!-- Left Column: Identitas & Medis -->
        <div class="left-col">
          <!-- Card 1: Identitas Lengkap -->
          <div class="card form-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <span class="step-badge">1</span>
                <h3 class="card-title">Identitas Pasien</h3>
              </div>
              <span class="badge-tag">Wajib Diisi</span>
            </div>

            <!-- Nomor Rekam Medis -->
            <div class="form-group">
              <div class="label-with-action">
                <label>
                  Nomor Rekam Medis (No. RM)
                  <span class="required">*</span>
                </label>
                <span class="auto-badge">Otomatis Dibuat</span>
              </div>
              <div class="input-action-group">
                <input
                  v-model="formData.medicalRecordNumber"
                  type="text"
                  class="form-control font-mono"
                  placeholder="Contoh: RM-TB-2026-0001"
                  maxlength="30"
                  required
                />
                <button
                  type="button"
                  class="btn-generate-rm"
                  title="Generate No. RM Baru"
                  @click="generateAutoRM"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  <span>Generate Ulang</span>
                </button>
              </div>
              <span class="field-hint">No. RM dibuat otomatis oleh sistem (dapat disesuaikan jika faskes memiliki format khusus).</span>
            </div>

            <!-- Nama Lengkap -->
            <div class="form-group">
              <label>
                Nama Lengkap Pasien
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                class="form-control"
                placeholder="Contoh: Ahmad Fauzi"
                maxlength="255"
                required
              />
            </div>

            <!-- NIK -->
            <div class="form-group">
              <label>
                NIK (Nomor Induk Kependudukan)
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.nik"
                type="text"
                class="form-control font-mono"
                placeholder="16 digit NIK KTP..."
                maxlength="16"
                required
              />
              <span class="field-hint">Harus 16 digit angka sesuai KTP/KK.</span>
            </div>

            <!-- Form Row: Tanggal Lahir & Jenis Kelamin -->
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
                <select v-model="formData.gender" class="form-select" required>
                  <option value="male">Laki-laki (L)</option>
                  <option value="female">Perempuan (P)</option>
                </select>
              </div>
            </div>

            <!-- Pekerjaan -->
            <div class="form-group">
              <label>
                Pekerjaan Pasien
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.job"
                type="text"
                class="form-control"
                placeholder="Contoh: Karyawan Swasta, Wiraswasta, Ibu Rumah Tangga..."
                maxlength="100"
                required
              />
            </div>
          </div>

          <!-- Card 2: Catatan Klinis -->
          <div class="card form-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <span class="step-badge step-muted">2</span>
                <h3 class="card-title">Catatan Klinis Awal</h3>
              </div>
              <span class="badge-tag-secondary">Opsional</span>
            </div>

            <div class="form-group">
              <label>Catatan Klinis / Instruksi Khusus Nakes</label>
              <textarea
                v-model="formData.clinicalNote"
                class="form-control"
                rows="3"
                placeholder="Contoh: Pasien memiliki riwayat maag, ingatkan minum obat 1 jam setelah makan..."
                maxlength="500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Right Column: Kontak, PMO & Integrasi WhatsApp -->
        <div class="right-col">
          <!-- Card 3: Kontak & Domisili -->
          <div class="card form-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <span class="step-badge">3</span>
                <h3 class="card-title">Kontak & Domisili Pasien</h3>
              </div>
              <span class="badge-tag">Wajib Diisi</span>
            </div>

            <!-- No Telp/WhatsApp Pasien -->
            <div class="form-group">
              <label>
                Nomor WhatsApp Pasien
                <span class="required">*</span>
              </label>
              <div class="input-prefix-wrapper">
                <span class="input-prefix">+62</span>
                <input
                  v-model="formData.phone"
                  type="tel"
                  class="form-control with-prefix"
                  placeholder="81234567890"
                  maxlength="15"
                  required
                />
              </div>
              <span class="field-hint">Nomor ini akan menerima link aktivasi akun SITARA via WhatsApp.</span>
            </div>

            <!-- Alamat Domisili -->
            <div class="form-group">
              <label>
                Alamat Domisili Lengkap
                <span class="required">*</span>
              </label>
              <textarea
                v-model="formData.address"
                class="form-control"
                rows="3"
                placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota..."
                maxlength="255"
                required
              ></textarea>
            </div>
          </div>

          <!-- Card 4: Pengawas Menelan Obat (PMO) -->
          <div class="card form-card">
            <div class="card-header-flex">
              <div class="card-title-group">
                <span class="step-badge">4</span>
                <h3 class="card-title">Data PMO (Pengawas Obat)</h3>
              </div>
              <span class="badge-tag">Wajib Diisi</span>
            </div>

            <!-- Nama PMO -->
            <div class="form-group">
              <label>
                Nama Lengkap PMO
                <span class="required">*</span>
              </label>
              <input
                v-model="formData.pmoName"
                type="text"
                class="form-control"
                placeholder="Contoh: Ibu Siti Aminah (Istri / Keluarga)"
                maxlength="255"
                required
              />
            </div>

            <!-- No Telp/WhatsApp PMO -->
            <div class="form-group">
              <label>
                Nomor WhatsApp PMO
                <span class="required">*</span>
              </label>
              <div class="input-prefix-wrapper">
                <span class="input-prefix">+62</span>
                <input
                  v-model="formData.pmoPhone"
                  type="tel"
                  class="form-control with-prefix"
                  placeholder="81398765432"
                  maxlength="15"
                  required
                />
              </div>
              <span class="field-hint">PMO mendampingi pasien meminum obat dan menerima laporan notifikasi.</span>
            </div>
          </div>

          <!-- Card 5: Banner Aktivasi WhatsApp -->
          <div class="wa-info-card">
            <div class="wa-info-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.769.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.385 8.163c-.145.408-.847.77-1.199.818-.328.044-.757.067-2.45-.634-1.928-.798-3.161-2.766-3.256-2.894-.096-.128-.779-1.037-.779-1.978 0-.94.492-1.403.666-1.595.174-.192.381-.24.509-.24.127 0 .254.001.365.006.118.006.275-.045.43.328.16.386.545 1.332.593 1.429.048.096.08.209.016.337-.064.128-.096.208-.192.32-.096.113-.202.253-.288.339-.096.096-.197.2-.085.392.112.192.498.822 1.069 1.331.735.655 1.355.858 1.547.954.192.096.304.08.416-.048.113-.128.481-.561.609-.753.128-.192.256-.16.432-.096.176.064 1.119.528 1.311.624.192.096.32.144.368.224.048.08.048.464-.097.872z"/>
              </svg>
            </div>
            <div class="wa-info-body">
              <h4>Aktivasi Instan Akun Pasien</h4>
              <p>Setelah data disimpan, sistem otomatis menghasilkan <strong>Username</strong> dan <strong>Link Aktivasi WhatsApp</strong> agar pasien dapat langsung membuat kata sandi di ponselnya.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions Footer -->
      <div class="form-actions-bar">
        <button
          type="button"
          class="btn btn-outline"
          :disabled="isSubmitting"
          @click="cancelAdd"
        >
          Batal
        </button>
        <button
          type="submit"
          class="btn btn-primary btn-submit"
          :disabled="isSubmitting"
        >
          <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          <span v-if="isSubmitting">Menyimpan Pasien...</span>
          <span v-else>Simpan & Kirim Aktivasi</span>
        </button>
      </div>
    </form>

    <!-- ================================================================= -->
    <!-- STATE-OF-THE-ART SUCCESS & WHATSAPP ACTIVATION MODAL -->
    <!-- ================================================================= -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="finishAndRedirect">
      <div class="modal-card">
        <!-- Modal Top Accent Banner -->
        <div class="modal-top-accent"></div>

        <div class="modal-inner">
          <!-- Success Header Icon -->
          <div class="modal-badge-wrapper">
            <div class="modal-success-badge">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h2 class="modal-title">Pasien Berhasil Didaftarkan!</h2>
          <p class="modal-subtitle">
            Data pasien telah tersimpan di database. Bagikan link aktivasi di bawah ini agar pasien dapat mengaktifkan akun aplikasi SITARA.
          </p>

          <!-- Patient Identity Summary Pill -->
          <div class="patient-pill-summary">
            <div class="summary-avatar">
              {{ (createdCredentials.name || formData.name).substring(0, 2).toUpperCase() }}
            </div>
            <div class="summary-info">
              <span class="summary-name">{{ createdCredentials.name || formData.name }}</span>
              <span class="summary-meta">
                NIK: {{ createdCredentials.nik || formData.nik }} • No. RM: {{ createdCredentials.medicalRecordNumber || formData.medicalRecordNumber }}
              </span>
            </div>
          </div>

          <!-- Credential & Activation Link Box -->
          <div class="activation-box">
            <div class="activation-row">
              <span class="activation-label">Username Pasien</span>
              <span class="activation-value font-mono">{{ createdCredentials.username || '-' }}</span>
            </div>

            <div class="activation-link-wrapper">
              <label class="activation-link-label">Link Aktivasi Akun SITARA</label>
              <div class="link-input-group">
                <input
                  type="text"
                  readonly
                  :value="createdCredentials.activationUrl"
                  class="link-readonly-input font-mono text-xs"
                />
                <button
                  type="button"
                  class="btn-copy-link"
                  :class="{ copied: copiedLink }"
                  @click="copyActivationLink"
                >
                  <svg v-if="!copiedLink" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{{ copiedLink ? 'Tersalin!' : 'Salin Link' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- WhatsApp Chat Preview Mockup -->
          <div class="wa-mockup-card">
            <div class="wa-mockup-header">
              <div class="wa-mockup-avatar">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.769.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766z"/>
                </svg>
              </div>
              <div class="wa-mockup-title">
                <strong>Pratinjau Pesan WhatsApp</strong>
                <span>Penerima: +62 {{ createdCredentials.phone || formData.phone }}</span>
              </div>
            </div>
            <div class="wa-chat-bubble">
              <p>Halo Bapak/Ibu <strong>{{ createdCredentials.name || formData.name }}</strong>,</p>
              <p>Akun aplikasi <strong>SITARA</strong> Anda telah berhasil didaftarkan untuk pemantauan pengobatan TB.</p>
              <div class="wa-bubble-creds">
                <div>• No. RM: <strong>{{ createdCredentials.medicalRecordNumber || formData.medicalRecordNumber }}</strong></div>
                <div>• Username: <strong>{{ createdCredentials.username }}</strong></div>
              </div>
              <p class="wa-bubble-link">
                👉 <span class="wa-link-text">{{ createdCredentials.activationUrl }}</span>
              </p>
              <span class="wa-bubble-time">Baru Saja • Otomatis</span>
            </div>
          </div>

          <!-- WhatsApp Action Buttons Grid -->
          <div class="modal-actions-grid">
            <!-- 1. Send Direct to Patient WA -->
            <a
              v-if="createdCredentials.whatsappUrl"
              :href="createdCredentials.whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-wa-primary"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Kirim WhatsApp ke Pasien</span>
            </a>

            <!-- 2. Send Direct to PMO WA -->
            <a
              v-if="createdCredentials.pmoWhatsappUrl"
              :href="createdCredentials.pmoWhatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-wa-secondary"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.983.54 1.769.813 2.796.813 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766z"/>
              </svg>
              <span>Kirim WhatsApp ke PMO ({{ createdCredentials.pmoName || 'PMO' }})</span>
            </a>

            <!-- 3. Copy Full Message Text -->
            <button
              type="button"
              class="btn-copy-full-msg"
              :class="{ copied: copiedMessage }"
              @click="copyWhatsAppMessage"
            >
              <svg v-if="!copiedMessage" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>{{ copiedMessage ? 'Pesan WhatsApp Tersalin ke Clipboard!' : 'Salin Seluruh Teks Pesan WhatsApp' }}</span>
            </button>
          </div>

          <!-- Bottom Navigation Actions -->
          <div class="modal-footer-nav">
            <button
              type="button"
              class="btn btn-primary btn-block-custom"
              @click="viewNewPatientDetail"
            >
              Lihat Detail Pasien
            </button>
            <button
              type="button"
              class="btn btn-outline btn-block-custom"
              @click="addAnotherPatient"
            >
              + Tambah Pasien Lain
            </button>
            <button
              type="button"
              class="btn-text-link"
              @click="finishAndRedirect"
            >
              Kembali ke Daftar Pasien
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./PatientAddView.css"></style>
