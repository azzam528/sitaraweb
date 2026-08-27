<template>
  <div class="base-select-wrapper">
    <div class="select-container" :class="{ 'has-error': error, 'is-disabled': disabled }">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        class="base-select"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option value="" disabled hidden></option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <label v-if="label" :for="id" class="floating-label" :class="{ 'is-active': modelValue !== '' }">
        {{ label }} <span v-if="required" class="required-mark">*</span>
      </label>
      <div class="select-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substring(2, 9)}`
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-family: var(--font-family-base, 'Plus Jakarta Sans', 'Inter', sans-serif);
}

.select-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.base-select {
  width: 100%;
  height: 44px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--color-card, #FFFFFF);
  border: 1px solid var(--color-border-light, #E2E8F0);
  border-radius: var(--radius-md, 12px);
  outline: none;
  appearance: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.base-select:focus {
  border-color: var(--color-primary, #006591);
  box-shadow: 0 0 0 3px rgba(0, 101, 145, 0.12);
}

.has-error .base-select {
  border-color: var(--color-danger, #EF4444);
}
.has-error .base-select:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.floating-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-card, #FFFFFF);
  padding: 0 0.25rem;
  color: #64748B;
  font-size: 1rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.base-select:focus ~ .floating-label,
.floating-label.is-active {
  top: 0;
  font-size: 0.75rem;
  color: var(--color-primary, #006591);
}

.has-error .floating-label {
  color: var(--color-danger, #EF4444);
}

.required-mark {
  color: var(--color-danger, #EF4444);
}

.select-arrow {
  position: absolute;
  right: 1rem;
  pointer-events: none;
  color: #64748B;
  display: flex;
  align-items: center;
}

.is-disabled .base-select {
  background-color: var(--color-background, #F8FAFC);
  color: #94A3B8;
  cursor: not-allowed;
}
.is-disabled .floating-label {
  background-color: transparent;
}

.error-message {
  font-size: 0.75rem;
  color: var(--color-danger, #EF4444);
}
</style>
