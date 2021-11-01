<template>
	<router-link :to="{ path: '/', hash: to }" active-class="" exact-active-class="" :class="isActive">
		<slot />
	</router-link>
</template>

<script>
	export default {
		props: {
			to: {
				type: String,
				required: true,
			},
		},
		computed: {
			isActive() {
				return this.$route.hash === this.to ? "active" : false
			},
		},
		methods: {
			normalize(path) {
				return decodeURI(path).replace(/#.*$/, "")
			},
			getHash(path) {
				const match = path.match(/#.*$/)
				if (match) {
					return match[0]
				}
			},
		},
	}
</script>

<style></style>
