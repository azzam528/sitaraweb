<template>
  <div class="base-table-container">
    <div class="table-responsive">
      <table class="base-table" :class="{ 'is-striped': striped, 'is-hoverable': hoverable }">
        <thead>
          <tr>
            <th 
              v-for="col in columns" 
              :key="col.key"
              :style="{ width: col.width, textAlign: col.align || 'left' }"
              :class="{ 'is-sortable': col.sortable }"
              @click="col.sortable ? handleSort(col.key) : null"
            >
              <div class="th-content" :class="`justify-${col.align || 'start'}`">
                <slot :name="`header-${col.key}`" :column="col">
                  {{ col.label }}
                </slot>
                <span v-if="col.sortable" class="sort-icon" :class="{ 'active': sortKey === col.key }">
                  <svg v-if="sortKey !== col.key || sortOrder === 'asc'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  <svg v-if="sortKey === col.key && sortOrder === 'desc'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <template v-if="loading">
            <tr v-for="i in 5" :key="`skeleton-${i}`" class="skeleton-row">
              <td v-for="col in columns" :key="`skel-${col.key}`">
                <div class="skeleton-box"></div>
              </td>
            </tr>
          </template>
          
          <template v-else-if="data.length === 0">
            <tr>
              <td :colspan="columns.length" class="empty-cell">
                <slot name="empty">
                  <div class="empty-state">
                    {{ emptyMessage }}
                  </div>
                </slot>
              </td>
            </tr>
          </template>
          
          <template v-else>
            <tr v-for="(row, rowIndex) in data" :key="row.id || rowIndex">
              <td 
                v-for="col in columns" 
                :key="col.key"
                :style="{ textAlign: col.align || 'left' }"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true // { key, label, sortable, width, align }
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'Tidak ada data'
  },
  striped: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['sort'])

const sortKey = ref('')
const sortOrder = ref('asc')

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { column: sortKey.value, direction: sortOrder.value })
}
</script>

<style scoped>
.base-table-container {
  width: 100%;
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--color-border-light, #E2E8F0);
  background-color: var(--color-card, #FFFFFF);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border-light, #E2E8F0);
}

th {
  background-color: var(--color-background, #F8FAFC);
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }

.is-sortable {
  cursor: pointer;
  user-select: none;
}
.is-sortable:hover {
  background-color: #F1F5F9;
}

.sort-icon {
  opacity: 0.3;
  transition: opacity 0.2s;
  display: inline-flex;
}
.sort-icon.active {
  opacity: 1;
  color: var(--color-primary, #006591);
}

td {
  font-size: 0.875rem;
  color: #1E293B;
  vertical-align: middle;
}

.is-striped tbody tr:nth-child(even) {
  background-color: #F8FAFC;
}

.is-hoverable tbody tr:hover {
  background-color: #F1F5F9;
}

.empty-cell {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state {
  color: #64748B;
  font-size: 0.875rem;
}

/* Skeleton loader */
.skeleton-box {
  height: 20px;
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
