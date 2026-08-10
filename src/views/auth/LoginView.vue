<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

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

  setTimeout(() => {
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
  }, 1200)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="login-fields">
    <!-- Login Form Fields -->
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
            <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
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
</template>

<style scoped>
.login-fields {
  width: 100%;
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
}

.checkbox-wrapper input[type="checkbox"] {
  accent-color: #006591;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.forgot-link {
  font-size: 0.8125rem;
  color: #006591;
  font-weight: 600;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Button */
.btn-login {
  width: 100%;
  height: 48px;
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
}

.btn-login:hover:not(:disabled) {
  background: linear-gradient(135deg, #0077AB 0%, #005A82 100%);
  box-shadow: 0 6px 16px rgba(0, 101, 145, 0.35);
  transform: translateY(-1px);
}

.btn-login:disabled {
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
  margin-top: 24px;
  font-size: 0.875rem;
  color: #64748B;
}

.signup-link {
  color: #006591;
  font-weight: 600;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>