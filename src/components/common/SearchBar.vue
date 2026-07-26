<template>
  <div class="search-bar">
    <div class="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </div>
    <input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="search-input"
      @input="handleInput"
    />
    <button 
      v-if="modelValue" 
      class="clear-btn" 
      @click="clearSearch"
      aria-label="Clear search"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Cari...'
  },
  debounce: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue', 'search'])
let timeoutId = null

const handleInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  
  if (timeoutId) clearTimeout(timeoutId)
  
  timeoutId = setTimeout(() => {
    emit('search', value)
  }, props.debounce)
}

const clearSearch = () => {
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<style scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #94A3B8;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 40px;
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: var(--color-background, #F8FAFC);
  border: 1px solid var(--color-border-light, #E2E8F0);
  border-radius: var(--radius-md, 12px);
  outline: none;
  transition: all 0.2s ease;
  color: #1E293B;
}

.search-input:focus {
  background-color: var(--color-card, #FFFFFF);
  border-color: var(--color-primary, #006591);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.clear-btn:hover {
  color: #475569;
  background-color: #E2E8F0;
}
</style>
