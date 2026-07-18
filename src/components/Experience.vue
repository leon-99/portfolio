<script setup lang="ts">
import SectionHeader from '@/components/SectionHeader.vue'
import { education, experiences } from '@/data/portfolio'
</script>

<template>
  <section id="experience" class="experience section">
    <div class="container">
      <SectionHeader
        index="02"
        title="Experience"
        description="Roles where I shipped backend systems, frontend products, and team workflows."
      />

      <div class="timeline">
        <article
          v-for="(job, index) in experiences"
          :key="job.id"
          class="timeline-item section-card"
        >
          <div class="timeline-marker">
            <span class="timeline-dot" :class="{ current: job.current }" />
            <span v-if="index < experiences.length - 1" class="timeline-line" />
          </div>

          <div class="timeline-content">
            <div class="timeline-head">
              <div>
                <p class="timeline-period">{{ job.period }}</p>
                <h3>{{ job.title }}</h3>
                <p class="company">{{ job.company }}</p>
                <p class="meta">{{ job.location }}</p>
              </div>
              <span class="status-badge" :class="{ current: job.current }">
                {{ job.current ? 'Current' : 'Completed' }}
              </span>
            </div>

            <div class="timeline-body">
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  <li v-for="item in job.responsibilities" :key="item">{{ item }}</li>
                </ul>
              </div>

              <div>
                <h4>Technologies</h4>
                <div class="tag-list">
                  <span v-for="tech in job.technologies" :key="tech" class="tag">{{ tech }}</span>
                </div>
              </div>

              <div v-if="job.achievements?.length" class="achievements-block">
                <h4>Key achievements</h4>
                <ul>
                  <li v-for="item in job.achievements" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="education-block">
        <h3>Education & certifications</h3>
        <div class="education-grid">
          <article
            v-for="item in education"
            :key="item.title"
            class="education-card section-card"
          >
            <span class="education-year">{{ item.year }}</span>
            <h4>{{ item.title }}</h4>
            <p>{{ item.institution }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
