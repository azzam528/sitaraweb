<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-left">
        &copy; {{ currentYear }} SITARA - Sistem Informasi Terapi dan Rawat Antituberkulosis. All rights reserved.
      </div>
      <div class="footer-right">
        v1.0.0
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #FFFFFF;
  border-top: 1px solid var(--color-border, #E2E8F0);
  padding: var(--space-md, 16px) var(--space-lg, 24px);
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-muted, #64748B);
  font-size: var(--text-xs, 0.75rem);
}

@media (max-width: 767.98px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>
