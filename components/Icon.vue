<template>
  <svg class="fill-current stroke-current">
    <use :xlink:href="displayIcon" />
  </svg>
</template>

<script setup>
const props = defineProps({
  primaryIcon: { type: String, required: true },
});

const displayIcon = computed(() => "#" + props.primaryIcon);
</script>
