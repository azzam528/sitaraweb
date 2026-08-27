<template>
  <div 
    class="base-card"
    :class="[
      `padding-${padding}`,
      { 'is-hoverable': hoverable, 'is-clickable': clickable }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.header || title || subtitle" class="card-header">
      <slot name="header">
        <div class="header-content">
          <h3 v-if="title" class="card-title">{{ title }}</h3>
          <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </div>
      </slot>
      <div v-if="$slots['header-actions']" class="header-actions">
        <slot name="header-actions"></slot>
      </div>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: 'md' // 'none', 'sm', 'md', 'lg'
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  if (props.clickable) {
    emit('click', e)
  }
}
</script>

<style scoped>
.base-card {
  background-color: var(--color-card, #FFFFFF);
  border-radius: var(--radius-md, 12px);
  border: 1px solid var(--color-border-light, #E2E8F0);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-base, 'Plus Jakarta Sans', 'Inter', sans-serif);
  transition: all 0.3s ease;
}

.is-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.is-clickable {
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border-light, #E2E8F0);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1E293B;
}

.card-subtitle {
  margin: 0;
  font-size: 0.875rem;
  color: #64748B;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.card-body {
  flex: 1;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border-light, #E2E8F0);
  background-color: #F8FAFC;
  border-bottom-left-radius: var(--radius-md, 12px);
  border-bottom-right-radius: var(--radius-md, 12px);
}

/* Padding variants */
.padding-none .card-body { padding: 0; }
.padding-sm .card-body { padding: 1rem; }
.padding-md .card-body { padding: 1.5rem; }
.padding-lg .card-body { padding: 2rem; }
</style>
