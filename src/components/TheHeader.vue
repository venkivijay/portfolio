<template>
	<header
		class="
			sticky
			top-0
			z-50
			flex
			items-center
			justify-between
			px-8
			py-4
			mb-6
			bg-opacity-50
			border-b
			md:px-24
			lg:px-32
			xl:px-48
			backdrop-filter backdrop-blur
			border-primary
		"
	>
		<!-- TODO: Replace below with logo -->
		<p class="leading-none text-h1 font-brand text-accent">VV</p>
		<nav class="hidden md:block">
			<ul class="flex items-center">
				<li><CustomRouterLink to="#home">Home</CustomRouterLink></li>
				<li><CustomRouterLink to="#about">About</CustomRouterLink></li>
				<li><CustomRouterLink to="#skills">Skills</CustomRouterLink></li>
				<li><CustomRouterLink to="#works">Portfolio</CustomRouterLink></li>
				<li><CustomRouterLink to="#contact">Contact</CustomRouterLink></li>
				<li class="hidden lg:static">|</li>
				<li class="hidden lg:static">
					<p class="whitespace-nowrap text-accent">+91-6369888030</p>
				</li>
			</ul>
		</nav>
		<!-- Hamburger Menu Button -->
		<button
			class="absolute pt-5 cursor-pointer top-4 right-4 focus:outline-none md:hidden"
			:class="isMenuOpen ? 'is-open' : ''"
			@click="isMenuOpen = !isMenuOpen"
		>
			<span class="relative block h-1 mx-0 my-auto skew-y-6 w-7 bg-accent burger"></span>
		</button>
	</header>
	<TheMobileMenu :isMenuOpen="isMenuOpen" @closeMenu="isMenuOpen = !isMenuOpen" />
</template>

<script setup>
	import Icon from "components/Icon.vue"
	import TheMobileMenu from "components/TheMobileMenu.vue"
	import CustomRouterLink from "components/CustomRouterLink.vue"
</script>

<script>
	export default {
		data() {
			return {
				isMenuOpen: false,
			}
		},
		watch: {
			isMenuOpen() {
				document.body.style.overflow = this.isMenuOpen ? "hidden" : "auto"
			},
		},
	}
</script>

<style scoped>
	header {
		border-style: groove;
	}
	ul > * {
		@apply flex-1 px-4;
	}
	.burger {
		transform: skew(5deg);
		transition: all 0.275s;
	}
	.burger:after,
	.burger:before {
		content: "";
		transition: all 0.275s;
		@apply h-full block bg-accent;
	}
	.burger:after {
		transform: translateY(-12px) translateX(-2px) skew(-20deg);
	}

	.burger:before {
		transform: translateY(-16px) skew(-10deg);
	}
	.is-open .burger {
		transform: translateY(-8px) rotate(-45deg);
	}

	.is-open .burger:before {
		transform: translateY(0px) skew(-10deg) rotate(75deg);
	}

	.is-open .burger:after {
		transform: translateY(-12px) translateX(10px) skew(-20deg);
		opacity: 0;
	}
</style>
