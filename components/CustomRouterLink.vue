<template>
  <NuxtLink
    :to="`/${to}`"
    active-class=""
    exact-active-class=""
    :class="isActive"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});
const route = useRoute();

const isActive = computed(() => {
  return route.hash === props.to ? "active" : false;
});

// function normalize(path) {
//   return decodeURI(path).replace(/#.*$/, "");
// }
// function getHash(path) {
//   const match = path.match(/#.*$/);
//   if (match) {
//     return match[0];
//   }
// }
</script>

<style></style>
