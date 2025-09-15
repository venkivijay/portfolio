<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    default: '_self',
  },
  variant: {
    type: String,
    default: 'blue',
    validator: value => ['blue', 'outline', 'ghost'].includes(value),
  },
})
</script>

<template>
  <a
    :href="href"
    :target="target"
    class="group inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
    :class="{
      'btn-blue': variant === 'blue',
      'btn-outline': variant === 'outline',
      'btn-ghost': variant === 'ghost',
    }"
  >
    <div
      :class="icon"
      class="group-hover:(text-blue-600 dark:text-blue-400) transition-colors"
    />
    <span>{{ text }}</span>
  </a>
</template>
