import { createRouter, createWebHistory } from "vue-router"
import Master from "views/Master.vue"
const routes = [
	{
		path: "/",
		component: Master,
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/",
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "",
	linkExactActiveClass: "",
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) return savedPosition
		if (to.hash == document.querySelector(".header-anchor")?.hash) return { top: 0 }
		if (to.hash) return { el: to.hash }
		return { top: 0 }
	},
})
export default router
