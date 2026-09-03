<template>
  <div class="sidebar-wrapper">
    <div 
      class="sidebar-overlay" 
      v-if="uiStore.sidebarMobileOpen" 
      @click="uiStore.closeMobileSidebar()"
    ></div>

    <aside 
      class="sidebar" 
      :class="{ 
        'is-collapsed': uiStore.sidebarCollapsed,
        'is-mobile-open': uiStore.sidebarMobileOpen
      }"
    >
      <div class="sidebar-header">
        <div class="logo-wrapper">
          <img class="logo-icon" :src="logoImg" alt="SITARA Logo" />
          <div class="logo-text" v-if="!uiStore.sidebarCollapsed">
            <h1>SITARA <span class="highlight">TB</span></h1>
            <p>MONITORING SYSTEM</p>
          </div>
        </div>
      </div>

      <nav class="sidebar-menu">
        <ul class="menu-list">
          <li v-for="item in currentMenu" :key="item.id" class="menu-item-wrapper">
            <!-- Menu tanpa children -->
            <RouterLink 
              v-if="!item.children"
              :to="item.path" 
              class="menu-link" 
              :class="{ 'is-active': isActive(item) }"
              :title="uiStore.sidebarCollapsed ? item.label : ''"
              @click="handleMenuClick"
            >
              <span class="menu-icon" v-html="item.icon"></span>
              <span class="menu-label" v-if="!uiStore.sidebarCollapsed">{{ item.label }}</span>
            </RouterLink>

            <!-- Menu dengan children (submenu) -->
            <template v-else>
              <button 
                class="menu-link submenu-trigger"
                :class="{ 'is-active': isActive(item), 'is-open': openSubmenu === item.id }"
                :title="uiStore.sidebarCollapsed ? item.label : ''"
                @click="toggleSubmenu(item.id)"
              >
                <span class="menu-icon" v-html="item.icon"></span>
                <span class="menu-label" v-if="!uiStore.sidebarCollapsed">{{ item.label }}</span>
                <svg 
                  v-if="!uiStore.sidebarCollapsed" 
                  class="chevron-icon"
                  :class="{ 'is-rotated': openSubmenu === item.id }"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <transition name="submenu">
                <ul v-if="openSubmenu === item.id && !uiStore.sidebarCollapsed" class="submenu-list">
                  <li v-for="child in item.children" :key="child.path">
                    <RouterLink 
                      :to="child.path" 
                      class="submenu-link"
                      :class="{ 'is-active': route.path === child.path }"
                      @click="handleMenuClick"
                    >
                      <span class="submenu-dot"></span>
                      <span>{{ child.label }}</span>
                    </RouterLink>
                  </li>
                </ul>
              </transition>
            </template>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer">
        <button 
          class="menu-link logout-btn" 
          @click="handleLogout"
          :title="uiStore.sidebarCollapsed ? 'Logout' : ''"
        >
          <span class="menu-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <span class="menu-label" v-if="!uiStore.sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { SIDEBAR_MENU, ADMIN_SIDEBAR_MENU } from '@/utils/constants'
import logoImg from '@/assets/images/logo.png'

const route = useRoute()
const router = useRouter()
const uiStore = useUiStore()
const authStore = useAuthStore()
const openSubmenu = ref(null)

const currentMenu = computed(() => {
  let rawRole = authStore.userRole || authStore.user?.role;
  
  if (!rawRole) {
    try {
      const userStr = localStorage.getItem('sitara_user');
      if (userStr) {
        const localUser = JSON.parse(userStr);
        rawRole = localUser?.role;
      }
    } catch (e) {
      console.error('Failed to parse sitara_user in Sidebar', e);
    }
  }

  const role = String(rawRole ?? '').toLowerCase();
  
  if (role === 'admin') {
    return ADMIN_SIDEBAR_MENU;
  }
  // Default fallback for Nakes
  return SIDEBAR_MENU;
})

const isActive = (item) => {
  if (item.path === '/dashboard' || item.path === '/dashboard/admin') {
    return route.path === item.path
  }
  // Check children paths too
  if (item.children) {
    return item.children.some(child => route.path.startsWith(child.path))
  }
  return route.path.startsWith(item.path)
}

const toggleSubmenu = (id) => {
  openSubmenu.value = openSubmenu.value === id ? null : id
}

const handleMenuClick = () => {
  // Close mobile sidebar on menu click
  if (uiStore.sidebarMobileOpen) {
    uiStore.closeMobileSidebar()
  }
}

const handleLogout = () => {
  localStorage.removeItem('sitara_token')
  localStorage.removeItem('sitara_user')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width, 260px);
  background: linear-gradient(180deg, #002B3F 0%, #004D6E 100%);
  display: flex;
  flex-direction: column;
  transition: width var(--transition-base, 250ms ease);
  z-index: var(--z-fixed, 1030);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.sidebar.is-collapsed {
  width: var(--sidebar-collapsed-width, 80px);
}

/* Header */
.sidebar-header {
  height: var(--navbar-height, 64px);
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 12px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: cover;
}

.sidebar.is-collapsed .logo-wrapper {
  justify-content: center;
  width: 100%;
  padding-left: 0;
}

.logo-text h1 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
}

.logo-text .highlight {
  color: #ffffff;
  padding-left: 4px;
  display: inline-block;
}

.logo-text p {
  font-size: 0.6rem;
  color: #64748B;
  margin: 0;
  letter-spacing: 0.12em;
  font-weight: 500;
}

/* Menu */
.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 0;
}

.sidebar-menu::-webkit-scrollbar {
  width: 4px;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item-wrapper {
  padding: 0 12px;
}

.menu-link {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 12px;
  color: #94A3B8;
  text-decoration: none;
  border-radius: var(--radius-md, 8px);
  transition: all var(--transition-fast, 150ms ease);
  gap: 12px;
  border-left: 3px solid transparent;
  white-space: nowrap;
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  border: none;
  background: none;
  text-align: left;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #E2E8F0;
}

.menu-link.is-active {
  background-color: rgba(109, 245, 225, 0.12);
  color: #FFFFFF;
  border-left: 3px solid #6DF5E1;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.menu-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.menu-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Chevron for submenu */
.chevron-icon {
  width: 16px;
  height: 16px;
  margin-left: auto;
  transition: transform var(--transition-fast, 150ms ease);
  flex-shrink: 0;
}

.chevron-icon.is-rotated {
  transform: rotate(180deg);
}

/* Collapsed state */
.sidebar.is-collapsed .menu-link {
  justify-content: center;
  padding: 0;
  border-left: none;
}

.sidebar.is-collapsed .menu-item-wrapper {
  padding: 0 16px;
}

/* Submenu */
.submenu-list {
  list-style: none;
  padding: 4px 0 4px 20px;
  margin: 0;
}

.submenu-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  color: #64748B;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 400;
  border-radius: var(--radius-sm, 6px);
  transition: all var(--transition-fast, 150ms ease);
}

.submenu-link:hover {
  color: #E2E8F0;
}

.submenu-link.is-active {
  color: #FFFFFF;
}

.submenu-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #475569;
  flex-shrink: 0;
  transition: background-color var(--transition-fast, 150ms ease);
}

.submenu-link.is-active .submenu-dot {
  background-color: #6DF5E1;
}

/* Submenu transition */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 200ms ease;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 200px;
}

/* Footer */
.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.logout-btn:hover {
  background-color: rgba(239, 68, 68, 0.1) !important;
  color: #EF4444 !important;
}

/* Overlay for mobile */
.sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-fixed, 1030) - 1);
  backdrop-filter: blur(4px);
}

@media (max-width: 767.98px) {
  .sidebar {
    transform: translateX(-100%);
    width: var(--sidebar-width, 260px) !important;
  }
  
  .sidebar.is-mobile-open {
    transform: translateX(0);
  }

  .sidebar-overlay {
    display: block;
  }
}
</style>
