<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Dock from '@/components/dock/Dock.vue'
import type { DockItemData } from '@/components/dock/Dock.vue'
import { navLinks } from '@/data/portfolio'

const navIcons: Record<string, string> = {
  '#home': 'material-symbols:home-rounded',
  '#about': 'material-symbols:person-rounded',
  '#projects': 'material-symbols:folder-rounded',
  '#experience': 'mdi:briefcase-outline',
  '#skills': 'material-symbols:code-rounded',
  '#contact': 'material-symbols:mail-rounded',
}

const isMobile = ref(false)
const activeSection = ref(navLinks[0]?.href ?? '#home')

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const resolveActiveSection = () => {
  const sections = navLinks
    .map((link) => ({
      href: link.href,
      element: document.querySelector(link.href),
    }))
    .filter((entry): entry is { href: string; element: Element } => Boolean(entry.element))

  if (!sections.length) return sections[0]?.href ?? navLinks[0]?.href ?? '#home'

  const scrollMarker = window.scrollY + window.innerHeight * 0.32
  let current = sections[0].href

  for (const section of sections) {
    const top = section.element.getBoundingClientRect().top + window.scrollY
    if (top <= scrollMarker) {
      current = section.href
    }
  }

  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 96

  if (nearBottom) {
    current = sections[sections.length - 1].href
  }

  return current
}

const updateActiveSection = () => {
  activeSection.value = resolveActiveSection()
}

const scrollToSection = (href: string) => {
  const target = document.querySelector(href)
  target?.scrollIntoView({ behavior: 'smooth' })
}

const dockItems = computed<DockItemData[]>(() =>
  navLinks.map((link) => ({
    id: link.href,
    icon: () =>
      h(Icon, {
        icon: navIcons[link.href],
        width: isMobile.value ? 16 : 20,
        height: isMobile.value ? 16 : 20,
      }),
    label: link.label,
    active: link.href === activeSection.value,
    className: link.href === activeSection.value ? 'dock-item-active' : '',
    onClick: () => scrollToSection(link.href),
  })),
)

onMounted(() => {
  checkMobile()
  updateActiveSection()
  window.addEventListener('resize', checkMobile, { passive: true })
  window.addEventListener('scroll', updateActiveSection, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <nav class="site-dock" :class="{ 'site-dock--mobile': isMobile }" aria-label="Site navigation">
    <Dock
      class-name="site-dock-panel"
      :items="dockItems"
      show-labels
      :compact="isMobile"
      :base-item-size="isMobile ? 42 : 54"
      :magnification="isMobile ? 42 : 64"
      :panel-height="isMobile ? 52 : 62"
      :dock-height="isMobile ? 52 : 98"
      :distance="isMobile ? 80 : 180"
    />
  </nav>
</template>
