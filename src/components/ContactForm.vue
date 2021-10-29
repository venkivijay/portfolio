<template>
	<form
		name="leads"
		data-netlify="true"
		data-netlify-honeypot="bot-field"
		class="w-full"
		id="contact-form"
		@submit.prevent="handleFormSubmit"
	>
		<input type="hidden" name="form-name" value="leads" />
		<label>
			<input
				type="text"
				name="name"
				v-model="form.name"
				:class="{ error: v$.form.name.$errors.length }"
				id="username"
				placeholder="Your Name"
			/>
			<div class="input-errors" v-for="error of v$.form.name.$errors" :key="error.$uid">
				<small class="error-msg">{{ error.$message }}</small>
				<br />
			</div>
		</label>
		<label>
			<input
				type="email"
				name="email"
				v-model="form.email"
				:class="{ error: v$.form.email.$errors.length }"
				id="usermail"
				placeholder="Email Address"
				novalidate
			/>
			<div class="input-errors" v-for="error of v$.form.email.$errors" :key="error.$uid">
				<small class="error-msg">{{ error.$message }}</small>
				<br />
			</div>
		</label>
		<label>
			<input
				type="text"
				name="subject"
				v-model="form.subject"
				:class="{ error: v$.form.subject.$errors.length }"
				id="mailsub"
				placeholder="Subject"
			/>
			<div class="input-errors" v-for="error of v$.form.subject.$errors" :key="error.$uid">
				<small class="error-msg">{{ error.$message }}</small>
				<br />
			</div>
		</label>
		<label>
			<textarea
				type="text"
				name="message"
				v-model="form.message"
				:class="{ error: v$.form.message.$errors.length }"
				rows="5"
				id="mailmes"
				placeholder="Message"
			/>
			<div class="input-errors" v-for="error of v$.form.message.$errors" :key="error.$uid">
				<small class="error-msg">{{ error.$message }}</small>
				<br />
			</div>
		</label>
		<button type="submit" class="my-4 c-button-primary">Send</button>
	</form>
</template>

<script>
	import useVuelidate from "@vuelidate/core"
	import { required, email } from "@vuelidate/validators"
	import { useToast, POSITION } from "vue-toastification"
	export default {
		name: "ContactForm",
		setup() {
			return { v$: useVuelidate(), toast: useToast() }
		},
		data() {
			return {
				form: {
					name: "",
					email: "",
					subject: "",
					message: "",
				},
			}
		},
		validations() {
			return {
				form: {
					name: { required },
					email: { required, email },
					subject: { required },
					message: { required },
				},
			}
		},
		methods: {
			encode(data) {
				return Object.keys(data)
					.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
					.join("&")
			},
			async handleFormSubmit() {
				let isValidForm = await this.v$.$validate()
				if (!isValidForm) return
				fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: this.encode({
						"form-name": "leads",
						...this.form,
					}),
				})
					.then(() => this.toast.success("Message sent!", { position: POSITION.BOTTOM_RIGHT }))
					.catch((error) =>
						// TODO: https://github.com/venkivijay/pf/projects/1#card-71654100
						// Custom component with socials inside toast
						this.toast.error("Error sending message! Contact through socials", {
							position: POSITION.BOTTOM_RIGHT,
						})
					)
					.finally(() => {
						this.form = { name: "", email: "", subject: "", message: "" }
						this.v$.$reset()
					})
			},
		},
	}
</script>

<style scoped>
	input,
	textarea {
		@apply block w-full p-3 my-4 rounded-md bg-surface outline-none border border-transparent focus:border-secondary;
	}
	.error-msg {
		@apply text-accent;
	}
	.error {
		@apply border-accent border;
	}
	@media (min-width: 768px) {
		form {
			grid-row: 1/3;
			grid-column: 2;
			padding-top: calc(var(--nav-height) + 0.5rem);
		}
	}
</style>
