import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    sidebarCollapsed: false,
    sidebarMobileOpen: false,
    isDarkMode: false,
    breadcrumbs: []
  }),
  getters: {
    sidebarWidth: (state) => state.sidebarCollapsed ? '80px' : '260px'
  },
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    setSidebarCollapsed(value) {
      this.sidebarCollapsed = value;
    },
    toggleMobileSidebar() {
      this.sidebarMobileOpen = !this.sidebarMobileOpen;
    },
    closeMobileSidebar() {
      this.sidebarMobileOpen = false;
    },
    setBreadcrumbs(breadcrumbs) {
      this.breadcrumbs = breadcrumbs;
    },
    setDarkMode(value) {
      this.isDarkMode = value;
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
});
