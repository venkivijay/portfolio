<template>
	<footer>
		<div class="w-full mx-auto mb-4 md:max-w-lg">
			<SocialBar />
		</div>
		<p class="pl-1 text-center text-small">
			Design inspired from
			<a href="https://www.behance.net/Ibrahim_Shamss/" target="_blank" rel="noopener noreferrer">
				Ibrahim Shamss
			</a>
		</p>
		<div class="flex items-center justify-center py-2">
			<img :src="heartIcon" alt="Heart Icon" class="w-6 h-6" />
			<p class="pl-1 text-small">Developed by Venki Vijay</p>
		</div>
	</footer>
</template>

<script setup>
	import heartIcon from "assets/icons/heart.svg"
	import SocialBar from "components/SocialBar.vue"
</script>

<style scoped>
	ul > * {
		@apply flex-1 px-4;
	}
</style>
