<template>
  <button
    :class="[
      'base-button',
      `btn-${variant}`,
      `btn-${size}`,
      {
        'btn-block': block,
        'btn-icon': icon,
        'btn-loading': loading,
      }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <LoadingSpinner v-if="loading" size="sm" class="spinner-icon" />
    <span :class="{ 'opacity-0': loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary'|'secondary'|'success'|'warning'|'danger'|'outline'|'ghost'
  },
  size: {
    type: String,
    default: 'md' // 'sm'|'md'|'lg'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  icon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-family-base, 'Plus Jakarta Sans', 'Inter', sans-serif);
  font-weight: 500;
  border-radius: var(--radius-md, 12px);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  outline: none;
}

.base-button:focus-visible {
  box-shadow: 0 0 0 3px rgba(0, 101, 145, 0.25);
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Sizes */
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}
.btn-md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
.btn-icon {
  padding: 0.5rem;
  border-radius: 50%;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary, #006591);
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark, #005378);
  box-shadow: 0 4px 6px -1px rgba(0, 101, 145, 0.2);
}

.btn-secondary {
  background-color: var(--color-primary-dark, #004D6E);
  color: white;
}
.btn-secondary:hover:not(:disabled) {
  background-color: #00374F;
  box-shadow: 0 4px 6px -1px rgba(0, 77, 110, 0.2);
}

.btn-success {
  background-color: var(--color-success, #22C55E);
  color: white;
}
.btn-success:hover:not(:disabled) {
  background-color: #16a34a;
  box-shadow: 0 4px 6px -1px rgba(34, 197, 94, 0.2);
}

.btn-warning {
  background-color: var(--color-warning, #F59E0B);
  color: white;
}
.btn-warning:hover:not(:disabled) {
  background-color: #d97706;
  box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.2);
}

.btn-danger {
  background-color: var(--color-danger, #EF4444);
  color: white;
}
.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
  box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.2);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary, #006591);
  border-color: var(--color-primary, #006591);
}
.btn-outline:hover:not(:disabled) {
  background-color: rgba(0, 101, 145, 0.08);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-primary, #006591);
}
.btn-ghost:hover:not(:disabled) {
  background-color: rgba(0, 101, 145, 0.1);
}

/* Modifiers */
.btn-block {
  display: flex;
  width: 100%;
}

.opacity-0 {
  opacity: 0;
}
.spinner-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
