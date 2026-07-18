<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { skillCategories } from '@/data/portfolio'
</script>

<template>
  <section id="skills" class="skills section">
    <div class="container">
      <SectionHeader
        index="04"
        title="Skills"
        description="Technologies I use to build and maintain production software."
      />

      <div class="skills-panel section-card">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          class="skill-group"
        >
          <h3>{{ category.title }}</h3>
          <p class="skill-items">{{ category.skills.join(' · ') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
