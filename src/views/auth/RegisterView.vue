<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

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
  }, 1200)
}

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}
</script>

<template>
  <div class="register-fields">
    <!-- Register Form Fields -->
    <form @submit.prevent="handleRegister" class="auth-form" novalidate>
      <!-- Full Name -->
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
            placeholder="dr. Ahmad Hidayat"
            :class="{ 'is-error': errors.name }"
            @input="clearError('name')"
          />
        </div>
        <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
      </div>

      <!-- Email & Phone Grid -->
      <div class="form-row">
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
              placeholder="email@puskesmas.go.id"
              :class="{ 'is-error': errors.email }"
              @input="clearError('email')"
            />
          </div>
          <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
        </div>

        <!-- Phone -->
        <div class="form-group" :class="{ 'has-error': errors.phone }">
          <label for="reg-phone">No. Telepon / WhatsApp</label>
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
              placeholder="08123456789"
              :class="{ 'is-error': errors.phone }"
              @input="clearError('phone')"
            />
          </div>
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Role & Puskesmas Grid -->
      <div class="form-row">
        <!-- Role -->
        <div class="form-group" :class="{ 'has-error': errors.role }">
          <label for="reg-role">Jabatan</label>
          <div class="input-wrapper select-wrapper">
            <span class="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <select
              id="reg-role"
              v-model="form.role"
              :class="{ 'is-error': errors.role }"
              @change="clearError('role')"
            >
              <option value="" disabled>Pilih Jabatan</option>
              <option v-for="opt in roleOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
          <span v-if="errors.role" class="error-text">{{ errors.role }}</span>
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
              placeholder="Puskesmas Sukajadi"
              :class="{ 'is-error': errors.puskesmas }"
              @input="clearError('puskesmas')"
            />
          </div>
          <span v-if="errors.puskesmas" class="error-text">{{ errors.puskesmas }}</span>
        </div>
      </div>

      <!-- Password & Confirm Grid -->
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
              placeholder="Min 8 karakter"
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
        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="agreeTerms" @change="clearError('terms')" />
          <span class="checkbox-label">
            Saya menyetujui <RouterLink to="/terms" class="terms-link" target="_blank">Syarat &amp; Ketentuan</RouterLink> serta <RouterLink to="/privacy" class="terms-link" target="_blank">Kebijakan Privasi</RouterLink>
          </span>
        </label>
        <span v-if="errors.terms" class="error-text">{{ errors.terms }}</span>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-register" :disabled="isLoading">
        <span v-if="isLoading" class="btn-spinner"></span>
        <span v-else>Daftar Akun</span>
      </button>
    </form>

    <!-- Footer -->
    <p class="auth-footer-text">
      Sudah punya akun? 
      <RouterLink to="/login" class="signin-link">Login</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.register-fields {
  width: 100%;
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
  gap: 14px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
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
  width: 18px;
  height: 18px;
}

.input-wrapper input,
.input-wrapper select {
  width: 100%;
  height: 44px;
  padding: 0 14px 0 44px;
  font-size: 0.875rem;
  color: #1E293B;
  background-color: #FFFFFF;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  outline: none;
  transition: all 200ms ease;
  font-family: inherit;
}

.input-wrapper select {
  appearance: none;
  cursor: pointer;
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

.error-text {
  font-size: 0.75rem;
  color: #EF4444;
  margin-top: 2px;
}

/* Password Toggle */
.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #94A3B8;
  display: flex;
  align-items: center;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

/* Checkbox & Terms */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.4;
}

.checkbox-wrapper input[type="checkbox"] {
  margin-top: 2px;
  accent-color: #006591;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.terms-link {
  color: #006591;
  font-weight: 600;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

/* Button */
.btn-register {
  width: 100%;
  height: 46px;
  background: linear-gradient(135deg, #006591 0%, #004D6E 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 4px 12px rgba(0, 101, 145, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.btn-register:hover:not(:disabled) {
  background: linear-gradient(135deg, #0077AB 0%, #005A82 100%);
  box-shadow: 0 6px 16px rgba(0, 101, 145, 0.35);
  transform: translateY(-1px);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #FFFFFF;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer-text {
  text-align: center;
  margin-top: 20px;
  font-size: 0.875rem;
  color: #64748B;
}

.signin-link {
  color: #006591;
  font-weight: 600;
  text-decoration: none;
}

.signin-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
