<template>
  <div class="main-layout" :class="{ 'sidebar-collapsed': uiStore.sidebarCollapsed }">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-wrapper">
        <Breadcrumb />
        <main class="page-content">
          <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </RouterView>
        </main>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Breadcrumb from '@/components/layout/Breadcrumb.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg, #F8FAFC);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: var(--sidebar-width, 260px);
  transition: margin-left 0.3s ease;
}

.main-layout.sidebar-collapsed .main-content {
  margin-left: var(--sidebar-collapsed-width, 80px);
}

.content-wrapper {
  flex: 1;
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px); /* Subtract navbar height */
}

.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767.98px) {
  .main-content {
    margin-left: 0 !important;
  }
}
</style>
