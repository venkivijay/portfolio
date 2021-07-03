<template>
	<section class="flex flex-wrap pt-20 c-overall-p">
		<header class="flex flex-col">
			<p class="py-2 c-highlight">Contact Me</p>
			<h1 class="py-2 text-xl font-bold">Let's work together</h1>
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
				<img :src="locationIcon" alt="Location" class="w-10 h-10 p-1 rounded-lg bg-accent-alpha" />
				<p class="pl-4 font-bold text-secondary">Salem - Chennai, TamilNadu, India</p>
			</div>
			<div id="mail" class="flex items-center py-2">
				<img :src="mailIcon" alt="Email" class="w-10 h-10 p-1 rounded-lg bg-accent-alpha" />
				<p class="pl-4 font-bold text-secondary">me@venkivijay.com</p>
			</div>
			<div id="phone" class="flex items-center py-2">
				<img :src="phoneIcon" alt="Phone Number" class="w-10 h-10 p-1 rounded-lg bg-accent-alpha" />
				<p class="pl-4 font-bold text-secondary">+91 6369888030</p>
			</div>
		</div>
		<SocialBar />
	</section>
</template>

<script setup>
	import locationIcon from "assets/icons/location.svg"
	import mailIcon from "assets/icons/mail.svg"
	import phoneIcon from "assets/icons/phone.svg"
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
</style>
