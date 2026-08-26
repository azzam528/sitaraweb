<template>
  <header class="navbar">
    <div class="navbar-left">
      <button
        class="hamburger-btn"
        @click="toggleSidebar"
        aria-label="Toggle Sidebar"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="hamburger-icon"
        >
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            :class="{ 'opacity-0': uiStore.sidebarMobileOpen }"
          ></line>
          <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            :class="{ 'translate-y-1.5 rotate-45': uiStore.sidebarMobileOpen }"
          ></line>
          <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            :class="{
              '-translate-y-1.5 -rotate-45': uiStore.sidebarMobileOpen,
            }"
          ></line>
        </svg>
      </button>
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>

    <div class="navbar-right">
      <!-- Notification Dropdown Menu -->
      <div class="notification-menu" ref="notificationMenuRef">
        <button
          class="notification-btn"
          @click="toggleNotification"
          aria-label="Notifications"
          :class="{ 'is-active': notificationOpen }"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span v-if="unreadCount > 0" class="notification-badge">{{
            unreadCount
          }}</span>
        </button>

        <transition name="dropdown-fade">
          <div class="notification-dropdown" v-if="notificationOpen">
            <div class="notification-header">
              <h3>Notifikasi</h3>
              <button
                v-if="unreadCount > 0"
                class="mark-read-btn"
                @click="handleMarkAllAsRead"
              >
                Tandai dibaca
              </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingNotifications" class="notif-empty">
              <span class="text-xs text-muted">Memuat notifikasi...</span>
            </div>

            <!-- Empty State -->
            <div v-else-if="notifications.length === 0" class="notif-empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <p>Tidak ada notifikasi baru</p>
            </div>

            <!-- Notification Items List -->
            <div v-else class="notification-list">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                class="notification-item"
                :class="{ unread: !notif.is_read }"
                @click="handleNotificationClick(notif)"
              >
                <div class="notif-icon" :class="getNotifIconClass(notif.type)">
                  <!-- Complaint / Warning -->
                  <svg
                    v-if="notif.type === 'complaint'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <!-- Refill -->
                  <svg
                    v-else-if="notif.type === 'refill'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    ></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <!-- Video Verification -->
                  <svg
                    v-else-if="notif.type === 'video'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                  <!-- Medicine Schedule / Other -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div class="notif-content">
                  <p class="notif-title font-semibold">{{ notif.title }}</p>
                  <p class="notif-msg">{{ notif.message }}</p>
                  <span class="notif-time">{{
                    formatTimeAgo(notif.created_at)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- User Profile Menu -->
      <div class="profile-menu" ref="profileMenuRef">
        <button class="profile-btn" @click="toggleDropdown">
          <div class="avatar">
            <span>{{ userInitials }}</span>
          </div>
          <div class="profile-info">
            <span class="profile-name">{{ userName }}</span>
            <span class="profile-subtitle">{{ userRoleLabel }}</span>
          </div>
          <svg
            class="chevron"
            :class="{ 'is-open': dropdownOpen }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <transition name="dropdown-fade">
          <div class="dropdown-content" v-if="dropdownOpen">
            <RouterLink
              to="/dashboard/profile"
              class="dropdown-item"
              @click="dropdownOpen = false"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profil Saya
            </RouterLink>
            <div class="dropdown-divider"></div>
            <a
              href="#"
              class="dropdown-item text-danger"
              @click.prevent="handleLogout"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </a>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUiStore } from "@/stores/ui";
import { useNotificationStore } from "@/stores/notification";

const route = useRoute();
const router = useRouter();
const uiStore = useUiStore();
const notificationStore = useNotificationStore();

const dropdownOpen = ref(false);
const profileMenuRef = ref(null);
const notificationOpen = ref(false);
const notificationMenuRef = ref(null);

const notifications = computed(() => notificationStore.notifications);
const isLoadingNotifications = computed(() => notificationStore.loading);
const unreadCount = computed(() => notificationStore.unreadCount);

const pageTitle = computed(() => {
  return route.meta?.breadcrumb || "Dashboard";
});

// Current User info from Local Storage
const currentUser = ref(null);

const loadCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("sitara_user");
    if (userStr) {
      currentUser.value = JSON.parse(userStr);
    }
  } catch (e) {
    currentUser.value = null;
  }
};

const userName = computed(() => {
  return (
    currentUser.value?.name || currentUser.value?.username || "Tenaga Kesehatan"
  );
});

const userRoleLabel = computed(() => {
  const role = currentUser.value?.role;
  if (role === "doctor") return "Dokter Spesialis";
  if (role === "nurse") return "Perawat TB";
  if (role === "admin") return "Admin Puskesmas";
  if (role === "kader") return "Kader TB";
  return "Petugas Kesehatan";
});

const userInitials = computed(() => {
  const name = userName.value;
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});

// Load Notifications from store
const loadNotifications = async () => {
  await notificationStore.fetchNotifications();
};

const handleMarkAllAsRead = async () => {
  await notificationStore.markAllAsRead();
};

const handleNotificationClick = async (notif) => {
  if (!notif.is_read) {
    await notificationStore.markAsRead(notif.id);
  }
  notificationOpen.value = false;

  // Navigate based on type or reference_type
  if (notif.type === "complaint" || notif.reference_type === "complaint") {
    if (notif.reference_id) {
      router.push(`/dashboard/complaints/${notif.reference_id}`);
    } else {
      router.push("/dashboard/complaints");
    }
  } else if (notif.type === "refill" || notif.reference_type === "refill") {
    router.push("/dashboard/refill-requests");
  } else if (
    notif.type === "video" ||
    notif.reference_type === "video_verification"
  ) {
    router.push("/dashboard/video-verifications");
  } else if (
    notif.type === "medicine" ||
    notif.reference_type === "medicine_schedule"
  ) {
    router.push("/dashboard/medicines");
  }
};

const getNotifIconClass = (type) => {
  if (type === "complaint") return "danger";
  if (type === "refill") return "warning";
  if (type === "video") return "info";
  return "success";
};

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);

  // Tampilkan format tanggal dan waktu: "24 Agu 2024 14:30"
  const dateStr_formatted = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr_formatted = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateStr_formatted} ${timeStr_formatted}`;
};

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    uiStore.toggleMobileSidebar();
  } else {
    uiStore.toggleSidebar();
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  if (dropdownOpen.value) notificationOpen.value = false;
};

const toggleNotification = async () => {
  notificationOpen.value = !notificationOpen.value;
  if (notificationOpen.value) {
    dropdownOpen.value = false;
    await loadNotifications();
  }
};

const handleLogout = () => {
  dropdownOpen.value = false;
  localStorage.removeItem("sitara_token");
  localStorage.removeItem("sitara_user");
  window.location.href = "/login";
};

const closeDropdownOnOutsideClick = (e) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(e.target)) {
    dropdownOpen.value = false;
  }
  if (
    notificationMenuRef.value &&
    !notificationMenuRef.value.contains(e.target)
  ) {
    notificationOpen.value = false;
  }
};

let notifPollInterval = null;

onMounted(() => {
  loadCurrentUser();
  loadNotifications();
  document.addEventListener("click", closeDropdownOnOutsideClick);
  // Poll notifications every 30 seconds
  notifPollInterval = setInterval(loadNotifications, 30000);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownOnOutsideClick);
  if (notifPollInterval) clearInterval(notifPollInterval);
});
</script>

<style scoped>
.navbar {
  height: var(--navbar-height, 64px);
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
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
  color: var(--color-text-primary, #1e293b);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.hamburger-btn:hover {
  background-color: var(--color-bg, #f8fafc);
}

.hamburger-icon {
  width: 24px;
  height: 24px;
}

.hamburger-icon line {
  transition: all 0.3s ease;
  transform-origin: center;
}

.opacity-0 {
  opacity: 0;
}
.translate-y-1\.5 {
  transform: translateY(6px);
}
.-translate-y-1\.5 {
  transform: translateY(-6px);
}
.rotate-45 {
  transform: rotate(45deg) translateY(6px);
}
.-rotate-45 {
  transform: rotate(-45deg) translateY(-6px);
}

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-primary, #1e293b);
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
  color: var(--color-text-muted, #64748b);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.notification-btn:hover {
  background-color: var(--color-bg, #f8fafc);
  color: var(--color-text-primary, #1e293b);
}

.notification-btn svg {
  width: 20px;
  height: 20px;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 6px;
  background-color: var(--color-danger, #ef4444);
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
  border: 2px solid #ffffff;
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
  background-color: var(--color-bg, #f8fafc);
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #006591 0%, #004d6e 100%);
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
  color: var(--color-text-primary, #1e293b);
}

.profile-subtitle {
  font-size: 0.75rem;
  color: var(--color-text-muted, #64748b);
}

.chevron {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted, #64748b);
  transition: transform 0.2s ease;
}

.chevron.is-open {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 12px;
  box-shadow: var(
    --shadow-lg,
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05)
  );
  padding: 8px 0;
  z-index: 50;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: var(--color-text-primary, #1e293b);
  text-decoration: none;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.dropdown-item svg {
  width: 16px;
  height: 16px;
  color: var(--color-text-muted, #64748b);
}

.dropdown-item:hover {
  background-color: var(--color-bg, #f8fafc);
}

.dropdown-item.text-danger {
  color: var(--color-danger, #ef4444);
}

.dropdown-item.text-danger svg {
  color: var(--color-danger, #ef4444);
}

.dropdown-item.text-danger:hover {
  background-color: rgba(239, 68, 68, 0.05);
}

.dropdown-divider {
  height: 1px;
  background-color: var(--color-border, #e2e8f0);
  margin: 4px 0;
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
  background-color: #ffffff;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 12px;
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  background-color: var(--color-bg, #f8fafc);
}

.notification-header h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-primary, #1e293b);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--color-primary, #006591);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notif-empty {
  padding: 2.5rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.notif-empty p {
  margin: 0;
}

.notification-list {
  max-height: 380px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  transition: background-color 0.2s;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: var(--color-bg, #f8fafc);
}

.notification-item.unread {
  background-color: #f0f9ff;
}

.notification-item.unread:hover {
  background-color: #e0f2fe;
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
  background-color: #fef3c7;
  color: #d97706;
}

.notif-icon.danger {
  background-color: #fee2e2;
  color: #dc2626;
}

.notif-icon.info {
  background-color: #e0f2fe;
  color: #0284c7;
}

.notif-icon.success {
  background-color: #dcfce7;
  color: #16a34a;
}

.notif-content {
  flex: 1;
}

.notif-title {
  margin: 0 0 2px 0;
  font-size: 0.8125rem;
  color: var(--color-text-primary, #0f172a);
}

.notif-msg {
  margin: 0 0 4px 0;
  font-size: 0.8125rem;
  color: var(--color-text-primary, #334155);
  line-height: 1.35;
}

.notif-time {
  font-size: 0.6875rem;
  color: var(--color-text-muted, #64748b);
}

@media (max-width: 767.98px) {
  .profile-info { display: none; }
  .chevron { display: none; }
  .page-title { display: none; }
  .notification-dropdown {
    width: 290px;
    right: -50px;
  }
}

@media (max-width: 380px) {
  .notification-dropdown {
    width: 260px;
    right: -40px;
  }
}
</style>
