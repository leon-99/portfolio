<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { skillCategories } from '@/data/portfolio'

const categoryIcons: Record<string, string> = {
  Backend: 'mdi:server-outline',
  Frontend: 'mdi:monitor-small',
  'Cloud & DevOps': 'mdi:cloud-outline',
  Quality: 'mdi:shield-check-outline',
}

const skillIcons: Record<string, string> = {
  'Node.js': 'logos:nodejs',
  'Express.js': 'simple-icons:express',
  PHP: 'logos:php',
  Laravel: 'logos:laravel',
  'RESTful APIs': 'mdi:api',
  GraphQL: 'logos:graphql',
  MongoDB: 'logos:mongodb-icon',
  PostgreSQL: 'logos:postgresql',
  Redis: 'logos:redis',
  'Vue.js': 'logos:vue',
  'React.js': 'logos:react',
  JavaScript: 'logos:javascript',
  TypeScript: 'logos:typescript-icon',
  HTML5: 'logos:html-5',
  CSS3: 'logos:css-3',
  'Tailwind CSS': 'logos:tailwindcss-icon',
  Vite: 'logos:vitejs',
  AWS: 'logos:aws',
  Docker: 'logos:docker-icon',
  'CI/CD': 'mdi:source-branch-sync',
  Git: 'logos:git-icon',
  Linux: 'logos:linux-tux',
  Nginx: 'logos:nginx',
  'Code review': 'mdi:code-tags-check',
  'Static analysis': 'mdi:magnify-scan',
  'Code coverage': 'mdi:chart-donut',
  'Performance profiling': 'mdi:speedometer-medium',
}
</script>

<template>
  <section id="skills" class="skills section">
    <div class="container">
      <SectionHeader
        index="04"
        title="Skills"
        description="Technologies I use to build and maintain production software."
      />

      <div class="skills-layout">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          class="skill-category"
        >
          <div class="skill-category-head">
            <Icon
              :icon="categoryIcons[category.title]"
              class="skill-category-icon"
              aria-hidden="true"
            />
            <h3>{{ category.title }}</h3>
          </div>

          <div class="skill-chips">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="skill-chip"
            >
              <Icon
                :icon="skillIcons[skill]"
                class="skill-chip-icon"
                aria-hidden="true"
              />
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
