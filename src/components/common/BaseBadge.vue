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
  background-color: #E0F2FE;
  color: var(--color-primary, #006591);
  border: 1px solid #BAE6FD;
}

.badge-secondary {
  background-color: #F1F5F9;
  color: var(--color-secondary, #004D6E);
  border: 1px solid #E2E8F0;
}

.badge-success {
  background-color: #DCFCE7;
  color: var(--color-success, #16A34A);
  border: 1px solid #BBF7D0;
}

.badge-warning {
  background-color: #FEF3C7;
  color: var(--color-warning, #D97706);
  border: 1px solid #FDE68A;
}

.badge-danger {
  background-color: #FEE2E2;
  color: var(--color-danger, #DC2626);
  border: 1px solid #FECACA;
}

.badge-info {
  background-color: #E0F2FE;
  color: #0284C7;
  border: 1px solid #BAE6FD;
}
</style>
