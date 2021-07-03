<template>
	<div class="w-full py-10">
		<ul class="flex justify-around">
			<li>
				<a href="#"><img class="w-8 h-8" :src="githubIcon" alt="Link to" /></a>
			</li>
			<li>
				<a href="#"><img class="w-8 h-8" :src="linkedinIcon" alt="Link to" /></a>
			</li>
			<li>
				<a href="#"><img class="w-8 h-8" :src="twitterIcon" alt="Link to" /></a>
			</li>
			<li>
				<a href="#"><img class="w-8 h-8" :src="whatsappIcon" alt="Link to" /></a>
			</li>
			<li>
				<a href="#"><img class="w-8 h-8" :src="rssIcon" alt="Link to" /></a>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import githubIcon from "assets/icons/github.svg"
	import linkedinIcon from "assets/icons/linkedin.svg"
	import twitterIcon from "assets/icons/twitter.svg"
	import whatsappIcon from "assets/icons/whatsapp.svg"
	import rssIcon from "assets/icons/rss.svg"
</script>

<style scoped></style>
