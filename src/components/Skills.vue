<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { skillCategories } from '@/data/portfolio'

const tones = ['mint', 'sky', 'amber', 'rose']
</script>

<template>
  <section id="skills" class="skills section">
    <div class="container">
      <SectionHeader
        index="04"
        title="Skills"
        description="Technologies I use to build and maintain production software."
      />

      <div class="skills-grid">
        <article
          v-for="(category, index) in skillCategories"
          :key="category.title"
          class="skills-card section-card"
          :class="`tone-${tones[index % tones.length]}`"
        >
          <h3>{{ category.title }}</h3>
          <div class="tag-list">
            <span v-for="skill in category.skills" :key="skill" class="tag">
              {{ skill }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
