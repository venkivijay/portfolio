<template>
	<article class="flex flex-col p-4 m-2 rounded-lg bg-surface">
		<h1 class="py-2 font-bold text-accent">Title</h1>
		<p class="py-2 font-medium text-secondary">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, harum!
		</p>
		<ul class="flex py-2">
			<li>Vue</li>
			<li>Firebase</li>
			<li>Tailwindcss</li>
		</ul>
		<img
			class="self-center p-2 rounded-2xl"
			src="https://via.placeholder.com/250x200"
			alt="Placeholder for Project image"
		/>
	</article>
</template>

<script setup></script>

<style scoped>
	ul > li {
		@apply p-2 m-1 text-sm rounded-lg bg-tag font-bold text-secondary;
	}
</style>
