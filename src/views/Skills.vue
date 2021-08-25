<template>
	<section id="skills" class="flex flex-col justify-around my-14">
		<h2 class="py-2 mb-1 c-highlight text-h2">
			<router-link class="header-anchor" :to="{ hash: '#skills' }">Skills</router-link>
		</h2>
		<!-- <p class="py-2">
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, magnam obcaecati minus, itaque
			molestias, ipsa sequi aperiam praesentium doloremque incidunt debitis? Voluptatibus exercitationem
			praesentium aperiam sed earum, corporis pariatur expedita ullam iusto iste! Facilis incidunt, numquam
			aliquam nihil est voluptatibus.
		</p> -->
		<SkillCloud />
	</section>
</template>

<script setup>
	import SkillCloud from "components/SkillCloud.vue"
</script>
