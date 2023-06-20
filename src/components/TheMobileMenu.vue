<template>
	<nav
		class="fixed top-0 bottom-0 left-0 right-0 invisible overflow-hidden text-center opacity-0 bg-accent-alpha"
		:class="isMenuOpen ? 'is-open' : ''"
	>
		<ul class="inline-flex flex-col items-end justify-center h-full">
			<li><CustomRouterLink to="#home" @click="handleMenuItemClick">Home</CustomRouterLink></li>
			<li><CustomRouterLink to="#about" @click="handleMenuItemClick">About</CustomRouterLink></li>
			<li><CustomRouterLink to="#skills" @click="handleMenuItemClick">Skills</CustomRouterLink></li>
			<li><CustomRouterLink to="#works" @click="handleMenuItemClick">Portfolio</CustomRouterLink></li>
			<li><CustomRouterLink to="#contact" @click="handleMenuItemClick">Contact</CustomRouterLink></li>
		</ul>
	</nav>
</template>

<script>
	import CustomRouterLink from "components/CustomRouterLink.vue"
	export default {
		components: {
			CustomRouterLink,
		},
		props: {
			isMenuOpen: {
				required: true,
				type: Boolean,
			},
		},
		methods: {
			handleMenuItemClick() {
				this.$emit("closeMenu")
			},
		},
	}
</script>

<style scoped>
	nav {
		z-index: -1;
		transition: all 0.275s 0.1s;
	}
	nav.is-open {
		@apply opacity-100 visible;
		z-index: 900;
	}

	nav::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: -15px;
		transform-origin: 0 0;
		transform: skew(-14deg) translateX(-120%);
		transition: all 0.275s 0.1s;
		@apply bg-background;
	}

	nav.is-open::before {
		transform: skew(-14deg) translateX(0);
	}

	nav ul,
	nav li {
		@apply list-none p-0;
	}

	nav ul {
		transform: translateX(-18%) skew(-16deg);
	}

	nav li {
		transform: skew(16deg);
		@apply block my-2 mx-0 text-right;
	}

	nav a {
		@apply opacity-0 -translate-y-3 block py-0 font-bold text-primary;
		text-decoration: none;
	}

	nav.is-open a {
		@apply opacity-100 translate-y-0;
	}

	nav li:nth-child(1) a {
		transition: all 275ms 175ms;
	}
	nav li:nth-child(2) a {
		transition: all 275ms 225ms;
	}
	nav li:nth-child(3) a {
		transition: all 275ms 275ms;
	}
	nav li:nth-child(4) a {
		transition: all 275ms 325ms;
	}
	nav li:nth-child(5) a {
		transition: all 275ms 375ms;
	}
</style>
