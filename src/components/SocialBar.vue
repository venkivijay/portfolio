<template>
	<div class="w-full mx-auto mb-4 md:max-w-lg">
		<ul class="flex justify-around">
			<li v-for="social in socials" :key="social.primaryIcon">
				<a :href="social.url ? social.url : '#'" :aria-label="social.name">
					<Icon :primaryIcon="social.primaryIcon" class="w-5 h-5" />
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import Icon from "components/Icon.vue"
	import { socials } from "/src/staticData.js"
</script>
