<template>
  <div class="base-textarea-wrapper">
    <div class="textarea-container" :class="{ 'has-error': error, 'is-disabled': disabled }">
      <textarea
        :id="id"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder || ' '"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        class="base-textarea"
        @input="handleInput"
      ></textarea>
      <label v-if="label" :for="id" class="floating-label">
        {{ label }} <span v-if="required" class="required-mark">*</span>
      </label>
    </div>
    <div class="footer-info">
      <span v-if="error" class="error-message">{{ error }}</span>
      <span class="char-count" v-if="modelValue !== undefined">{{ modelValue.length }} chars</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
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
  rows: {
    type: Number,
    default: 4
  },
  id: {
    type: String,
    default: () => `textarea-${Math.random().toString(36).substring(2, 9)}`
  }
})

const emit = defineEmits(['update:modelValue'])
const textareaRef = ref(null)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
  autoResize()
}

const autoResize = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

watch(() => props.modelValue, () => {
  nextTick(() => {
    autoResize()
  })
})
</script>

<style scoped>
.base-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
}

.textarea-container {
  position: relative;
  display: flex;
  width: 100%;
}

.base-textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: var(--color-card, #FFFFFF);
  border: 1px solid var(--color-border-light, #E2E8F0);
  border-radius: var(--radius-md, 12px);
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.base-textarea:focus {
  border-color: var(--color-primary, #006591);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.has-error .base-textarea {
  border-color: var(--color-danger, #EF4444);
}
.has-error .base-textarea:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.floating-label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  background-color: var(--color-card, #FFFFFF);
  padding: 0 0.25rem;
  color: #64748B;
  font-size: 1rem;
  transition: all 0.2s ease;
  pointer-events: none;
}

.base-textarea:focus ~ .floating-label,
.base-textarea:not(:placeholder-shown) ~ .floating-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: var(--color-primary, #006591);
}

.has-error .floating-label {
  color: var(--color-danger, #EF4444);
}

.required-mark {
  color: var(--color-danger, #EF4444);
}

.is-disabled .base-textarea {
  background-color: var(--color-background, #F8FAFC);
  color: #94A3B8;
  cursor: not-allowed;
}
.is-disabled .floating-label {
  background-color: transparent;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
}

.error-message {
  color: var(--color-danger, #EF4444);
}
.char-count {
  color: #94A3B8;
  margin-left: auto;
}
</style>
