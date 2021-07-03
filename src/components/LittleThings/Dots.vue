<template>
	<div>
		<span v-for="index in count" :key="index">.</span>
	</div>
</template>

<script>
	export default {
		props: {
			count: Number,
		},
	}
</script>

<style scoped></style>
