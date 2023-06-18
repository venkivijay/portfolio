<template>
  <div id="app">
    <TheIconSprite />
    <TheHeader />
    <main class="px-8 mx-auto my-0 max-w-screen-2xl md:px-24 lg:px-32 xl:px-48">
      <button @click="handleError">Clear errors</button>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
