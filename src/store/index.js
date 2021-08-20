import { createStore } from "vuex"

const store = createStore({
	state() {
		return {
			disableScrollBehavior: false,
		}
	},
	mutations: {
		setDisableScrollBehavior(state, value) {
			state.disableScrollBehavior = value
		},
	},
})

export default store
