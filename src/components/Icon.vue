<template>
	<svg class="fill-current stroke-current">
		<use v-bind:xlink:href="displayIcon" />
	</svg>
</template>

<script>
	export default {
		name: "Icon",
		props: {
			primaryIcon: { type: String, required: true },
		},
		data() {
			return {
				icon: this.primaryIcon,
			}
		},
		computed: {
			displayIcon() {
				return "#" + this.icon
			},
		},
	}
</script>
