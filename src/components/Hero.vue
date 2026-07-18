<script setup lang="ts">
import { profile } from '@/data/portfolio'
</script>

<template>
  <section id="home" class="hero section">
    <div class="hero-glow" aria-hidden="true" />

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

      <div class="hero-card-area" aria-hidden="true" />
    </div>
  </section>
</template>
