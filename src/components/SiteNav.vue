<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { navLinks, profile } from '@/data/portfolio'

const isScrolled = ref(false)
const isOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

const closeMenu = () => {
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="site-nav" :class="{ scrolled: isScrolled }">
    <div class="container nav-inner">
      <a href="#home" class="brand" @click="closeMenu">
        <span class="brand-name">{{ profile.name }}</span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <span />
        <span />
      </button>

      <nav class="nav-links" :class="{ open: isOpen }">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="closeMenu"
        >
          {{ link.label }}
        </a>
        <a class="nav-cta" :href="`mailto:${profile.email}`" @click="closeMenu">
          Let's talk
        </a>
      </nav>
    </div>
  </header>
</template>
