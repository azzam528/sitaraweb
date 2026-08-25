<template>
  <div class="card detail-header-card">
    <div class="detail-header-top">
      <!-- 1. Identity Group: Avatar + Bio (Title, Status, Metadata, Tags) -->
      <div class="detail-identity-group">
        <div class="detail-avatar">
          <slot name="avatar">
            <span>{{ avatarText || initials }}</span>
          </slot>
        </div>

        <div class="detail-bio">
          <div class="detail-title-row">
            <h2 class="detail-title">{{ title }}</h2>
            <div v-if="$slots.status || statusText" class="detail-status-wrapper">
              <slot name="status">
                <span v-if="statusText" class="status-badge" :class="statusClass">
                  {{ statusText }}
                </span>
              </slot>
            </div>
          </div>

          <!-- Metadata with standard dot separators -->
          <div v-if="$slots.metadata || (metadata && metadata.length)" class="detail-metadata">
            <slot name="metadata">
              <template v-for="(item, idx) in formattedMetadata" :key="idx">
                <span class="meta-item">
                  <strong v-if="item.label">{{ item.label }}: </strong>{{ item.value }}
                </span>
                <span v-if="idx < formattedMetadata.length - 1" class="meta-dot">&bull;</span>
              </template>
            </slot>
          </div>

          <!-- Optional Badges / Tags -->
          <div v-if="$slots.tags" class="detail-tags-row">
            <slot name="tags"></slot>
          </div>
        </div>
      </div>

      <!-- 2. Right Side: Actions & Extra Info (e.g., AI Score / Action Buttons) -->
      <div v-if="$slots.extra || $slots.actions" class="detail-actions-group">
        <slot name="extra"></slot>
        <div v-if="$slots.actions" class="detail-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <!-- 3. Optional Bottom Summary Row -->
    <div v-if="$slots.summary" class="detail-header-bottom">
      <slot name="summary"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  initials: {
    type: String,
    default: 'TB'
  },
  avatarText: {
    type: String,
    default: ''
  },
  statusText: {
    type: String,
    default: ''
  },
  statusClass: {
    type: [String, Object, Array],
    default: ''
  },
  metadata: {
    type: Array,
    default: () => []
  }
})

const formattedMetadata = computed(() => {
  if (!props.metadata) return []
  return props.metadata.filter(item => item && (item.value || item.value === 0))
})
</script>

<style scoped>
.detail-header-card {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02);
  padding: 24px;
  margin-bottom: 24px;
}

.detail-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.detail-identity-group {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
  flex: 1;
}

.detail-avatar {
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  flex: 0 0 64px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: linear-gradient(135deg, #006591 0%, #6df5e1 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  box-shadow: 0 4px 10px rgba(0, 101, 145, 0.2);
  text-transform: uppercase;
  user-select: none;
}

.detail-bio {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.detail-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.detail-title {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.25;
}

.detail-status-wrapper {
  display: inline-flex;
  align-items: center;
}

.detail-metadata {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  white-space: normal;
}

.meta-item strong {
  color: #334155;
  font-weight: 600;
  margin-right: 2px;
}

.meta-dot {
  color: #cbd5e1;
  font-size: 14px;
  user-select: none;
}

.detail-tags-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.detail-actions-group {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.detail-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.detail-header-bottom {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .detail-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .detail-identity-group {
    width: 100%;
  }

  .detail-actions-group {
    width: 100%;
    justify-content: flex-start;
  }

  .detail-actions {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .detail-header-bottom {
    gap: 18px 24px;
  }
}
</style>
