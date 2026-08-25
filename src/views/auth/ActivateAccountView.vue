<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import authService from '@/services/auth.service'
import './ForgotPasswordView.css'

const route = useRoute()
const router = useRouter()

const token = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

onMounted(() => {
  if (route.query.token) {
    token.value = String(route.query.token)
  }
})

const handleActivate = async () => {
  errorMessage.value = ''

  if (!token.value.trim()) {
    errorMessage.value = 'Token aktivasi tidak ditemukan atau tidak valid. Silakan gunakan link yang dikirimkan melalui WhatsApp.'
    return
  }

  if (!newPassword.value) {
    errorMessage.value = 'Password baru wajib diisi.'
    return
  }

  if (newPassword.value.length < 8) {
    errorMessage.value = 'Password minimal harus 8 karakter.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Konfirmasi password tidak cocok.'
    return
  }

  isLoading.value = true
  try {
    await authService.activate({
      token: token.value.trim(),
      new_password: newPassword.value
    })
    isSuccess.value = true
  } catch (err) {
    console.error('Activation failed:', err)
    errorMessage.value = err?.response?.data?.detail || 'Gagal mengaktifkan akun. Token mungkin telah kedaluwarsa atau sudah digunakan.'
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="forgot-page">
    <div class="auth-header">
      <div class="forgot-icon-wrapper" style="background: #f0fdf4; color: #16a34a; border-color: #bbf7d0;">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1 class="auth-title">Aktivasi Akun SITARA</h1>
      <p class="auth-subtitle">
        {{ !isSuccess ? 'Buat kata sandi baru untuk mengaktifkan akun pasien Anda di aplikasi SITARA.' : 'Akun Anda telah aktif dan siap digunakan!' }}
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

    <!-- Form Aktivasi -->
    <form v-if="!isSuccess" class="auth-form" @submit.prevent="handleActivate">
      <!-- Token Input (Hidden if present or visible if manual) -->
      <div v-if="!route.query.token" class="form-group">
        <label for="token-input">Kode / Token Aktivasi</label>
        <input
          id="token-input"
          v-model="token"
          type="text"
          placeholder="Tempel token aktivasi dari WhatsApp..."
          class="form-input font-mono"
          required
        />
      </div>

      <!-- Password Baru -->
      <div class="form-group">
        <label for="act-pass">Password Baru</label>
        <div class="input-wrapper">
          <input
            id="act-pass"
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Minimal 8 karakter"
            class="form-input"
            required
          />
          <button type="button" class="btn-toggle-eye" @click="showPassword = !showPassword">
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

      <!-- Konfirmasi Password -->
      <div class="form-group">
        <label for="act-confirm">Konfirmasi Password Baru</label>
        <div class="input-wrapper">
          <input
            id="act-confirm"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Ulangi password baru"
            class="form-input"
            required
          />
          <button type="button" class="btn-toggle-eye" @click="showConfirmPassword = !showConfirmPassword">
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
        <span v-else>Aktifkan Akun Sekarang</span>
      </button>
    </form>

    <!-- Sukses State -->
    <div v-else class="success-box">
      <div class="success-icon-badge">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 class="success-title">Akun Berhasil Diaktifkan!</h3>
      <p class="success-desc">
        Password Anda telah tersimpan dengan aman. Sekarang Anda dapat masuk ke aplikasi SITARA untuk memantau pengobatan TB harian.
      </p>
      <button type="button" class="btn-submit" @click="goToLogin">
        Masuk ke Akun SITARA
      </button>
    </div>

    <!-- Back to Login Link -->
    <div class="auth-footer-nav">
      <RouterLink to="/login" class="back-login-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span>Ke Halaman Login</span>
      </RouterLink>
    </div>
  </div>
</template>
