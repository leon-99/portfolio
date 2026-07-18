<script setup lang="ts">
import PageBackdrop from '@/components/PageBackdrop.vue'
import SiteDock from '@/components/SiteDock.vue'
import Hero from '@/components/Hero.vue'
import About from '@/components/About.vue'
import Experience from '@/components/Experience.vue'
import Projects from '@/components/Projects.vue'
import Skills from '@/components/Skills.vue'
import Contact from '@/components/Contact.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="app">
    <PageBackdrop />
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
    <SiteFooter />
    <SiteDock />
  </div>
</template>
