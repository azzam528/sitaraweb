<template>
  <header class="navbar">
    <div class="navbar-left">
      <button 
        class="hamburger-btn" 
        @click="toggleSidebar"
        aria-label="Toggle Sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hamburger-icon">
          <line x1="3" y1="12" x2="21" y2="12" :class="{ 'opacity-0': uiStore.sidebarMobileOpen }"></line>
          <line x1="3" y1="6" x2="21" y2="6" :class="{ 'translate-y-1.5 rotate-45': uiStore.sidebarMobileOpen }"></line>
          <line x1="3" y1="18" x2="21" y2="18" :class="{ '-translate-y-1.5 -rotate-45': uiStore.sidebarMobileOpen }"></line>
        </svg>
      </button>
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>

    <div class="navbar-right">
      <div class="notification-menu" ref="notificationMenuRef">
        <button class="notification-btn" @click="toggleNotification" aria-label="Notifications" :class="{ 'is-active': notificationOpen }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span class="notification-badge">3</span>
        </button>

        <transition name="dropdown-fade">
          <div class="notification-dropdown" v-if="notificationOpen">
            <div class="notification-header">
              <h3>Notifikasi Terbaru</h3>
              <button class="mark-read-btn">Tandai dibaca</button>
            </div>
            <div class="notification-list">
              <div class="notification-item unread">
                <div class="notif-icon warning">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </div>
                <div class="notif-content">
                  <p><strong>Pasien TB-2023-089</strong> terlambat mengambil obat lebih dari 3 hari.</p>
                  <span class="notif-time">10 menit yang lalu</span>
                </div>
              </div>
              <div class="notification-item unread">
                <div class="notif-icon danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <div class="notif-content">
                  <p>Laporan keluhan efek samping berat dari <strong>Siti Aminah</strong>.</p>
                  <span class="notif-time">1 jam yang lalu</span>
                </div>
              </div>
              <div class="notification-item">
                <div class="notif-icon success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div class="notif-content">
                  <p>Video minum obat <strong>Ahmad Subarjo</strong> telah terverifikasi oleh AI.</p>
                  <span class="notif-time">3 jam yang lalu</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="profile-menu" ref="profileMenuRef">
        <button class="profile-btn" @click="toggleDropdown">
          <div class="avatar">
            <span>AP</span>
          </div>
          <div class="profile-info">
            <span class="profile-name">Admin Puskesmas</span>
            <span class="profile-subtitle">Puskesmas Sukajadi</span>
          </div>
          <svg class="chevron" :class="{ 'is-open': dropdownOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <transition name="dropdown-fade">
          <div class="dropdown-content" v-if="dropdownOpen">
            <RouterLink to="/dashboard/profile" class="dropdown-item" @click="dropdownOpen = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Profil
            </RouterLink>
            <a href="#" class="dropdown-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Ubah Password
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item text-danger" @click.prevent="handleLogout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const uiStore = useUiStore()
const dropdownOpen = ref(false)
const profileMenuRef = ref(null)
const notificationOpen = ref(false)
const notificationMenuRef = ref(null)

const pageTitle = computed(() => {
  return route.meta?.breadcrumb || 'Dashboard'
})

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    uiStore.toggleMobileSidebar()
  } else {
    uiStore.toggleSidebar()
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) notificationOpen.value = false
}

const toggleNotification = () => {
  notificationOpen.value = !notificationOpen.value
  if (notificationOpen.value) dropdownOpen.value = false
}

const handleLogout = () => {
  dropdownOpen.value = false
  localStorage.removeItem('sitara_token')
  localStorage.removeItem('sitara_user')
  window.location.href = '/login'
}

const closeDropdownOnOutsideClick = (e) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
  if (notificationMenuRef.value && !notificationMenuRef.value.contains(e.target)) {
    notificationOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdownOnOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnOutsideClick)
})
</script>

<style scoped>
.navbar {
  height: var(--navbar-height, 64px);
  background-color: #FFFFFF;
  border-bottom: 1px solid var(--color-border, #E2E8F0);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky, 40);
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.hamburger-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--color-text-primary, #1E293B);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.hamburger-btn:hover {
  background-color: var(--color-bg, #F8FAFC);
}

.hamburger-icon {
  width: 24px;
  height: 24px;
}

.hamburger-icon line {
  transition: all 0.3s ease;
  transform-origin: center;
}

.opacity-0 { opacity: 0; }
.translate-y-1\.5 { transform: translateY(6px); }
.-translate-y-1\.5 { transform: translateY(-6px); }
.rotate-45 { transform: rotate(45deg) translateY(6px); }
.-rotate-45 { transform: rotate(-45deg) translateY(-6px); }

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary, #1E293B);
  margin: 0;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: var(--color-text-muted, #64748B);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.notification-btn:hover {
  background-color: var(--color-bg, #F8FAFC);
  color: var(--color-text-primary, #1E293B);
}

.notification-btn svg {
  width: 20px;
  height: 20px;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  background-color: var(--color-danger, #EF4444);
  color: white;
  font-size: 0.625rem;
  font-weight: 700;
  height: 16px;
  min-width: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid #FFFFFF;
}

.profile-menu {
  position: relative;
}

.profile-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.profile-btn:hover {
  background-color: var(--color-bg, #F8FAFC);
}

.avatar {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary, #006591);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.profile-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary, #1E293B);
}

.profile-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted, #64748B);
}

.chevron {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted, #64748B);
  transition: transform 0.2s ease;
}

.chevron.is-open {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 12px;
  box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05));
  padding: 8px 0;
  z-index: 50;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: var(--color-text-primary, #1E293B);
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted, #64748B);
}

.dropdown-item:hover {
  background-color: var(--color-bg, #F8FAFC);
}

.dropdown-item.text-danger {
  color: var(--color-danger, #EF4444);
}

.dropdown-item.text-danger svg {
  color: var(--color-danger, #EF4444);
}

.dropdown-item.text-danger:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

.dropdown-divider {
  height: 1px;
  background-color: var(--color-border, #E2E8F0);
  margin: 4px 0;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 767.98px) {
  .profile-info {
    display: none;
  }
  .chevron {
    display: none;
  }
  .page-title {
    display: none;
  }
}

/* Notification Dropdown Styles */
.notification-menu {
  position: relative;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: -10px;
  margin-top: 12px;
  width: 340px;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--color-border, #E2E8F0);
  background-color: var(--color-bg, #F8FAFC);
}

.notification-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary, #1E293B);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--color-primary, #006591);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notification-list {
  max-height: 380px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--color-border, #E2E8F0);
  transition: background-color 0.2s;
  cursor: pointer;
}

.notification-item:hover {
  background-color: var(--color-bg, #F8FAFC);
}

.notification-item.unread {
  background-color: #F0F9FF;
}

.notification-item.unread:hover {
  background-color: #E0F2FE;
}

.notif-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.notif-icon.warning {
  background-color: #FEF3C7;
  color: #D97706;
}

.notif-icon.danger {
  background-color: #FEE2E2;
  color: #DC2626;
}

.notif-icon.success {
  background-color: #DCFCE7;
  color: #16A34A;
}

.notif-content {
  flex: 1;
}

.notif-content p {
  margin: 0 0 6px 0;
  font-size: 0.875rem;
  color: var(--color-text-primary, #1E293B);
  line-height: 1.4;
}

.notif-time {
  font-size: 0.75rem;
  color: var(--color-text-muted, #64748B);
}
</style>
