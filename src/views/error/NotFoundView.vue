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

<style scoped src="./NotFoundView.css"></style>
