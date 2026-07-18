<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { profile } from '@/data/portfolio'

const heroStack = [
  { name: 'Node.js', icon: 'logos:nodejs' },
  { name: 'NestJS', icon: 'logos:nestjs' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Vue', icon: 'logos:vue' },
  { name: 'Docker', icon: 'logos:docker-icon' },
  { name: 'AWS', icon: 'logos:aws' },
]
</script>

<template>
  <section id="home" class="hero section">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="hero-kicker">
          <span class="pulse-dot" />
          Open to opportunities
        </p>

        <h1>
          <span class="name-line">Win Khant</span>
          <span class="name-line accent">Aung</span>
        </h1>

        <p class="hero-title">{{ profile.title }}</p>
        <p class="hero-description">{{ profile.tagline }}</p>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">View work</a>
          <a href="#contact" class="btn btn-secondary">Get in touch</a>
        </div>
      </div>

      <ul class="hero-stack" aria-label="Primary technologies">
        <li v-for="tech in heroStack" :key="tech.name">
          <Icon :icon="tech.icon" class="hero-stack-icon" aria-hidden="true" />
          <span>{{ tech.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
