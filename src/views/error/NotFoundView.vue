<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found-view">
    <h1 class="error-code">404</h1>
    <p class="error-message">Halaman Tidak Ditemukan</p>
    <RouterLink to="/dashboard" class="back-button">Kembali ke Dashboard</RouterLink>
  </div>
</template>

<style scoped>
.not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 24px;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: var(--color-primary, #2563EB);
  margin-bottom: 8px;
}

.error-message {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: var(--color-text-primary, #333);
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--color-primary, #2563EB);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--color-secondary, #1E40AF);
}
</style>
