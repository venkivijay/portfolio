<template>
	<TheIconSprite />
	<TheHeader />
	<DefaultLayout>
		<router-view></router-view>
	</DefaultLayout>
	<TheFooter />
</template>

<script setup>
	import TheIconSprite from "./components/TheIconSprite.vue"
	import TheHeader from "components/TheHeader.vue"
	import DefaultLayout from "layouts/DefaultLayout.vue"
	import TheFooter from "components/TheFooter.vue"
</script>

<style>
	:root {
		scroll-behavior: smooth;
	}
	#app {
		@apply font-base text-primary bg-background;
		background: radial-gradient(var(--color-accent-alpha) 8%, transparent 0), var(--color-background);
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
