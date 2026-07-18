<script setup lang="ts">
import CircularGallery from '@/components/CircularGallery/CircularGallery.vue'

const iconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const galleryItems = [
  { image: `${iconBase}/nodejs/nodejs-original.svg`, text: 'Node.js' },
  { image: `${iconBase}/react/react-original.svg`, text: 'React' },
  { image: `${iconBase}/amazonwebservices/amazonwebservices-original.svg`, text: 'AWS' },
  { image: `${iconBase}/docker/docker-original.svg`, text: 'Docker' },
  { image: `${iconBase}/vuejs/vuejs-original.svg`, text: 'Vue.js' },
  { image: `${iconBase}/laravel/laravel-original.svg`, text: 'Laravel' },
  { image: `${iconBase}/typescript/typescript-original.svg`, text: 'TypeScript' },
  { image: `${iconBase}/postgresql/postgresql-original.svg`, text: 'PostgreSQL' },
]
</script>

<template>
  <div class="hero-gallery">
    <CircularGallery
      :items="galleryItems"
      :bend="2.2"
      text-color="#8ea796"
      :border-radius="0.1"
      font="600 14px Manrope, system-ui, sans-serif"
      font-url="https://fonts.googleapis.com/css2?family=Manrope:wght@600&display=swap"
      :scroll-speed="1.4"
      :scroll-ease="0.06"
    />
    <a href="#skills" class="hero-gallery-link">Explore full stack →</a>
  </div>
</template>

<style scoped>
.hero-gallery {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 360px;
}

.hero-gallery-link {
  margin-top: 0.85rem;
  text-align: center;
  color: var(--sky);
  font-size: 0.88rem;
  font-weight: 600;
}

.hero-gallery-link:hover {
  color: var(--text);
}
</style>
