<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { projects, type PackageType, type Project, type ProjectCategory } from '@/data/portfolio'

type Filter = 'featured' | ProjectCategory

const activeFilter = ref<Filter>('featured')

const filters: { id: Filter; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'products', label: 'Products' },
  { id: 'websites', label: 'Websites' },
  { id: 'packages', label: 'Packages' },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'featured') {
    return projects.filter((project) => project.featured)
  }
  return projects.filter((project) => project.category === activeFilter.value)
})

const categoryLabel: Record<ProjectCategory, string> = {
  websites: 'Website',
  packages: 'Package',
  products: 'Product',
}

const packageLabel: Record<PackageType, string> = {
  npm: '',
  laravel: 'Laravel',
}

const packageIcon: Record<PackageType, string> = {
  npm: 'logos:npm',
  laravel: 'logos:laravel',
}

function projectType(project: Project): ProjectCategory | PackageType {
  if (project.category === 'websites' || project.category === 'products') {
    return project.category
  }
  return project.packageType ?? 'npm'
}

function typeLabel(project: Project): string {
  if (project.category === 'websites' || project.category === 'products') {
    return categoryLabel[project.category]
  }
  return packageLabel[project.packageType ?? 'npm']
}

function showTypeLabel(project: Project): boolean {
  if (project.category === 'websites' || project.category === 'products') return true
  return project.packageType === 'laravel'
}

function typeAriaLabel(project: Project): string | undefined {
  if (project.category !== 'packages') return undefined
  return project.packageType === 'laravel' ? 'Laravel package' : 'npm package'
}

function isNpmLink(project: Project): boolean {
  return Boolean(project.liveUrl?.includes('npmjs.com'))
}
</script>

<template>
  <section id="projects" class="projects section section-alt">
    <div class="container">
      <SectionHeader
        index="02"
        title="Projects"
        description="Selected work across products, npm packages, Laravel packages, and production web apps."
      />

      <div class="project-filters" role="tablist" aria-label="Project filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          role="tab"
          class="filter-tab"
          :class="{ active: activeFilter === filter.id }"
          :aria-selected="activeFilter === filter.id"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="project-list section-card">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-row"
        >
          <div class="project-main">
            <div class="project-head">
              <h3>{{ project.title }}</h3>
              <span
                class="project-type"
                :class="{ 'project-type--icon-only': project.category === 'packages' && project.packageType !== 'laravel' }"
                :data-type="projectType(project)"
                :aria-label="typeAriaLabel(project)"
              >
                <Icon
                  v-if="project.category === 'packages'"
                  :icon="packageIcon[project.packageType ?? 'npm']"
                  class="project-type-icon"
                  aria-hidden="true"
                />
                <template v-if="showTypeLabel(project)">{{ typeLabel(project) }}</template>
              </span>
            </div>
            <p class="project-desc">{{ project.description }}</p>
            <p class="project-tech">{{ project.technologies.join(' · ') }}</p>
          </div>

          <div v-if="project.liveUrl || project.codeUrl" class="project-links">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link project-link"
            >
              <Icon
                v-if="isNpmLink(project)"
                icon="logos:npm"
                class="project-link-icon"
                aria-hidden="true"
              />
              {{ project.liveLabel ?? 'Live' }} ↗
            </a>
            <a
              v-if="project.codeUrl"
              :href="project.codeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-link"
            >
              {{ project.codeLabel ?? 'Code' }} ↗
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
