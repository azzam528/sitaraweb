<script setup>
import { RouterLink } from 'vue-router'
import './ForgotPasswordView.css'
import { useForgotPasswordView } from './ForgotPasswordView.js'

const {
  isSuccess,
  identifier,
  newPassword,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  isLoading,
  errorMessage,
  handleResetPassword,
  goToLogin
} = useForgotPasswordView()
</script>

<template>
  <div class="forgot-page">
    <div class="auth-header">
      <div class="forgot-icon-wrapper">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h1 class="auth-title">Reset Password Akun</h1>
      <p class="auth-subtitle">
        {{ !isSuccess ? 'Masukkan identitas akun dan buat kata sandi baru untuk akun SITARA Anda.' : 'Password akun Anda telah berhasil diperbarui!' }}
      </p>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="error-banner">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Form Reset Password Langsung (Tanpa Token) -->
    <form v-if="!isSuccess" class="auth-form" @submit.prevent="handleResetPassword">
      <!-- Identifier -->
      <div class="form-group">
        <label for="identifier">Username / NIK / Email Akun</label>
        <div class="input-wrapper">
          <svg class="input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <input
            id="identifier"
            v-model="identifier"
            type="text"
            placeholder="Masukkan Username, NIK, atau Email..."
            class="form-input with-icon"
            required
          />
        </div>
      </div>

      <!-- Password Baru -->
      <div class="form-group">
        <label for="new-pass">Password Baru</label>
        <div class="input-wrapper">
          <svg class="input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <input
            id="new-pass"
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Minimal 8 karakter"
            class="form-input with-icon"
            required
          />
          <button type="button" class="btn-toggle-eye" @click="showPassword = !showPassword" tabindex="-1">
            <svg v-if="!showPassword" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Konfirmasi Password Baru -->
      <div class="form-group">
        <label for="confirm-pass">Konfirmasi Password Baru</label>
        <div class="input-wrapper">
          <svg class="input-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <input
            id="confirm-pass"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Ulangi password baru"
            class="form-input with-icon"
            required
          />
          <button type="button" class="btn-toggle-eye" @click="showConfirmPassword = !showConfirmPassword" tabindex="-1">
            <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      <button type="submit" class="btn-submit" :disabled="isLoading">
        <span v-if="isLoading" class="btn-spinner"></span>
        <span v-else>Simpan Password Baru</span>
      </button>
    </form>

    <!-- Success State -->
    <div v-else class="success-box">
      <div class="success-icon-badge">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 class="success-title">Password Berhasil Diperbarui!</h3>
      <p class="success-desc">
        Kata sandi baru Anda telah aktif. Silakan gunakan password baru ini untuk masuk ke aplikasi SITARA.
      </p>
      <button type="button" class="btn-submit" @click="goToLogin">
        Masuk ke Akun Anda
      </button>
    </div>

    <!-- Back to Login Link -->
    <div class="auth-footer-nav">
      <RouterLink to="/login" class="back-login-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Kembali ke Halaman Login</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped src="./ForgotPasswordView.css"></style>
