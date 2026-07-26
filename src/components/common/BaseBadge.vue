<template>
  <span 
    class="base-badge"
    :class="[
      `badge-${variant}`,
      `badge-${size}`,
      { 'is-rounded': rounded }
    ]"
  >
    <span v-if="dot" class="badge-dot"></span>
    <slot></slot>
  </span>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  },
  size: {
    type: String,
    default: 'sm' // 'sm', 'md'
  },
  rounded: {
    type: Boolean,
    default: false
  },
  dot: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 4px; /* default */
}

.is-rounded {
  border-radius: 9999px; /* pill shape */
}

/* Sizes */
.badge-sm {
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
}
.badge-md {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

/* Dot indicator */
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

/* Variants using soft backgrounds */
.badge-primary {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--color-primary, #006591);
}

.badge-secondary {
  background-color: rgba(30, 64, 175, 0.1);
  color: var(--color-secondary, #1E40AF);
}

.badge-success {
  background-color: rgba(34, 197, 94, 0.1);
  color: var(--color-success, #16A34A);
}

.badge-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-warning, #D97706);
}

.badge-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger, #DC2626);
}

.badge-info {
  background-color: rgba(6, 182, 212, 0.1);
  color: #0891B2;
}
</style>
