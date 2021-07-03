<template>
	<span v-if="name" class="text-teal absolute leading-none opacity-0">
		{{ name }}
	</span>
	<svg
		class="icon text-gray-light fill-current"
		:class="secondaryIcon ? 'small' : 'large'"
		@mouseover="handleMouseOver"
		@mouseleave="handleMouseLeave"
	>
		<use v-bind:xlink:href="displayIcon" />
	</svg>
</template>

<script>
	export default {
		name: "Icon",
		props: {
			name: String,
			primaryIcon: String,
			secondaryIcon: String,
		},
		data() {
			return {
				icon: this.primaryIcon,
			}
		},
		methods: {
			handleMouseOver() {
				if (this.secondaryIcon) this.icon = this.secondaryIcon
			},
			handleMouseLeave() {
				if (this.secondaryIcon) this.icon = this.primaryIcon
			},
		},
		computed: {
			displayIcon() {
				return "#" + this.icon
			},
		},
	}
</script>

<style scoped>
	$duration: 0.5s;
	span {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: opacity $duration ease;
	}
	.icon {
		transition: opacity $duration ease;
	}
	.small {
		@apply w-5 h-5;
	}
	.large {
		@apply w-5 h-5;
	}
	@screen sm {
		.large {
			@apply w-7 h-7;
		}
	}
	button {
		-webkit-tap-highlight-color: transparent;
	}
</style>
