<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  title: string
  paragraphs: string[]
  stats: { value: string; label: string }[]
  countUp?: boolean
}>()

const expanded = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
  if (!isMobile.value) {
    expanded.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <article class="objective-card section-card accent-border about-text">
    <div class="objective-head">
      <span class="objective-icon" aria-hidden="true">◎</span>
      <h3>{{ title }}</h3>
    </div>

    <div
      class="objective-body"
      :class="{ 'is-collapsed': isMobile && !expanded }"
      :id="isMobile ? 'objective-body' : undefined"
    >
      <p v-for="(paragraph, index) in paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>

    <button
      v-if="isMobile"
      type="button"
      class="objective-toggle"
      :aria-expanded="expanded"
      aria-controls="objective-body"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : 'Read more' }}
    </button>

    <div class="objective-stats">
      <div v-for="(stat, index) in stats" :key="stat.label" class="stat-item">
        <span class="stat-value">{{ countUp ? (index === 2 ? '0%' : '0+') : stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </article>
</template>
