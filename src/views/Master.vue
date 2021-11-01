<template>
	<Home />
	<About />
	<Skills />
	<Works />
	<Contact />
</template>

<script setup>
	import Home from "views/Home.vue"
	import About from "views/About.vue"
	import Skills from "views/Skills.vue"
	import Works from "views/Works.vue"
	import Contact from "views/Contact.vue"

	import { debounce } from "debounce"
	import { onMounted, onBeforeUnmount } from "vue"
	import { useRouter } from "vue-router"

	const router = useRouter()

	const setActiveHash = () => {
		// get header height
		const offset = document.querySelector("header").offsetHeight

		//get all header anchors
		const anchors = [].slice.call(document.querySelectorAll(".header-anchor"))

		// get current scroll top
		const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

		// get the total scroll length of current page
		const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)

		// get the current scroll bottom
		const scrollBottom = window.innerHeight + scrollTop

		// check if we have reached page bottom
		const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset

		for (let i = 0; i < anchors.length; i++) {
			const anchor = anchors[i]
			const nextAnchor = anchors[i + 1]

			// if this is the first anchor and now it's on the top of the page
			const isTheFirstAnchorActive = i === 0 && scrollTop === 0

			// if has scrolled past this anchor
			const hasPassedCurrentAnchor = scrollTop >= (anchor.parentElement?.offsetTop ?? 0) - offset

			// if has not scrolled past next anchor
			const hasNotPassedNextAnchor =
				!nextAnchor || scrollTop < (nextAnchor.parentElement?.offsetTop ?? 0) - offset

			// if this anchor is the active anchor
			const isActive = isTheFirstAnchorActive || (hasPassedCurrentAnchor && hasNotPassedNextAnchor)

			// continue to find the active anchor
			if (!isActive) continue

			const routeHash = decodeURIComponent(router.currentRoute.value.hash)
			let anchorHash = decodeURIComponent(anchor.hash)

			// if the active anchor hash is current route hash, do nothing
			if (routeHash === anchorHash && !isAtPageBottom) return

			// check if anchor is at the bottom of the page to keep hash consistent
			if (isAtPageBottom) {
				for (let j = i + 1; j < anchors.length; j++) {
					// if current route hash is below the active hash, do nothing
					if (routeHash === decodeURIComponent(anchors[j].hash)) {
						return
					}
					// else set anchor hash to last hash
					else {
						anchorHash = decodeURIComponent(anchors[j].hash)
					}
				}
			}

			// replace current route hash with the active anchor hash
			replaceWithoutScrollBehavior({
				hash: anchorHash,
				force: true,
			})
			return
		}
	}

	const replaceWithoutScrollBehavior = async (options) => {
		const { scrollBehavior } = router.options
		router.options.scrollBehavior = undefined
		await router.replace(options).finally(() => (router.options.scrollBehavior = scrollBehavior))
	}

	const onScroll = debounce(() => {
		setActiveHash()
	}, 100)

	onMounted(() => {
		onScroll()
		window.addEventListener("scroll", onScroll)
	})
	onBeforeUnmount(() => {
		window.removeEventListener("scroll", onScroll)
	})
</script>
