<script setup lang="ts">
import { onMounted, nextTick, ref, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '@/components/SectionHeader.vue'
import ObjectiveCard from '@/components/ObjectiveCard.vue'
import ProfileCard from '@/components/ProfileCard/ProfileCard.vue'
import profileImage from '@/assets/images/image.jpg'
import { objective, profile } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const windowWidth = ref(window.innerWidth)

const checkMobile = () => {
  windowWidth.value = window.innerWidth
}

const shouldShowCard = computed(() => windowWidth.value > 768)

const handleContactClick = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  await nextTick()

  checkMobile()
  window.addEventListener('resize', checkMobile)

  setTimeout(() => {
    gsap.fromTo(
      '.about-visual',
      {
        opacity: 0,
        x: 100,
        rotationY: 15,
        scale: 0.8,
      },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    const statValues = document.querySelectorAll('.about .stat-value')
    const targetValues = [7, 30, 100]
    const suffixes = ['+', '+', '%']

    statValues.forEach((stat, index) => {
      const targetNumber = targetValues[index]
      const suffix = suffixes[index]

      gsap.to(
        {},
        {
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about .objective-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function () {
            const progress = this.progress()
            const currentNumber = Math.floor(progress * targetNumber)
            stat.textContent = currentNumber + suffix
          },
          onComplete: function () {
            stat.textContent = targetNumber + suffix
          },
        },
      )
    })
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  ScrollTrigger.getAll().forEach((trigger) => {
    const el = trigger.trigger as Element | undefined
    if (el?.closest?.('.about')) {
      trigger.kill()
    }
  })
})
</script>

<template>
  <section id="about" class="about section section-alt">
    <div class="container">
      <SectionHeader
        index="01"
        title="About"
        :description="profile.summary"
      />

      <div class="about-grid">
        <ObjectiveCard
          :title="objective.title"
          :paragraphs="objective.paragraphs"
          :stats="objective.stats"
          count-up
        />

        <div class="about-visual">
          <ProfileCard
            v-if="shouldShowCard"
            :name="profile.name"
            :title="profile.title"
            :handle="profile.handle"
            status="Available for opportunities"
            contact-text="Get in touch"
            :show-user-info="true"
            :enable-tilt="true"
            :avatar-url="profileImage"
            :mini-avatar-url="profileImage"
            @contact-click="handleContactClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .about-visual {
    display: none !important;
  }
}
</style>
