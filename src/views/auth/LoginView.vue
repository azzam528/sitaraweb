<script src="./LoginView.js"></script>

<template>
  <div class="login-fields">
    <!-- Login Form Fields -->
    <form @submit.prevent="handleLogin" class="auth-form" novalidate>
      <!-- Username -->
      <div class="form-group" :class="{ 'has-error': errors.username }">
        <label for="login-username">Username</label>
        <div class="input-wrapper">
          <span class="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
            </svg>
          </span>
          <input
            id="login-username"
            v-model="username"
            type="text"
            placeholder="Masukkan username Anda"
          />
        </div>
        <span v-if="errors.username" class="error-text">{{ errors.username }}</span>
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

       <p v-if="errors.general" class="error-text">
        {{ errors.general }}
      </p>

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

<style scoped src="./LoginView.css"></style>