<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { profile } from '@/data/portfolio'

const contactLinks = [
  {
    label: 'GitHub',
    description: 'Code, packages, and experiments',
    href: profile.github,
    value: 'github.com/leon-99',
    tone: 'github',
    glyph: 'GH',
  },
  {
    label: 'LinkedIn',
    description: 'Professional background and updates',
    href: profile.linkedin,
    value: 'linkedin.com/in/win-khant-aung',
    tone: 'linkedin',
    glyph: 'in',
  },
  {
    label: 'Email',
    description: 'Best way to reach me directly',
    href: `mailto:${profile.email}`,
    value: profile.email,
    tone: 'email',
    glyph: '@',
  },
]
</script>

<template>
  <section id="contact" class="contact section section-alt">
    <div class="container">
      <SectionHeader
        index="05"
        title="Contact"
        description="Open to backend-heavy roles, product teams, and interesting freelance work."
      />

      <div class="contact-grid">
        <a
          v-for="link in contactLinks"
          :key="link.label"
          :href="link.href"
          class="contact-card section-card"
          :class="`tone-${link.tone}`"
          :target="link.label === 'Email' ? undefined : '_blank'"
          :rel="link.label === 'Email' ? undefined : 'noopener noreferrer'"
        >
          <span class="contact-glyph">{{ link.glyph }}</span>
          <h3>{{ link.label }}</h3>
          <p>{{ link.description }}</p>
          <span class="text-link">{{ link.value }}</span>
        </a>
      </div>

      <div class="availability section-card accent-border">
        <div>
          <p class="panel-label">Availability</p>
          <p class="panel-value">Open to full-time and contract opportunities</p>
        </div>
        <a class="btn btn-primary" :href="`mailto:${profile.email}`">Send an email</a>
      </div>
    </div>
  </section>
</template>
