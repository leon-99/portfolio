<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { siteAnnouncement } from '@/data/portfolio'

const storageKey = `portfolio-announcement-${siteAnnouncement.id}`
const visible = ref(false)

onMounted(() => {
  visible.value = localStorage.getItem(storageKey) !== 'dismissed'
})

const dismiss = () => {
  visible.value = false
  localStorage.setItem(storageKey, 'dismissed')
}
</script>

<template>
  <aside
    v-if="visible"
    class="announcement-bar"
    role="status"
    aria-label="Site announcement"
  >
    <span class="announcement-bar__badge">{{ siteAnnouncement.badge }}</span>

    <p class="announcement-bar__text">
      <strong>{{ siteAnnouncement.title }}</strong>
      {{ ' ' }}
      <span class="announcement-bar__message">{{ siteAnnouncement.message }}</span>
      <a
        class="announcement-bar__link"
        :href="siteAnnouncement.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ siteAnnouncement.linkLabel }}
      </a>
    </p>

    <button
      type="button"
      class="announcement-bar__dismiss"
      aria-label="Dismiss announcement"
      @click="dismiss"
    >
      <Icon icon="material-symbols:close-rounded" width="16" height="16" aria-hidden="true" />
    </button>
  </aside>
</template>
