<template>
	<section class="py-4 c-overall-p">
		<article class="flex flex-col">
			<div id="intro">
				<p class="py-2 text-lg c-highlight">Hello</p>
				<h1 class="py-2 text-6xl font-bold whitespace-nowrap">
					I'M VENKI
					<span class="block">VIJAY</span>
				</h1>
				<p class="py-2 text-lg font-medium text-secondary">Full Stack Developer</p>
			</div>
			<div class="relative self-center p-8">
				<img class="rounded profile-image" :src="profileImg" alt="A picture of Venki" />
				<div class="absolute top-0 right-0 w-16 h-16 dots text-accent"></div>
				<div class="absolute bottom-0 right-0 flex items-center p-2 glass">
					<img :src="manStarIcon" alt="Icon for experience" class="p-1 fill-current text-accent" />
					<div class="leading-none">
						<p class="text-xs font-bold text-secondary">Experience</p>
						<p class="text-sm font-bold">
							<span class="text-2xl">4</span>
							Years
						</p>
					</div>
				</div>
			</div>
			<div id="cta" class="self-center pt-4 align-middle whitespace-nowrap">
				<button class="c-button-primary">Hire Me</button>
				<a href="#" class="ml-3 font-medium align-baseline text-accent">
					Download Resume
					<img
						:src="downloadIcon"
						alt="Download my resume"
						class="inline w-5 h-5 fill-current text-accent"
					/>
				</a>
			</div>
		</article>
	</section>
</template>

<script setup>
	import profileImg from "assets/images/me.png"
	import manStarIcon from "assets/icons/man-star.svg"
	import downloadIcon from "assets/icons/download.svg"
	// import Icon from "components/Icon.vue"
</script>

<style scoped>
	.profile-image {
		border-top-left-radius: 60px;
		animation: ripple 2s linear infinite;
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
