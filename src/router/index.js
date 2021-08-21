import { createRouter, createWebHistory } from "vue-router"
import App from "/src/App.vue"
import store from "../store"
const routes = [
	{
		path: "/",
		component: App,
	},
	// {
	//     path: '/:pathMatch(.*)*',
	//     name: 'NotFound',
	//     component: NotFound,
	// },
]
const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: "",
	linkExactActiveClass: "",
	scrollBehavior(to, from, savedPosition) {
		// INFO: Since all current routes are pointed to App component only we need not use savedPosition
		// as it'll store every scroll position and completely messes up if user clicks browser back icon.
		// But we need this feature when using adding 404 route since it'll be a new component
		// if (savedPosition) {
		// 	console.log(savedPosition)
		// 	return savedPosition
		// }
		// if (to.path) {
		// 	let id = to.path.trim().slice(1)
		// 	return { el: document.getElementById(id ? id : "app"), top: 80, behavior: "smooth" }
		// }
		if (to.hash) {
			if (store.state.disableScrollBehavior) {
				return false
			}
			return {
				el: to.hash,
				top: document.querySelector("header").offsetHeight - 2,
			}
		}
		return { x: 0, y: 0 }
	},
})
export default router
