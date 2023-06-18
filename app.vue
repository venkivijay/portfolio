<template>
  <div id="app">
    <TheIconSprite />
    <TheHeader />
    <main class="px-8 mx-auto my-0 max-w-screen-2xl md:px-24 lg:px-32 xl:px-48">
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<style>
:root {
  scroll-behavior: smooth;
}
#app {
  @apply font-base text-primary bg-background;
  background: radial-gradient(var(--color-accent-alpha) 8%, transparent 0),
    var(--color-background);
  background-position: 0 0, 1.75em 1.75em;
  background-size: 1.75em 1.75em;
}
html {
  @apply text-base font-medium;
}
h2 {
  padding-top: calc(var(--nav-height) + 0.5rem) !important;
}
</style>
