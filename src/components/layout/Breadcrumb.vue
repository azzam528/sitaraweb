<template>
  <div class="breadcrumb-container">
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

  // Parent resolver
  if (route.meta?.parent) {
    if (typeof route.meta.parent === 'string') {
      try {
        const parentRoute = router.resolve({ name: route.meta.parent })
        if (parentRoute && parentRoute.path) {
          crumbs.push({
            name: parentRoute.meta?.breadcrumb || parentRoute.name || 'Daftar',
            path: parentRoute.path
          })
        }
      } catch (e) {
        console.warn('Could not resolve parent route:', route.meta.parent)
      }
    } else if (route.meta.parent.name && route.meta.parent.path) {
      crumbs.push(route.meta.parent)
    }
  }
  
  if (route.meta?.breadcrumb) {
    crumbs.push({ name: route.meta.breadcrumb, path: route.path })
  } else if (route.name) {
    crumbs.push({ name: route.name, path: route.path })
  }

  // Filter out any invalid/empty crumbs
  return crumbs.filter(c => c && c.name)
})
</script>

<style scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: var(--space-md, 16px) 0;
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
