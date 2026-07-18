<script setup lang="ts">
defineProps<{
  title: string
  paragraphs: string[]
  stats: { value: string; label: string }[]
  countUp?: boolean
}>()
</script>

<template>
  <article class="objective-card section-card accent-border about-text">
    <div class="objective-head">
      <span class="objective-icon" aria-hidden="true">◎</span>
      <h3>{{ title }}</h3>
    </div>

    <div class="objective-body">
      <p v-for="(paragraph, index) in paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>

    <div class="objective-stats">
      <div v-for="(stat, index) in stats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ countUp ? (index === 2 ? '0%' : '0+') : stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </article>
</template>
