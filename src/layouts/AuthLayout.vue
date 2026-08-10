<script setup>
import { computed } from 'vue'
import { useRoute, RouterView, RouterLink } from 'vue-router'
import healthcareImg from '@/assets/images/healthcare-team.png'
import logoImg from '@/assets/images/logo.png'

const route = useRoute()

const isRegister = computed(() => route.path.includes('register'))

const headerTitle = computed(() => isRegister.value ? 'Daftar akun baru' : 'Masuk ke akun Anda')
const headerSubtitle = computed(() => isRegister.value 
  ? 'Buat akun petugas puskesmas untuk mulai mengelola pasien TB.' 
  : 'Masuk untuk mengakses dashboard monitoring pasien TB Puskesmas Anda.')
</script>

<template>
  <div class="auth-page">
    <!-- Left Panel - Branding (PERMANENT & FIXED) -->
    <div class="auth-branding">
      <div class="branding-content">
        <!-- Logo matching Sidebar styling -->
        <div class="brand-logo">
          <img class="logo-icon" :src="logoImg" alt="SITARA Logo" />
          <div class="logo-text">
            <h1>SITARA <span class="highlight">TB</span></h1>
            <p>MONITORING SYSTEM</p>
          </div>
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

    <!-- Right Panel - Form Container with Card -->
    <div class="auth-form-panel">
      <div class="auth-form-card">
        <!-- Header (Fixed Top Position) -->
        <div class="form-header">
          <h1>{{ headerTitle }}</h1>
          <p>{{ headerSubtitle }}</p>
        </div>

        <!-- Sliding Tab Switcher (Fixed Position) -->
        <div class="tab-switcher">
          <div class="tab-pill" :class="{ 'is-register': isRegister }"></div>
          <RouterLink to="/login" class="tab-item" :class="{ active: !isRegister }">Login</RouterLink>
          <RouterLink to="/register" class="tab-item" :class="{ active: isRegister }">Daftar</RouterLink>
        </div>

        <!-- ONLY Form Fields Component Slides -->
        <div class="form-fields-container">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  min-height: 100vh;
  background-color: #F8FAFC;
  overflow-x: hidden;
}

/* ===================== LEFT BRANDING PANEL (FIXED & PERMANENT) ===================== */
.auth-branding {
  flex: 0 0 460px;
  width: 460px;
  max-width: 460px;
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
  max-width: 400px;
  width: 100%;
}

/* Logo styling matching Sidebar */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 40px;
  padding-left: 16px; /* Menjorok sedikit ke dalam */
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  object-fit: cover;
}

.logo-text h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 1.1;
  margin: 0;
  letter-spacing: 0.02em;
}

.logo-text .highlight {
  color: #FFFFFF;
  padding-left: 4px;
  display: inline-block;
}

.logo-text p {
  font-size: 0.65rem;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 0.08em;
  margin: 2px 0 0 0;
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

/* ===================== RIGHT FORM PANEL WITH CARD ===================== */
.auth-form-panel {
  flex: 1;
  display: flex;
  align-items: flex-start; /* FIXES VERTICAL SHIFTING! Header stays fixed at top */
  justify-content: center;
  padding: 60px 48px 48px;
  background-color: #F8FAFC;
  min-height: 100vh;
  overflow-y: auto;
}

.auth-form-card {
  width: 100%;
  max-width: 560px;
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.03);
  padding: 40px;
}

/* Header */
.form-header {
  margin-bottom: 24px;
}

.form-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
}

.form-header p {
  font-size: 0.9rem;
  color: #64748B;
  margin: 0;
  line-height: 1.5;
  transition: color 0.2s ease;
}

/* Interactive Sliding Tab Switcher (FIXED WIDTH & POSITION) */
.tab-switcher {
  position: relative;
  display: flex;
  background-color: #F1F5F9;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 28px;
  border: 1px solid #E2E8F0;
  width: 100%;
}

.tab-pill {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.tab-pill.is-register {
  transform: translateX(100%);
}

.tab-item {
  position: relative;
  z-index: 2;
  flex: 1;
  text-align: center;
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748B;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s ease;
}

.tab-item:hover {
  color: #1E293B;
}

.tab-item.active {
  color: #006591;
}

.form-fields-container {
  width: 100%;
}

/* ===================== SLIDE & FADE TRANSITION FOR FORM INPUTS ===================== */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 900px) {
  .auth-page {
    flex-direction: column;
  }

  .auth-branding {
    flex: none;
    width: 100%;
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
    padding-left: 0;
  }

  .branding-illustration {
    max-width: 260px;
    margin: 0 auto 24px;
  }

  .auth-form-panel {
    padding: 32px 16px;
    min-height: auto;
  }

  .auth-form-card {
    padding: 24px 20px;
  }
}
</style>
