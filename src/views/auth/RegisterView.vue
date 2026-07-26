<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import healthcareImg from '@/assets/images/healthcare-team.png'
import logoImg from '@/assets/images/logo.png'

const router = useRouter()

// Form state
const form = ref({
  name: '',
  email: '',
  phone: '',
  role: '',
  puskesmas: '',
  password: '',
  passwordConfirm: ''
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isLoading = ref(false)
const errors = ref({})
const agreeTerms = ref(false)

// Role options
const roleOptions = [
  { value: 'kepala_puskesmas', label: 'Kepala Puskesmas' },
  { value: 'dokter', label: 'Dokter' },
  { value: 'perawat', label: 'Perawat' },
  { value: 'petugas_tb', label: 'Petugas TB' }
]

// Validation
const validateForm = () => {
  const newErrors = {}

  if (!form.value.name.trim()) {
    newErrors.name = 'Nama lengkap wajib diisi'
  }

  if (!form.value.email.trim()) {
    newErrors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = 'Format email tidak valid'
  }

  if (!form.value.phone.trim()) {
    newErrors.phone = 'Nomor telepon wajib diisi'
  } else if (!/^08\d{8,12}$/.test(form.value.phone)) {
    newErrors.phone = 'Nomor telepon tidak valid (contoh: 08123456789)'
  }

  if (!form.value.role) {
    newErrors.role = 'Jabatan wajib dipilih'
  }

  if (!form.value.puskesmas.trim()) {
    newErrors.puskesmas = 'Nama puskesmas wajib diisi'
  }

  if (!form.value.password) {
    newErrors.password = 'Password wajib diisi'
  } else if (form.value.password.length < 8) {
    newErrors.password = 'Password minimal 8 karakter'
  }

  if (!form.value.passwordConfirm) {
    newErrors.passwordConfirm = 'Konfirmasi password wajib diisi'
  } else if (form.value.password !== form.value.passwordConfirm) {
    newErrors.passwordConfirm = 'Password tidak cocok'
  }

  if (!agreeTerms.value) {
    newErrors.terms = 'Anda harus menyetujui syarat dan ketentuan'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Handle register
const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    router.push('/login')
  }, 1500)
}

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<template>
  <div class="auth-page">
    <!-- Left Panel - Branding -->
    <div class="auth-branding">
      <div class="branding-content">
        <div class="brand-logo">
          <img class="logo-icon" :src="logoImg" alt="SITARA Logo" />
          <span class="brand-name">SITARA</span>
        </div>

        <div class="branding-illustration">
          <img :src="healthcareImg" alt="Tim Kesehatan SITARA" />
        </div>

        <div class="branding-text">
          <h2>Bergabunglah dengan SITARA</h2>
          <p>Daftarkan akun Anda untuk mulai memantau dan mengelola terapi pasien Tuberkulosis di wilayah Puskesmas Anda.</p>
        </div>
      </div>

      <div class="branding-dots"></div>
    </div>

    <!-- Right Panel - Register Form -->
    <div class="auth-form-panel">
      <div class="auth-form-wrapper">
        <div class="form-header">
          <h1>Buat akun baru</h1>
          <p>Daftarkan diri Anda sebagai admin Puskesmas untuk mengakses SITARA.</p>
        </div>

        <!-- Tab Switcher -->
        <div class="tab-switcher">
          <RouterLink to="/login" class="tab-item">Login</RouterLink>
          <RouterLink to="/register" class="tab-item active">Register</RouterLink>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="auth-form" novalidate>
          <!-- Nama Lengkap -->
          <div class="form-group" :class="{ 'has-error': errors.name }">
            <label for="reg-name">Nama Lengkap</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                id="reg-name"
                v-model="form.name"
                type="text"
                placeholder="Masukkan nama lengkap"
                :class="{ 'is-error': errors.name }"
                @input="clearError('name')"
              />
            </div>
            <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
          </div>

          <!-- Email -->
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <label for="reg-email">Email</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                </svg>
              </span>
              <input
                id="reg-email"
                v-model="form.email"
                type="email"
                placeholder="Masukkan email institusi"
                :class="{ 'is-error': errors.email }"
                @input="clearError('email')"
              />
            </div>
            <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
          </div>

          <!-- Two columns: Phone + Role -->
          <div class="form-row">
            <!-- Nomor Telepon -->
            <div class="form-group" :class="{ 'has-error': errors.phone }">
              <label for="reg-phone">Nomor Telepon</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <input
                  id="reg-phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  :class="{ 'is-error': errors.phone }"
                  @input="clearError('phone')"
                />
              </div>
              <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
            </div>

            <!-- Jabatan -->
            <div class="form-group" :class="{ 'has-error': errors.role }">
              <label for="reg-role">Jabatan</label>
              <div class="input-wrapper select-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </span>
                <select
                  id="reg-role"
                  v-model="form.role"
                  :class="{ 'is-error': errors.role, 'is-placeholder': !form.role }"
                  @change="clearError('role')"
                >
                  <option value="" disabled>Pilih jabatan</option>
                  <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </div>
              <span v-if="errors.role" class="error-text">{{ errors.role }}</span>
            </div>
          </div>

          <!-- Puskesmas -->
          <div class="form-group" :class="{ 'has-error': errors.puskesmas }">
            <label for="reg-puskesmas">Nama Puskesmas</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </span>
              <input
                id="reg-puskesmas"
                v-model="form.puskesmas"
                type="text"
                placeholder="Contoh: Puskesmas Sukajadi"
                :class="{ 'is-error': errors.puskesmas }"
                @input="clearError('puskesmas')"
              />
            </div>
            <span v-if="errors.puskesmas" class="error-text">{{ errors.puskesmas }}</span>
          </div>

          <!-- Two columns: Password + Confirm -->
          <div class="form-row">
            <!-- Password -->
            <div class="form-group" :class="{ 'has-error': errors.password }">
              <label for="reg-password">Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  id="reg-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 karakter"
                  :class="{ 'is-error': errors.password }"
                  @input="clearError('password')"
                />
                <button type="button" class="password-toggle" @click="showPassword = !showPassword" tabindex="-1">
                  <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>
              </div>
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" :class="{ 'has-error': errors.passwordConfirm }">
              <label for="reg-password-confirm">Konfirmasi Password</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </span>
                <input
                  id="reg-password-confirm"
                  v-model="form.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  placeholder="Ulangi password"
                  :class="{ 'is-error': errors.passwordConfirm }"
                  @input="clearError('passwordConfirm')"
                />
                <button type="button" class="password-toggle" @click="showPasswordConfirm = !showPasswordConfirm" tabindex="-1">
                  <svg v-if="!showPasswordConfirm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>
              </div>
              <span v-if="errors.passwordConfirm" class="error-text">{{ errors.passwordConfirm }}</span>
            </div>
          </div>

          <!-- Terms -->
          <div class="form-group">
            <label class="checkbox-wrapper" :class="{ 'has-error-check': errors.terms }">
              <input type="checkbox" v-model="agreeTerms" @change="clearError('terms')" />
              <span class="checkbox-label">
                Saya menyetujui <RouterLink to="/terms" class="terms-link" target="_blank">Syarat dan Ketentuan</RouterLink> serta <RouterLink to="/privacy" class="terms-link" target="_blank">Kebijakan Privasi</RouterLink>
              </span>
            </label>
            <span v-if="errors.terms" class="error-text">{{ errors.terms }}</span>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-register" :disabled="isLoading">
            <span v-if="isLoading" class="btn-spinner"></span>
            <span v-else>Daftar</span>
          </button>
        </form>

        <!-- Footer -->
        <p class="auth-footer-text">
          Sudah punya akun? 
          <RouterLink to="/login" class="signin-link">Login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  min-height: 100vh;
}

/* ===================== LEFT BRANDING PANEL ===================== */
.auth-branding {
  flex: 0 0 42%;
  max-width: 42%;
  background: linear-gradient(160deg, #002B3F 0%, #004D6E 40%, #006591 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 48px;
  position: relative;
  overflow: hidden;
}

.branding-content {
  position: relative;
  z-index: 2;
  max-width: 380px;
  width: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-icon {
  width: 36px;
  height: 36px;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.02em;
}

.branding-illustration img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.branding-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.3;
  margin: 0 0 12px;
}

.branding-text p {
  font-size: 0.875rem;
  color: #94A3B8;
  line-height: 1.6;
  margin: 0;
}

.branding-dots {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
}

/* ===================== RIGHT FORM PANEL ===================== */
.auth-form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  background-color: #FFFFFF;
  overflow-y: auto;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 500px;
}

.form-header {
  margin-bottom: 24px;
}

.form-header h1 {
  font-size: 1.625rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 8px;
}

.form-header p {
  font-size: 0.875rem;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
}

/* Tab Switcher */
.tab-switcher {
  display: flex;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  background-color: #F8FAFC;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748B;
  text-decoration: none;
  border-radius: 8px;
  transition: all 200ms ease;
}

.tab-item:hover {
  color: #1E293B;
}

.tab-item.active {
  background-color: #FFFFFF;
  color: #006591;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label:not(.checkbox-wrapper) {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  z-index: 1;
  pointer-events: none;
}

.input-icon svg {
  width: 17px;
  height: 17px;
}

.input-wrapper input,
.input-wrapper select {
  width: 100%;
  height: 44px;
  padding: 0 14px 0 42px;
  font-size: 0.8125rem;
  color: #1E293B;
  background-color: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  outline: none;
  transition: all 200ms ease;
  font-family: 'Inter', sans-serif;
}

.input-wrapper input::placeholder {
  color: #94A3B8;
}

.input-wrapper input:focus,
.input-wrapper select:focus {
  border-color: #006591;
  box-shadow: 0 0 0 3px rgba(0, 101, 145, 0.1);
}

.input-wrapper input.is-error,
.input-wrapper select.is-error {
  border-color: #EF4444;
}

/* Select styling */
.select-wrapper select {
  appearance: none;
  cursor: pointer;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.select-wrapper select.is-placeholder {
  color: #94A3B8;
}

.error-text {
  font-size: 0.7rem;
  color: #EF4444;
  margin-top: 1px;
}

/* Password Toggle */
.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #94A3B8;
  display: flex;
  align-items: center;
  transition: color 200ms ease;
}

.password-toggle:hover {
  color: #64748B;
}

.password-toggle svg {
  width: 16px;
  height: 16px;
}

/* Checkbox */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border: 1.5px solid #CBD5E1;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: all 200ms ease;
  flex-shrink: 0;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"]:checked {
  background-color: #006591;
  border-color: #006591;
}

.checkbox-wrapper input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.4;
}

.terms-link {
  color: #006591;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

/* Register Button */
.btn-register {
  width: 100%;
  height: 48px;
  background: linear-gradient(135deg, #006591 0%, #6DF5E1 100%);
  color: #FFFFFF;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 250ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 101, 145, 0.35);
}

.btn-register:active:not(:disabled) {
  transform: translateY(0);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Footer Text */
.auth-footer-text {
  text-align: center;
  margin-top: 24px;
  font-size: 0.875rem;
  color: #64748B;
}

.signin-link {
  color: #006591;
  font-weight: 600;
  text-decoration: none;
  transition: color 200ms ease;
}

.signin-link:hover {
  color: #004D6E;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1024px) {
  .auth-branding {
    flex: 0 0 38%;
    max-width: 38%;
    padding: 32px;
  }
}

@media (max-width: 768px) {
  .auth-page {
    flex-direction: column;
  }

  .auth-branding {
    flex: none;
    max-width: 100%;
    padding: 24px;
    min-height: auto;
  }

  .branding-content {
    max-width: 100%;
    text-align: center;
  }

  .brand-logo {
    justify-content: center;
    margin-bottom: 20px;
  }

  .branding-illustration {
    max-width: 260px;
    margin: 0 auto 20px;
  }

  .branding-text h2 {
    font-size: 1.25rem;
  }

  .auth-form-panel {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .auth-form-panel {
    padding: 20px 16px;
  }

  .form-header h1 {
    font-size: 1.375rem;
  }
}
</style>
