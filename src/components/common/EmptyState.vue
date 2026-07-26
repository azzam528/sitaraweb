<template>
  <div class="empty-state">
    <div class="empty-icon-wrapper">
      <slot name="icon">
        <div v-if="icon" class="empty-icon" v-html="icon"></div>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="default-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
      </slot>
    </div>
    
    <h3 class="empty-title">{{ title }}</h3>
    <p v-if="description" class="empty-description">{{ description }}</p>
    
    <div class="empty-action" v-if="$slots.action || actionText">
      <slot name="action">
        <BaseButton v-if="actionText" @click="$emit('action')">
          {{ actionText }}
        </BaseButton>
      </slot>
    </div>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: {
    type: String,
    default: 'Tidak ada data'
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  actionText: {
    type: String,
    default: ''
  },
  actionRoute: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  height: 100%;
  min-height: 200px;
}

.empty-icon-wrapper {
  margin-bottom: 1rem;
  color: #94A3B8;
  background-color: #F1F5F9;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-icon {
  opacity: 0.5;
}

.empty-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
}

.empty-description {
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
  color: #64748B;
  max-width: 300px;
}

.empty-action {
  margin-top: 0.5rem;
}
</style>
