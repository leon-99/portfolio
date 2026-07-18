<script setup lang="ts">
import DotField from '@/components/backgrounds/DotField.vue'
</script>

<template>
  <div class="page-backdrop" aria-hidden="true">
    <div class="orb orb-a" />
    <div class="orb orb-b" />
    <DotField
      :dot-radius="2.2"
      :dot-spacing="12"
      gradient-from="rgba(74, 222, 128, 0.48)"
      gradient-to="rgba(124, 184, 255, 0.34)"
      :glow-radius="200"
      :bulge-strength="75"
    />
  </div>
</template>
