<template>
	<article class="flex flex-col p-4 m-2 rounded-lg bg-surface">
		<h3 class="py-2 font-bold text-accent">{{ project.name }}</h3>
		<p class="py-2">{{ project.description }}</p>
		<ul class="flex py-2">
			<li class="p-2 m-1 rounded-lg bg-tag text-small" v-for="tag in project.tags" :key="tag">
				{{ tag }}
			</li>
		</ul>
		<img
			class="self-center p-2 rounded-2xl"
			:src="project.imageURL ? project.imageURL : 'https://via.placeholder.com/250x200'"
			:alt="'A screenshot of ' + project.name + 'project'"
		/>
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
	}
</script>

<style scoped>
	article {
		flex: 0 0 300px;
	}
</style>
