<template>
	<header
		class="sticky top-0 z-30 flex items-center justify-between py-4 bg-opacity-50 border-b  c-overall-p backdrop-filter backdrop-blur border-secondary"
	>
		<p class="text-4xl leading-none font-brand text-accent">VV</p>
		<nav class="hidden md:block">
			<ul class="flex items-center font-medium text-secondary">
				<li class="c-active"><a href="#">Home</a></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Skills</a></li>
				<li><a href="#">Portfolio</a></li>
				<li><a href="#">Contact</a></li>
				<li>|</li>
				<li>
					<a class="whitespace-nowrap text-accent" href="#">+91-6369888030</a>
				</li>
			</ul>
		</nav>
		<div class="ham">
			<Icon primaryIcon="menu" class="w-10 h-10" />
		</div>
	</header>
</template>

<script setup>
	import Icon from "components/Icon.vue"
</script>

<style scoped>
	header {
		border-style: groove;
	}
	ul > * {
		@apply flex-1 px-4;
	}
</style>
