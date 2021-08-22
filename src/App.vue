<template>
	<TheIconSprite />
	<TheHeader />
	<DefaultLayout>
		<Home />
		<About />
		<Skills />
		<Works />
		<Contact />
		<TheFooter />
	</DefaultLayout>
</template>

<script setup>
	import DefaultLayout from "layouts/DefaultLayout.vue"
	import TheHeader from "components/TheHeader.vue"
	import Home from "views/Home.vue"
	import About from "views/About.vue"
	import Skills from "views/Skills.vue"
	import Works from "views/Works.vue"
	import Contact from "views/Contact.vue"
	import TheFooter from "components/TheFooter.vue"
	import TheIconSprite from "./components/TheIconSprite.vue"
</script>

<script>
	export default {
		mounted() {
			window.addEventListener("scroll", this.onScroll)
			if (this.$route.hash !== document.querySelector(".header-anchor").hash) {
				setTimeout(() => this.replaceHash(document.querySelector(".header-anchor")), 1)
			}
		},
		methods: {
			onScroll() {
				setTimeout(this.setActiveHash(), 300)
			},
			setActiveHash() {
				const headerOffset = document.querySelector("header").offsetHeight + 10
				const anchors = [].slice.call(document.querySelectorAll(".header-anchor"))
				const scrollTop =
					Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) +
					headerOffset
				const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

				const bottomY = window.innerHeight + (scrollTop - headerOffset)

				for (let i = 0; i < anchors.length; i++) {
					const anchor = anchors[i]
					const nextAnchor = anchors[i + 1]

					const isActive =
						(i === 0 && scrollTop === 0) ||
						(scrollTop >= anchor.parentElement.offsetTop + 10 &&
							(!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10))

					const routeHash = decodeURIComponent(this.$route.hash)
					if ((isActive && routeHash !== decodeURIComponent(anchor.hash)) || bottomY === scrollHeight) {
						let activeAnchor = anchor
						// check if anchor is at the bottom of the page to keep $route.hash consistent
						if (bottomY === scrollHeight) {
							activeAnchor = anchors[anchors.length - 1]
						}
						this.replaceHash(activeAnchor)
						return
					}
				}
			},
			replaceHash(activeAnchor) {
				this.$store.commit("setDisableScrollBehavior", true)
				this.$router.replace(decodeURIComponent(activeAnchor.hash)).then(() => {
					this.$nextTick(() => this.$store.commit("setDisableScrollBehavior", false))
				})
			},
		},
		beforeUnmount() {
			window.removeEventListener("scroll", this.onScroll)
		},
	}
</script>

<style>
	#app {
		@apply font-base text-primary bg-background;
		/* TODO: Needs tweaking */
		background: radial-gradient(var(--color-accent-alpha) 8%, transparent 0), var(--color-background);
		background-position: 0 0, 1.75em 1.75em;
		background-size: 1.75em 1.75em;
	}
	html {
		@apply text-base font-medium;
	}
</style>
