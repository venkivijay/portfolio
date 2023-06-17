<template>
	<header
		class="sticky top-0 flex items-center justify-between px-8 py-2 bg-opacity-50 border-b md:px-24 lg:px-32 xl:px-48 border-primary bg-background"
	>
		<RouterLink :to="{ path: '/', hash: '#home' }" aria-label="Logo">
			<svg class="w-12 h-12 fill-current stroke-current stroke-2 text-accent">
				<use xlink:href="#logo" />
			</svg>
		</RouterLink>
		<nav class="hidden md:block">
			<ul class="flex items-center">
				<li class="flex-1 px-4"><CustomRouterLink to="#home">Home</CustomRouterLink></li>
				<li class="flex-1 px-4"><CustomRouterLink to="#about">About</CustomRouterLink></li>
				<li class="flex-1 px-4"><CustomRouterLink to="#skills">Skills</CustomRouterLink></li>
				<li class="flex-1 px-4"><CustomRouterLink to="#works">Portfolio</CustomRouterLink></li>
				<li class="flex-1 px-4"><CustomRouterLink to="#contact">Contact</CustomRouterLink></li>
				<li class="flex-1 hidden px-4 lg:static">|</li>
				<li class="flex-1 hidden px-4 lg:static">
					<p class="whitespace-nowrap text-accent">+91-6369888030</p>
				</li>
			</ul>
		</nav>
		<button
			class="flex flex-col justify-between cursor-pointer wrapper-menu md:hidden"
			:class="isMenuOpen ? 'open' : ''"
			@click="isMenuOpen = !isMenuOpen"
			aria-label="Menu"
		>
			<div class="line-menu half start"></div>
			<div class="line-menu"></div>
			<div class="self-end line-menu half end"></div>
		</button>
	</header>
	<TheMobileMenu :isMenuOpen="isMenuOpen" @closeMenu="isMenuOpen = !isMenuOpen" />
</template>

<script setup>
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
		max-height: var(--nav-height);
		z-index: 999;
	}
	.wrapper-menu {
		width: 30px;
		height: 20px;
		transition: transform 330ms ease-out;
	}

	.wrapper-menu.open {
		transform: rotate(-45deg);
	}

	.line-menu {
		background-color: var(--color-accent);
		border-radius: 5px;
		width: 100%;
		height: 3px;
	}

	.line-menu.half {
		width: 50%;
	}

	.line-menu.start {
		transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
		transform-origin: right;
	}

	.open .line-menu.start {
		transform: rotate(-90deg) translateX(6px);
	}

	.line-menu.end {
		transition: transform 330ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
		transform-origin: left;
	}

	.open .line-menu.end {
		transform: rotate(-90deg) translateX(-6px);
	}
</style>
