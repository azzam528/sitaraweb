<script setup>
import { ref, computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import healthcareImg from '@/assets/images/healthcare-team.png'
import logoImg from '@/assets/images/logo.png'

const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errors = ref({})

// Validation
const validateForm = () => {
  const newErrors = {}

  if (!email.value.trim()) {
    newErrors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newErrors.email = 'Format email tidak valid'
  }

  if (!password.value) {
    newErrors.password = 'Password wajib diisi'
  } else if (password.value.length < 6) {
    newErrors.password = 'Password minimal 6 karakter'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

// Handle login
const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true

  // Simulate API call
  setTimeout(() => {
    // Simpan dummy token
    localStorage.setItem('sitara_token', 'dummy-token-sitara-2024')
    localStorage.setItem('sitara_user', JSON.stringify({
      id: 1,
      name: 'Admin Puskesmas',
      email: email.value,
      role: 'kepala_puskesmas',
      puskesmas: 'Puskesmas Sukajadi'
    }))

    isLoading.value = false
    router.push('/dashboard')
  }, 1500)
}

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value
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
          <h2>Tingkatkan dampak dalam pelayanan kesehatan</h2>
          <p>Pantau dan kelola terapi pasien Tuberkulosis secara real-time. Kontrol data pasien, jadwal pengobatan, dan verifikasi kepatuhan dengan mudah.</p>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="branding-dots"></div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="auth-form-panel">
      <div class="auth-form-wrapper">
        <div class="form-header">
          <h1>Masuk ke akun Anda</h1>
          <p>Masuk untuk mengakses dashboard monitoring pasien TB Puskesmas Anda.</p>
        </div>

        <!-- Tab Switcher -->
        <div class="tab-switcher">
          <RouterLink to="/login" class="tab-item active">Login</RouterLink>
          <RouterLink to="/register" class="tab-item">Register</RouterLink>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="auth-form" novalidate>
          <!-- Email -->
          <div class="form-group" :class="{ 'has-error': errors.email }">
            <label for="login-email">Email</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                </svg>
              </span>
              <input
                id="login-email"
                v-model="email"
                type="email"
                placeholder="Masukkan email institusi Anda"
                :class="{ 'is-error': errors.email }"
                @input="errors.email = ''"
              />
            </div>
            <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
          </div>

          <!-- Password -->
          <div class="form-group" :class="{ 'has-error': errors.password }">
            <label for="login-password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </span>
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :class="{ 'is-error': errors.password }"
                @input="errors.password = ''"
              />
              <button type="button" class="password-toggle" @click="togglePassword" tabindex="-1">
                <!-- Eye icon -->
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <!-- Eye off icon -->
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
          </div>

          <!-- Remember & Forgot -->
          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              <span class="checkbox-label">Ingat Saya</span>
            </label>
            <a href="#" class="forgot-link">Lupa Password?</a>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-login" :disabled="isLoading">
            <span v-if="isLoading" class="btn-spinner"></span>
            <span v-else>Login</span>
          </button>
        </form>

        <!-- Footer -->
        <p class="auth-footer-text">
          Belum punya akun? 
          <RouterLink to="/register" class="signup-link">Daftar</RouterLink>
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
  flex: 0 0 45%;
  max-width: 45%;
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
  max-width: 420px;
  width: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
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
  font-size: 1.75rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.3;
  margin: 0 0 12px;
}

.branding-text p {
  font-size: 0.9rem;
  color: #94A3B8;
  line-height: 1.6;
  margin: 0;
}

/* Decorative dots */
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
  padding: 48px;
  background-color: #FFFFFF;
}

.auth-form-wrapper {
  width: 100%;
  max-width: 420px;
}

/* Header */
.form-header {
  margin-bottom: 32px;
}

.form-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 8px;
}

.form-header p {
  font-size: 0.9rem;
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
  margin-bottom: 28px;
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
  gap: 20px;
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

.input-wrapper input {
  width: 100%;
  height: 48px;
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

.input-wrapper input::placeholder {
  color: #94A3B8;
}

.input-wrapper input:focus {
  border-color: #006591;
  box-shadow: 0 0 0 3px rgba(0, 101, 145, 0.1);
}

.input-wrapper input.is-error {
  border-color: #EF4444;
}

.input-wrapper input.is-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
  transition: color 200ms ease;
}

.password-toggle:hover {
  color: #64748B;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

/* Remember & Forgot */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.8125rem;
  color: #475569;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 1.5px solid #CBD5E1;
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  transition: all 200ms ease;
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

.forgot-link {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #006591;
  text-decoration: none;
  transition: color 200ms ease;
}

.forgot-link:hover {
  color: #004D6E;
}

/* Login Button */
.btn-login {
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
  font-family: inherit;
  margin-top: 4px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0, 101, 145, 0.35);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Spinner */
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
  margin-top: 28px;
  font-size: 0.875rem;
  color: #64748B;
}

.signup-link {
  color: #006591;
  font-weight: 600;
  text-decoration: none;
  transition: color 200ms ease;
}

.signup-link:hover {
  color: #004D6E;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1024px) {
  .auth-branding {
    flex: 0 0 40%;
    max-width: 40%;
    padding: 32px;
  }

  .branding-text h2 {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .auth-page {
    flex-direction: column;
  }

  .auth-branding {
    flex: none;
    max-width: 100%;
    padding: 32px 24px;
    min-height: auto;
  }

  .branding-content {
    max-width: 100%;
    text-align: center;
  }

  .brand-logo {
    justify-content: center;
    margin-bottom: 24px;
  }

  .branding-illustration {
    max-width: 300px;
    margin: 0 auto 24px;
  }

  .branding-text h2 {
    font-size: 1.25rem;
  }

  .branding-text p {
    font-size: 0.8125rem;
  }

  .auth-form-panel {
    padding: 32px 24px;
  }
}

@media (max-width: 480px) {
  .auth-form-panel {
    padding: 24px 16px;
  }

  .form-header h1 {
    font-size: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>