<template>
	<TheIconSprite />
	<TheHeader />
	<Home />
	<Skills />
	<Works />
	<Contact />
	<TheFooter />
</template>

<script setup>
	import TheHeader from "components/TheHeader.vue"
	import Home from "views/Home.vue"
	import Skills from "views/Skills.vue"
	import Works from "views/Works.vue"
	import Contact from "views/Contact.vue"
	import TheFooter from "components/TheFooter.vue"
	import TheIconSprite from "./components/TheIconSprite.vue"
</script>

<style>
	#app {
		@apply font-default font-normal text-primary bg-background;
	}
</style>
