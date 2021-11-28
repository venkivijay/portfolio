<template>
	<section id="skills" class="flex flex-col justify-around">
		<h2 class="py-2 mb-1 c-highlight text-h2">
			<router-link class="header-anchor" :to="{ hash: '#skills' }">Skills</router-link>
		</h2>
		<SkillCloud />
	</section>
</template>

<script setup>
	import SkillCloud from "components/SkillCloud.vue"
</script>
