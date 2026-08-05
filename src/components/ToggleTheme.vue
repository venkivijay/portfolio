<script setup>
import { toggleDark } from '~/logics'
</script>

<template>
  <!-- A button, not an anchor: this triggers an action and has no href, so as
       a link it was unreachable by keyboard and uncrawlable by search engines. -->
  <button
    class="select-none"
    type="button"
    title="Toggle Color Scheme"
    aria-label="Toggle color scheme"
    @click="toggleDark"
  >
    <div i-ri-sun-line dark:i-ri-moon-line />
  </button>
</template>
