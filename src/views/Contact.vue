<template>
	<section id="contact" class="grid md:grid-cols-2">
		<div class="md:self-end md:pr-8 lg:pr-16">
			<h2 class="mb-1 c-highlight text-h2">
				<router-link class="header-anchor" :to="{ hash: '#contact' }">Contact</router-link>
			</h2>
			<h3 class="py-2 text-h4 text-secondary">Let's work together</h3>
			<p class="py-2">
				I am available for hire to work on your exciting project and have a keen interest in contributing to
				open-source initiatives. Please don't hesitate to reach out to me.
			</p>
		</div>
		<ContactForm />
		<div id="contacts" class="my-4 md:self-start md:pr-8 lg:pr-16">
			<div id="location" class="flex items-center py-2">
				<Icon primaryIcon="location" class="w-6 h-6 p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4">{{ contact.location }}</p>
			</div>
			<div id="mail" class="flex items-center py-2">
				<Icon primaryIcon="mail" class="w-6 h-6 p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4">{{ contact.email }}</p>
			</div>
			<div id="phone" class="flex items-center py-2">
				<Icon primaryIcon="phone" class="w-6 h-6 p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4">{{ contact.phone }}</p>
			</div>
		</div>
	</section>
</template>

<script setup>
	import Icon from "components/Icon.vue"
	import ContactForm from "components/ContactForm.vue"
	import { contact } from "../staticData"
</script>
