<template>
	<footer>
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
		<div class="flex items-center justify-center">
			<img :src="heartIcon" alt="Heart Icon" class="w-6 h-6" />
			<p class="pl-1 font-medium">Created by Venki Vijay</p>
		</div>
		<p class="py-4 text-center text-secondary">© All rights reserved</p>
	</footer>
</template>

<script setup>
	import heartIcon from "assets/icons/heart.svg"
</script>

<style scoped>
	ul > * {
		@apply flex-1 px-4;
	}
</style>
