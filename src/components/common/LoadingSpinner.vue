<template>
  <div v-if="overlay" class="spinner-overlay">
    <div :class="['spinner', `spinner-${size}`, `spinner-color-${color}`]"></div>
  </div>
  <div v-else :class="['spinner', `spinner-${size}`, `spinner-color-${color}`]"></div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md' // 'sm', 'md', 'lg'
  },
  color: {
    type: String,
    default: 'primary' // 'primary', 'white', etc
  },
  overlay: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Sizes */
.spinner-sm {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(0,0,0,0.1);
  border-top-color: currentColor;
}

.spinner-md {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(0,0,0,0.1);
  border-top-color: currentColor;
}

.spinner-lg {
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(0,0,0,0.1);
  border-top-color: currentColor;
}

/* Colors */
.spinner-color-primary {
  color: var(--color-primary, #006591);
}
.spinner-color-white {
  color: #FFFFFF;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
