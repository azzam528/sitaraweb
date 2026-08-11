<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import authService from '../../services/auth.service'

const router = useRouter()

// ============================
// Form
// ============================

const form = ref({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'nakes'
})

// ============================
// UI State
// ============================

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const isLoading = ref(false)
const agreeTerms = ref(false)

const errors = ref({})

// ============================
// Clear Error
// ============================

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = ''
  }
}

// ============================
// Validation
// ============================

const validateForm = () => {
  const newErrors = {}

  // Username
  if (!form.value.username.trim()) {
    newErrors.username = 'Username wajib diisi'
  } else if (form.value.username.trim().length < 3) {
    newErrors.username = 'Username minimal 3 karakter'
  }

  // Email
  if (!form.value.email.trim()) {
    newErrors.email = 'Email wajib diisi'
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())
  ) {
    newErrors.email = 'Format email tidak valid'
  }

  // Password
  if (!form.value.password) {
    newErrors.password = 'Password wajib diisi'
  } else if (form.value.password.length < 6) {
    newErrors.password = 'Password minimal 6 karakter'
  }

  // Confirm Password
  if (!form.value.passwordConfirm) {
    newErrors.passwordConfirm = 'Konfirmasi password wajib diisi'
  } else if (
    form.value.password !== form.value.passwordConfirm
  ) {
    newErrors.passwordConfirm = 'Konfirmasi password tidak sama'
  }

  // Terms
  if (!agreeTerms.value) {
    newErrors.terms = 'Anda harus menyetujui Syarat & Ketentuan'
  }

  errors.value = newErrors

  return Object.keys(newErrors).length === 0
}

// ============================
// Register
// ============================

const handleRegister = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const payload = {
      username: form.value.username.trim(),
      email: form.value.email.trim(),
      password: form.value.password,
      role: 'nakes'
    }

    console.log('Register payload:', payload)

    const response = await authService.register(payload)

    console.log('Register success:', response.data)

    alert('Registrasi berhasil. Silakan login.')

    // Bersihkan form
    form.value = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 'nakes'
    }

    agreeTerms.value = false
    errors.value = {}

    // Redirect ke login
    router.push('/login')

  } catch (error) {
    console.error('Register error:', error)

    const status = error.response?.status
    const detail = error.response?.data?.detail

    // Error dari backend
    if (status === 400 || status === 409) {
      if (typeof detail === 'string') {
        alert(detail)
      } else {
        alert('Username atau email sudah digunakan.')
      }
    } else if (status === 422) {
      alert('Data registrasi tidak sesuai dengan format yang diminta backend.')
      console.error('Validation error:', error.response?.data)
    } else {
      alert('Registrasi gagal. Silakan coba lagi.')
    }

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-fields">

    <form
      @submit.prevent="handleRegister"
      class="auth-form"
      novalidate
    >

      <!-- ============================ -->
      <!-- Username -->
      <!-- ============================ -->

      <div
        class="form-group"
        :class="{ 'has-error': errors.username }"
      >
        <label for="reg-username">
          Username
        </label>

        <div class="input-wrapper">
          <span class="input-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>

          <input
            id="reg-username"
            v-model="form.username"
            type="text"
            placeholder="Masukkan username"
            autocomplete="username"
            :class="{ 'is-error': errors.username }"
            @input="clearError('username')"
          />
        </div>

        <span
          v-if="errors.username"
          class="error-text"
        >
          {{ errors.username }}
        </span>
      </div>


      <!-- ============================ -->
      <!-- Email -->
      <!-- ============================ -->

      <div
        class="form-group"
        :class="{ 'has-error': errors.email }"
      >
        <label for="reg-email">
          Email
        </label>

        <div class="input-wrapper">
          <span class="input-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
            </svg>
          </span>

          <input
            id="reg-email"
            v-model="form.email"
            type="email"
            placeholder="email@puskesmas.go.id"
            autocomplete="email"
            :class="{ 'is-error': errors.email }"
            @input="clearError('email')"
          />
        </div>

        <span
          v-if="errors.email"
          class="error-text"
        >
          {{ errors.email }}
        </span>
      </div>


      <!-- ============================ -->
      <!-- Password + Confirm Password -->
      <!-- ============================ -->

      <div class="form-row">

        <!-- Password -->

        <div
          class="form-group"
          :class="{ 'has-error': errors.password }"
        >
          <label for="reg-password">
            Password
          </label>

          <div class="input-wrapper">

            <span class="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                />

                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>

            <input
              id="reg-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Min 6 karakter"
              autocomplete="new-password"
              :class="{ 'is-error': errors.password }"
              @input="clearError('password')"
            />

            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              tabindex="-1"
            >

              <svg
                v-if="!showPassword"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>

              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                />
              </svg>

            </button>

          </div>

          <span
            v-if="errors.password"
            class="error-text"
          >
            {{ errors.password }}
          </span>

        </div>


        <!-- Confirm Password -->

        <div
          class="form-group"
          :class="{ 'has-error': errors.passwordConfirm }"
        >

          <label for="reg-password-confirm">
            Konfirmasi Password
          </label>

          <div class="input-wrapper">

            <span class="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>

            <input
              id="reg-password-confirm"
              v-model="form.passwordConfirm"
              :type="showPasswordConfirm ? 'text' : 'password'"
              placeholder="Ulangi password"
              autocomplete="new-password"
              :class="{ 'is-error': errors.passwordConfirm }"
              @input="clearError('passwordConfirm')"
            />

            <button
              type="button"
              class="password-toggle"
              @click="showPasswordConfirm = !showPasswordConfirm"
              tabindex="-1"
            >

              <svg
                v-if="!showPasswordConfirm"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>

              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                />
              </svg>

            </button>

          </div>

          <span
            v-if="errors.passwordConfirm"
            class="error-text"
          >
            {{ errors.passwordConfirm }}
          </span>

        </div>

      </div>


      <!-- ============================ -->
      <!-- Terms -->
      <!-- ============================ -->

      <div class="form-group">

        <label class="checkbox-wrapper">

          <input
            type="checkbox"
            v-model="agreeTerms"
            @change="clearError('terms')"
          />

          <span class="checkbox-label">
            Saya menyetujui

            <RouterLink
              to="/terms"
              class="terms-link"
              target="_blank"
            >
              Syarat & Ketentuan
            </RouterLink>

            serta

            <RouterLink
              to="/privacy"
              class="terms-link"
              target="_blank"
            >
              Kebijakan Privasi
            </RouterLink>
          </span>

        </label>

        <span
          v-if="errors.terms"
          class="error-text"
        >
          {{ errors.terms }}
        </span>

      </div>


      <!-- ============================ -->
      <!-- Submit -->
      <!-- ============================ -->

      <button
        type="submit"
        class="btn-register"
        :disabled="isLoading"
      >

        <span
          v-if="isLoading"
          class="btn-spinner"
        ></span>

        <span v-else>
          Daftar Akun
        </span>

      </button>

    </form>


    <!-- ============================ -->
    <!-- Footer -->
    <!-- ============================ -->

    <p class="auth-footer-text">

      Sudah punya akun?

      <RouterLink
        to="/login"
        class="signin-link"
      >
        Login
      </RouterLink>

    </p>

  </div>
</template>

<style scoped src="./RegisterView.css"></style>
