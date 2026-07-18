<script setup lang="ts">
import DotField from '@/components/backgrounds/DotField.vue'
</script>

<template>
  <div class="page-backdrop" aria-hidden="true">
    <div class="orb orb-a" />
    <div class="orb orb-b" />
    <DotField
      :dot-radius="2.1"
      :dot-spacing="13"
      gradient-from="rgba(74, 222, 128, 0.44)"
      gradient-to="rgba(124, 184, 255, 0.3)"
      :glow-radius="195"
      :bulge-strength="72"
    />
  </div>
</template>
