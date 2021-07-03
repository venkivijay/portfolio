<template>
	<!-- <router-view></router-view> -->
	<Header />
	<Home />
	<Works />
	<Contact />
	<Footer />
	<!-- <Dots :count="20" /> -->
</template>

<script setup>
	import Home from "views/Home.vue"
	import Header from "components/Header.vue"
	import Works from "views/Works.vue"
	import Contact from "views/Contact.vue"
	import Footer from "components/Footer.vue"
	import Dots from "components/LittleThings/Dots.vue"
</script>

<style>
	#app {
		@apply font-default font-normal text-primary bg-background;
	}
</style>
