<template>
	<form action="#" class="w-full" id="contact-form">
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
</template>

<script setup></script>

<style scoped>
	input,
	textarea {
		@apply block w-full p-3 my-4 rounded-md bg-surface focus:ring-0;
	}
	@media (min-width: 768px) {
		form {
			grid-row: 1/3;
			grid-column: 2;
			padding-top: calc(var(--nav-height) + 0.5rem);
		}
	}
</style>
