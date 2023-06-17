<template>
	<section id="home" class="mt-4 md:mt-8">
		<article class="grid md:grid-cols-2">
			<div id="intro" class="flex flex-col items-center md:items-stretch md:self-end">
				<h2 class="self-start mb-1 md:self-auto c-highlight text-h2">
					<router-link class="header-anchor" :to="{ hash: '#home' }">Hello</router-link>
				</h2>
				<h1 class="mb-4 font-bold text-h1 md:whitespace-nowrap text-secondary">
					I'M {{ owner.firstName.toUpperCase() }}
					<span class="md:block">{{ owner.lastName.toUpperCase() }}</span>
				</h1>
				<p class="mb-4">{{ owner.role }}</p>
			</div>
			<div id="picture" class="relative p-8 mb-4 justify-self-center profile md:justify-self-end">
				<img class="rounded profile-image" :src="profileImg" alt="A picture of Venki" />
				<div id="dots" class="absolute top-0 right-0 w-16 h-16 dots text-accent"></div>
				<div id="experience" class="absolute bottom-0 right-0 flex items-center p-2 glass">
					<Icon primaryIcon="man-star" class="w-10 h-10 p-1 text-accent" />
					<div>
						<p class="font-bold">Experience</p>
						<p class="font-bold">{{ owner.experience }} Years</p>
					</div>
				</div>
			</div>
			<div id="cta" class="justify-self-center md:justify-self-auto md:self-start whitespace-nowrap">
				<button class="c-button-primary"><router-link :to="{ hash: '#contact' }">Hire Me</router-link></button>
				<a
					href="https://venkivijay.github.io/resume/"
					class="ml-3 align-baseline text-accent"
					target="_blank"
					rel="noopener noreferrer"
				>
					Get Resume
					<Icon primaryIcon="download" class="inline w-5 h-5 align-text-bottom text-accent" />
				</a>
			</div>
		</article>
	</section>
</template>

<script setup>
	import profileImg from "assets/images/me.jpg"
	import Icon from "components/Icon.vue"
	import { owner } from "/src/staticData"
</script>

<style scoped>
	@media (min-width: 768px) {
		.profile {
			grid-row: 1/3;
			grid-column: 2;
		}
	}
	.profile-image {
		border-top-left-radius: 60px;
		animation: ripple 2s linear infinite;
		/* max-height: 300px; */
	}
	.dots {
		opacity: 50%;
		background-image: radial-gradient(currentColor 2px, transparent 2px);
		background-size: calc(6 * 2px) calc(6 * 2px);
	}
	.glass {
		background: rgba(25, 40, 86, 0.7);
		box-shadow: 0 8px 32px 0 rgba(27, 28, 51, 0.37);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-radius: 10px;
		animation: exp-card 1.5s linear infinite alternate-reverse;
	}

	@keyframes exp-card {
		0% {
			transform: perspective(200px) rotateY(20deg) rotateX(-20deg);
		}
		25% {
			transform: perspective(200px) rotateY(0deg) rotateX(20deg);
		}
		50% {
			transform: perspective(200px) rotateY(-20deg) rotateX(-20deg);
		}
		75% {
			transform: perspective(200px) rotateY(0deg) rotateX(20deg);
		}
		100% {
			transform: perspective(200px) rotateY(20deg) rotateX(-20deg);
		}
	}

	@keyframes ripple {
		0% {
			box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
		}
		100% {
			box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
		}
	}
</style>
