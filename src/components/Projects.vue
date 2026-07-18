<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { projects, type ProjectCategory } from '@/data/portfolio'

type Filter = 'featured' | ProjectCategory

const activeFilter = ref<Filter>('featured')

const filters: { id: Filter; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'websites', label: 'Websites' },
  { id: 'packages', label: 'Packages' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'featured') {
    return projects.filter((project) => project.featured)
  }
  return projects.filter((project) => project.category === activeFilter.value)
})
</script>

<template>
  <section id="projects" class="projects section section-alt">
    <div class="container">
      <SectionHeader
        index="03"
        title="Projects"
        description="Selected work across npm packages and production web apps."
      />

      <div class="filter-row">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          class="filter-btn"
          :class="{ active: activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card section-card"
          :class="`tone-${project.category}`"
        >
          <div class="project-top">
            <div>
              <span class="project-category">{{ project.category }}</span>
              <h3>{{ project.title }}</h3>
            </div>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </div>

          <p>{{ project.description }}</p>

          <div class="tag-list">
            <span v-for="tech in project.technologies.slice(0, 4)" :key="tech" class="tag muted">
              {{ tech }}
            </span>
            <span v-if="project.technologies.length > 4" class="tag muted">
              +{{ project.technologies.length - 4 }}
            </span>
          </div>

          <div class="project-actions">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
            >
              {{ project.liveLabel ?? 'Live' }}
            </a>
            <a
              v-if="project.codeUrl"
              :href="project.codeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
            >
              {{ project.codeLabel ?? 'Code' }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
