<template>
  <div class="statistic-card">
    <div class="stat-content">
      <div class="stat-info">
        <h4 class="stat-title">{{ title }}</h4>
        <div v-if="loading" class="skeleton-value"></div>
        <div v-else class="stat-value">{{ value }}</div>
        
        <div v-if="trend && !loading" class="stat-trend" :class="trend.direction">
          <svg v-if="trend.direction === 'up'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          <svg v-if="trend.direction === 'down'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
          <span>{{ trend.value }}%</span>
        </div>
      </div>
      
      <div class="stat-icon-wrapper" :class="`bg-${color}`">
        <div class="stat-icon" v-html="icon" v-if="icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  trend: {
    type: Object,
    default: null // { value: 12, direction: 'up' | 'down' }
  },
  color: {
    type: String,
    default: 'primary' // 'primary', 'success', 'warning', 'danger'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.statistic-card {
  background-color: var(--color-card, #FFFFFF);
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--color-border-light, #E2E8F0);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.statistic-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748B;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1E293B;
  line-height: 1.2;
}

.skeleton-value {
  height: 2.25rem;
  width: 80px;
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-trend.up {
  color: var(--color-success, #16A34A);
}

.stat-trend.down {
  color: var(--color-danger, #DC2626);
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Icon Background Colors */
.bg-primary {
  background-color: rgba(0, 101, 145, 0.12);
  color: var(--color-primary, #006591);
}

.bg-success {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--color-success, #16A34A);
}

.bg-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-warning, #D97706);
}

.bg-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger, #DC2626);
}
</style>
