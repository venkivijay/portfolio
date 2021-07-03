<template>
	<section class="flex flex-wrap justify-around pt-20 c-overall-p">
		<header class="flex flex-col">
			<p class="py-2 c-highlight">My Works</p>
			<div class="flex flex-col">
				<h1 class="py-2 text-lg font-bold">Some of my distinguished works</h1>
				<ul class="flex justify-end py-2 font-bold text-secondary">
					<li class="c-active"><a href="#">Mobile Apps</a></li>
					<li><a href="#">Web Apps</a></li>
					<li><a href="#">More</a></li>
				</ul>
			</div>
		</header>
		<ProjectCard v-for="i in 3" :key="i" />
	</section>
</template>

<script setup>
	import ProjectCard from "components/ProjectCard.vue"
</script>

<style scoped>
	header {
		flex-basis: 100%;
	}
	ul > * {
		@apply px-2;
	}
</style>
