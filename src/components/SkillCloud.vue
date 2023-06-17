<template>
	<div class="relative overflow-hidden wrapper">
		<div
			id="skillcloud"
			class="absolute w-full h-full"
			@pointerdown="handleInteraction"
			@pointerup="handleInteraction"
		></div>
	</div>
</template>

<script>
	import { PerspectiveCamera, Scene, Vector3, Group } from "three"
	import { TrackballControls } from "/node_modules/three/examples/jsm/controls/TrackballControls.js"
	import { CSS2DRenderer, CSS2DObject } from "/node_modules/three/examples/jsm/renderers/CSS2DRenderer.js"
	import { skills } from "../staticData"

	export default {
		created() {
			window.addEventListener("resize", this.windowResizeHandler)
		},
		mounted() {
			this.init()
			this.animate()
		},
		methods: {
			init() {
				// set skills
				this.skills = skills

				// final css objects that gets added to the scene
				this.objects = []

				// get the container
				this.container = document.getElementById("skillcloud")

				// Setting Camera
				this.camera = new PerspectiveCamera(35, 1, 0.1, 3500)
				this.camera.position.z = 2000

				// Setting Scene
				this.scene = new Scene()

				// Setting Renderer
				this.renderer = new CSS2DRenderer()
				this.renderer.setSize(
					this.container.parentElement.clientWidth,
					this.container.parentElement.clientHeight
				)

				// Group for CSSObjects
				this.group = new Group()
				this.scene.add(this.group)

				// Create sphere and add to scene
				this.addSphereToScene()
				this.container.appendChild(this.renderer.domElement)

				// Setting Controls
				this.controls = new TrackballControls(this.camera, this.renderer.domElement)
				this.controls.rotateSpeed = 2
				this.controls.noPan = true
				this.controls.noZoom = true

				// Custom control interaction handler
				this.hasInteraction = false
			},

			addSphereToScene() {
				const vector = new Vector3()

				// provides a extra depth effect as in THREE.Fog
				const fog = document.createElement("div")
				fog.className = "fog"
				const fogObject = new CSS2DObject(fog)
				this.scene.add(fogObject)

				for (let i = 0; i < this.skills.length; i++) {
					// Create a wrapper element
					const iconWrapper = document.createElement("div")
					iconWrapper.className = "iconWrapper"

					// Create and add icon as an image to the element
					const img = document.createElement("img")
					img.className = "icon"
					img.src = "https://unpkg.com/simple-icons@9.1.0/icons/" + this.skills[i].slug + ".svg"
					img.alt = this.skills[i].name
					img.draggable = false

					// color-primary - #808dad
					img.style.filter =
						"invert(64%) sepia(6%) saturate(1740%) hue-rotate(185deg) brightness(87%) contrast(83%)"

					// color-accent - #eb4a4a
					// img.style.filter =
					// 	"invert(42%) sepia(11%) saturate(6555%) hue-rotate(326deg) brightness(95%) contrast(93%)"

					const label = document.createElement("p")
					label.className = "label whitespace-nowrap"
					label.innerText = this.skills[i].name

					iconWrapper.appendChild(img)
					iconWrapper.appendChild(label)

					const objectCSS = new CSS2DObject(iconWrapper)

					const phi = Math.acos(-1 + (2 * i) / this.skills.length)
					const theta = Math.sqrt(this.skills.length * Math.PI) * phi
					objectCSS.position.setFromSphericalCoords(500, phi, theta)
					vector.copy(objectCSS.position).multiplyScalar(2)

					// collect final objects to manipulate opacity later
					this.objects.push(objectCSS)
					this.group.add(objectCSS)
				}
			},

			animate() {
				requestAnimationFrame(this.animate)
				this.addOpacity()
				if (!this.hasInteraction) {
					this.group.rotation.y += 0.004
					this.group.rotation.x += 0.004
				}
				this.render()
				this.controls.update()
			},

			addOpacity() {
				for (let i = 0; i < this.objects.length; i++) {
					this.objects[i].element.style.opacity =
						(this.objects[i].element.style.zIndex - 1) / (this.objects.length - 1)
				}
			},

			render() {
				this.renderer.render(this.scene, this.camera)
			},

			windowResizeHandler() {
				this.camera.aspect =
					this.container.parentElement.clientWidth / this.container.parentElement.clientHeight
				this.camera.updateProjectionMatrix()
				this.renderer.setSize(
					this.container.parentElement.clientWidth,
					this.container.parentElement.clientHeight
				)
				this.controls.handleResize()
				this.render()
			},
			handleInteraction(e) {
				if (!e) return
				if (e.type == "pointerdown") {
					this.hasInteraction = true
				}
				if (e.type == "pointerup") {
					this.hasInteraction = false
				}
			},
		},
		unmounted() {
			window.removeEventListener("resize", this.windowResizeHandler)
		},
	}
</script>

<style>
	.wrapper {
		aspect-ratio: 1/1;
		width: 80vmin;
		height: 80vmin;
		max-width: 576px;
		max-height: 576px;
		margin: auto;
		flex: 0 1 auto;
	}
	.fog {
		background: #0e16301a;
		width: 100%;
		height: 100%;
	}
	.iconWrapper {
		width: 50px;
		height: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px;
		border-radius: 50%;
	}
	.icon {
		user-select: none;
	}
	.label {
		user-select: none;
		color: #fff;
	}
	@media screen and (max-width: 768px) {
		.icon {
			width: 25px;
			height: 25px;
		}
		.label {
			font-size: 0.6rem;
		}
	}
	@media screen and (min-width: 768px) {
		.icon {
			width: 50px;
			height: 50px;
		}
		.label {
			font-size: 0.8rem;
		}
	}
</style>
