<script setup lang="ts">
import { profile } from '@/data/portfolio'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-name">{{ profile.name }}</p>
        <p class="footer-meta">{{ profile.title }} · {{ profile.location }}</p>
      </div>

      <div class="footer-links">
        <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a :href="`mailto:${profile.email}`">Email</a>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}</p>
      <p>Crafted with Vue + Vite</p>
    </div>
  </footer>
</template>
