<template>
  <div class="base-input-wrapper">
    <div class="input-container" :class="{ 'has-error': error, 'has-icon': icon, 'is-disabled': disabled }">
      <span v-if="icon" class="input-icon" v-html="icon"></span>
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder || ' '"
        :disabled="disabled"
        :required="required"
        class="base-input"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <label v-if="label" :for="id" class="floating-label">
        {{ label }} <span v-if="required" class="required-mark">*</span>
      </label>
      <button v-if="type === 'password'" type="button" class="password-toggle" @click="togglePassword">
        <!-- SVG for eye icon (simplified) -->
        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
      </button>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-family: var(--font-family-base, 'Plus Jakarta Sans', 'Inter', sans-serif);
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.base-input {
  width: 100%;
  height: 44px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--color-card, #FFFFFF);
  border: 1px solid var(--color-border-light, #E2E8F0);
  border-radius: var(--radius-md, 12px);
  outline: none;
  transition: all 0.2s ease;
}

.has-icon .base-input {
  padding-left: 2.5rem;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  color: #94A3B8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input:focus {
  border-color: var(--color-primary, #006591);
  box-shadow: 0 0 0 3px rgba(0, 101, 145, 0.12);
}

.has-error .base-input {
  border-color: var(--color-danger, #EF4444);
}
.has-error .base-input:focus {
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

.has-icon .floating-label {
  left: 2.5rem;
}

.base-input:focus ~ .floating-label,
.base-input:not(:placeholder-shown) ~ .floating-label {
  top: 0;
  font-size: 0.75rem;
  color: var(--color-primary, #006591);
}

.has-icon .base-input:focus ~ .floating-label,
.has-icon .base-input:not(:placeholder-shown) ~ .floating-label {
  left: 0.75rem;
}

.has-error .floating-label {
  color: var(--color-danger, #EF4444);
}

.required-mark {
  color: var(--color-danger, #EF4444);
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: #94A3B8;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.password-toggle:hover {
  color: #475569;
}

.is-disabled .base-input {
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
