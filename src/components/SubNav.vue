<script setup>
import { useRoute } from 'vue-router/auto'

const inactiveStyle = 'opacity-20 hover:opacity-50'
const activeStyle = 'opacity-100 underline'

const route = useRoute()

const sections = [
  { to: '/posts', label: 'Blog' },
  { to: '/notes', label: 'Notes' },
]
</script>

<template>
  <div class="prose m-auto mb-8 select-none animate-none! op100!">
    <div mb-0 flex="~ col gap-1 sm:row sm:gap-3 wrap" text-3xl>
      <!-- The current section doubles as the page's h1. These pages have no
           other heading, so rendering both as links left them without one. -->
      <template v-for="section in sections" :key="section.to">
        <h1
          v-if="route.path === section.to"
          class="!text-3xl !font-normal !m-0 !leading-[inherit] !text-inherit"
          :class="activeStyle"
        >
          {{ section.label }}
        </h1>
        <RouterLink
          v-else
          :to="section.to"
          class="!border-none"
          :class="inactiveStyle"
        >
          {{ section.label }}
        </RouterLink>
      </template>
    </div>
  </div>
</template>
