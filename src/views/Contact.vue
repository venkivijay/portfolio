<template>
	<section class="flex flex-wrap pt-20 c-overall-p">
		<header class="flex flex-col">
			<p class="py-2 c-highlight">Contact Me</p>
			<h1 class="py-2 text-xl font-medium">Let's work together</h1>
			<p class="py-2 font-medium text-secondary">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, nemo.
			</p>
		</header>
		<form action="#" class="w-full">
			<label>
				<input type="text" name="user-name" id="username" placeholder="Your Name" />
			</label>
			<label>
				<input type="email" name="user-mail" id="usermail" placeholder="Email Address" />
			</label>
			<label>
				<input type="text" name="mail-subject" id="mailsub" placeholder="Subject" />
			</label>
			<label>
				<textarea type="text" name="mail-message" rows="5" id="mailmes" placeholder="Message" />
			</label>
			<button type="submit" class="my-4 c-button-primary">Send</button>
		</form>
		<div id="socials">
			<div id="location" class="flex items-center py-2">
				<Icon primaryIcon="location" class="p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4 font-medium text-secondary">Salem - Chennai, TamilNadu, India</p>
			</div>
			<div id="mail" class="flex items-center py-2">
				<Icon primaryIcon="mail" class="p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4 font-medium text-secondary">me@venkivijay.com</p>
			</div>
			<div id="phone" class="flex items-center py-2">
				<Icon primaryIcon="phone" class="p-1 rounded-lg bg-accent-alpha text-accent" />
				<p class="pl-4 font-medium text-secondary">+91 6369888030</p>
			</div>
		</div>
		<SocialBar />
	</section>
</template>

<script setup>
	import Icon from "components/Icon.vue"
	import SocialBar from "components/SocialBar.vue"
</script>

<style scoped>
	header {
		flex-basis: 100%;
	}
	input,
	textarea {
		@apply block w-full p-3 my-4 font-medium rounded-md bg-surface text-secondary focus:ring-0 placeholder-secondary;
	}
	.icon {
		@apply w-6 h-6;
	}
</style>
