<template>
  <div class="base-pagination">
    <div class="pagination-info">
      Menampilkan {{ startItem }}-{{ endItem }} dari {{ totalItems }}
    </div>
    
    <div class="pagination-controls">
      <div class="per-page-selector">
        <select :value="perPage" @change="handlePerPageChange" class="per-page-select">
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">
            {{ opt }} / halaman
          </option>
        </select>
      </div>
      
      <div class="page-buttons">
        <button 
          class="page-btn nav-btn" 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <button 
          v-for="page in displayedPages" 
          :key="page"
          class="page-btn"
          :class="{ 'is-active': page === currentPage, 'is-ellipsis': page === '...' }"
          :disabled="page === '...'"
          @click="page !== '...' ? changePage(page) : null"
        >
          {{ page }}
        </button>
        
        <button 
          class="page-btn nav-btn" 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  perPageOptions: {
    type: Array,
    default: () => [10, 25, 50, 100]
  }
})

const emit = defineEmits(['page-change', 'per-page-change'])

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.perPage
  return end > props.totalItems ? props.totalItems : end
})

const displayedPages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }
  
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }
  
  return [1, '...', current - 1, current, current + 1, '...', total]
})

const changePage = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const handlePerPageChange = (e) => {
  emit('per-page-change', Number(e.target.value))
}
</script>

<style scoped>
.base-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
}

.pagination-info {
  font-size: 0.875rem;
  color: #64748B;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.per-page-select {
  padding: 0.375rem 2rem 0.375rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid var(--color-border-light, #E2E8F0);
  border-radius: var(--radius-md, 12px);
  background-color: #FFFFFF;
  color: #1E293B;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
}

.per-page-select:focus {
  border-color: var(--color-primary, #006591);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.page-buttons {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md, 12px);
  background-color: transparent;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled):not(.is-active) {
  background-color: #F1F5F9;
}

.page-btn.is-active {
  background-color: var(--color-primary, #006591);
  color: white;
  font-weight: 500;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.is-ellipsis {
  cursor: default;
  background: transparent;
  opacity: 1;
}

.nav-btn {
  border-color: var(--color-border-light, #E2E8F0);
  background-color: #FFFFFF;
}
.nav-btn:hover:not(:disabled) {
  border-color: #CBD5E1;
}
</style>
