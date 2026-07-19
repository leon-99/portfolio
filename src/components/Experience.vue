<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { education, experiences } from '@/data/portfolio'

const MOBILE_PREVIEW_COUNT = 2

const expandedJobs = ref<Record<number, boolean>>({})
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
  if (!isMobile.value) {
    expandedJobs.value = {}
  }
}

const isJobExpanded = (jobId: number) =>
  !isMobile.value || Boolean(expandedJobs.value[jobId])

const toggleJob = (jobId: number) => {
  expandedJobs.value[jobId] = !expandedJobs.value[jobId]
}

const hasExpandableContent = (job: (typeof experiences)[number]) =>
  job.responsibilities.length > MOBILE_PREVIEW_COUNT || Boolean(job.achievements?.length)

const showResponsibility = (jobId: number, index: number) =>
  isJobExpanded(jobId) || index < MOBILE_PREVIEW_COUNT

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <section id="experience" class="experience section">
    <div class="container">
      <SectionHeader
        index="03"
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

            <div class="timeline-body" :id="`timeline-body-${job.id}`">
              <div class="timeline-section timeline-technologies">
                <h4>Technologies</h4>
                <div class="tag-list">
                  <span v-for="tech in job.technologies" :key="tech" class="tag">{{ tech }}</span>
                </div>
              </div>

              <div class="timeline-section timeline-responsibilities">
                <h4>Responsibilities</h4>
                <ul>
                  <li
                    v-for="(item, responsibilityIndex) in job.responsibilities"
                    v-show="showResponsibility(job.id, responsibilityIndex)"
                    :key="item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div
                v-if="job.achievements?.length"
                v-show="isJobExpanded(job.id)"
                class="timeline-section timeline-achievements achievements-block"
              >
                <h4>Key achievements</h4>
                <ul>
                  <li v-for="item in job.achievements" :key="item">{{ item }}</li>
                </ul>
              </div>

              <button
                v-if="isMobile && hasExpandableContent(job)"
                type="button"
                class="timeline-toggle read-more-toggle"
                :aria-expanded="isJobExpanded(job.id)"
                :aria-controls="`timeline-body-${job.id}`"
                @click="toggleJob(job.id)"
              >
                {{ isJobExpanded(job.id) ? 'Show less' : 'Read more' }}
              </button>
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
