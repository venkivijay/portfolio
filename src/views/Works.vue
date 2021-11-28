<template>
	<section id="works" class="flex flex-col justify-around">
		<h2 class="py-2 mb-1 c-highlight text-h2">
			<router-link class="header-anchor" :to="{ hash: '#works' }">Works</router-link>
		</h2>
		<div class="flex flex-col">
			<h3 class="py-2 text-h4 text-secondary">Some of my projects</h3>
		</div>
		<div id="projects" class="flex flex-wrap justify-center">
			<ProjectCard v-for="project in projects" :key="project.name" :project="project" />
		</div>
	</section>
</template>

<script setup>
	import ProjectCard from "components/ProjectCard.vue"
	import { projects } from "/src/staticData"
</script>
