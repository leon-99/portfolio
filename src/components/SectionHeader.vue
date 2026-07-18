<script setup lang="ts">
defineProps<{
  index: string
  title: string
  description: string
}>()
</script>

<template>
  <header class="section-header">
    <span class="section-index">{{ index }}</span>
    <div class="section-heading">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </header>
</template>
