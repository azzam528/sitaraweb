<template>
  <BaseModal 
    :modelValue="modelValue" 
    @update:modelValue="$emit('update:modelValue', $event)"
    size="sm"
    :closable="!loading"
    :persistent="loading"
  >
    <div class="confirm-content">
      <div class="icon-container" :class="`icon-${variant}`">
        <svg v-if="variant === 'danger'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        <svg v-else-if="variant === 'warning'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </div>
      <h3 class="confirm-title">{{ title }}</h3>
      <p class="confirm-message">{{ message }}</p>
    </div>
    
    <template #footer>
      <div class="confirm-actions">
        <BaseButton 
          variant="outline" 
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </BaseButton>
        <BaseButton 
          :variant="variant" 
          @click="handleConfirm"
          :loading="loading"
        >
          {{ confirmText }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Konfirmasi'
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    default: 'Ya, Lanjutkan'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  },
  variant: {
    type: String,
    default: 'danger' // 'danger', 'warning', 'primary'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped>
.confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
  font-family: 'Inter', sans-serif;
}

.icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon-danger {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-danger, #DC2626);
}

.icon-warning {
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--color-warning, #D97706);
}

.icon-primary {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--color-primary, #006591);
}

.confirm-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
}

.confirm-message {
  margin: 0;
  color: #64748B;
  font-size: 0.875rem;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
}
</style>
