<template>
	<div class="w-full py-10">
		<ul class="flex justify-around">
			<li>
				<a href="#">
					<Icon primaryIcon="github" />
				</a>
			</li>
			<li>
				<a href="#">
					<Icon primaryIcon="linkedin" />
				</a>
			</li>
			<li>
				<a href="#">
					<Icon primaryIcon="twitter" />
				</a>
			</li>
			<li>
				<a href="#">
					<Icon primaryIcon="whatsapp" />
				</a>
			</li>
			<li>
				<a href="#">
					<Icon primaryIcon="rss" />
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import Icon from "components/Icon.vue"
</script>

<style scoped>
	.icon {
		@apply w-5 h-5;
	}
</style>
