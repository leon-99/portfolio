<script setup lang="ts">
import { siteAnnouncement } from '@/data/portfolio'
</script>

<template>
  <aside class="announcement-bar" role="status" aria-label="Site announcement">
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
  </aside>
</template>
