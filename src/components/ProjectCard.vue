<template>
	<article class="flex flex-col p-4 m-2 rounded-lg bg-surface">
		<h4 class="py-2 font-bold text-accent">{{ project.name }}</h4>
		<p class="py-2">{{ project.description }}</p>
		<ul class="flex py-2">
			<li class="p-2 m-1 rounded-lg bg-tag text-small" v-for="tag in project.tags" :key="tag">
				{{ tag }}
			</li>
		</ul>
		<img
			v-if="project.image"
			class="self-center p-2 rounded-2xl"
			:src="getSrc(project.image)"
			:alt="'A screenshot of ' + project.name + ' project'"
		/>
		<div class="flex justify-around p-2">
			<button v-if="project.liveURL" class="py-1 c-button-primary">
				<a :href="project.liveURL" target="_blank" rel="noopener noreferrer">Visit</a>
			</button>
			<button v-if="project.sourceURL" class="py-1 c-button-primary">
				<a :href="project.sourceURL" target="_blank" rel="noopener noreferrer">Source</a>
			</button>
		</div>
	</article>
</template>

<script>
	export default {
		props: {
			project: {
				type: Object,
				required: true,
			},
		},
		methods: {
			getSrc(name) {
				const path = `../assets/images/projects/${name}.png`
				const modules = import.meta.globEager("../assets/images/projects/*.png")
				return modules[path].default
			},
		},
	}
</script>

<style scoped>
	article {
		flex: 0 0 300px;
	}
</style>
