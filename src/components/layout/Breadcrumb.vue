<template>
  <div class="breadcrumb-container">
    <button 
      class="back-btn" 
      @click="handleBack"
      v-if="breadcrumbs.length > 1"
      aria-label="Go Back"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
    
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li v-for="(item, index) in breadcrumbs" :key="index" class="breadcrumb-item">
          <RouterLink v-if="index < breadcrumbs.length - 1 && item.path" :to="item.path" class="breadcrumb-link">
            {{ item.name }}
          </RouterLink>
          <span v-else class="breadcrumb-current">{{ item.name }}</span>
          
          <svg v-if="index < breadcrumbs.length - 1" class="separator" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const crumbs = [{ name: 'Dashboard', path: '/dashboard' }]
  
  if (route.path === '/dashboard' || route.path === '/') {
    return crumbs
  }

  // Example generic breadcrumb resolver
  if (route.meta?.parent) {
    crumbs.push({ name: route.meta.parent.name, path: route.meta.parent.path })
  }
  
  if (route.meta?.breadcrumb) {
    crumbs.push({ name: route.meta.breadcrumb, path: route.path })
  } else {
    // Fallback if no meta
    crumbs.push({ name: route.name || 'Page', path: route.path })
  }

  return crumbs
})

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: var(--space-md, 16px) 0;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #FFFFFF;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 8px;
  color: var(--color-text-primary, #1E293B);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
}

.back-btn:hover {
  background-color: var(--color-bg, #F8FAFC);
  color: var(--color-primary, #006591);
  border-color: var(--color-primary, #006591);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: var(--text-sm, 0.875rem);
}

.breadcrumb-link {
  color: var(--color-text-muted, #64748B);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--color-primary, #006591);
}

.breadcrumb-current {
  color: var(--color-text-primary, #1E293B);
  font-weight: 500;
}

.separator {
  width: 14px;
  height: 14px;
  color: var(--color-text-muted, #64748B);
  margin: 0 8px;
}
</style>
