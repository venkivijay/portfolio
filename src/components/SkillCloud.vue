<script setup>
import { Group, PerspectiveCamera, Scene, Vector3 } from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { isDark } from '~/logics'

const props = defineProps({
  skills: {
    type: Array,
    required: true,
  },
})
const container = ref(null)
const camera = new PerspectiveCamera(35, 1, 0.1, 3500)
const scene = new Scene()
const group = new Group()
const renderer = ref()
const controls = ref()
const objects = ref([])
const hasInteraction = ref(false)

function handleInteraction(e) {
  if (!e)
    return
  hasInteraction.value = e.type === 'pointerdown'
}

function addSphereToScene() {
  const vector = new Vector3()
  props.skills.forEach((skill, i) => {
    const iconWrapper = document.createElement('div')
    iconWrapper.className = 'flex flex-col items-center gap-1'

    const icon = document.createElement('div')
    icon.className = `select-none !m-0 w-6 h-6 md:w-10 md:h-10 !grayscale-100`
    icon.classList.add(skill.slug)
    applyThemeToIcon(icon)

    const label = document.createElement('p')
    label.textContent = skill.name
    label.className = 'text-xs md:text-sm whitespace-nowrap select-none !m-0'

    iconWrapper.appendChild(icon)
    iconWrapper.appendChild(label)

    const objectCSS = new CSS2DObject(iconWrapper)
    const phi = Math.acos(-1 + (2 * i) / props.skills.length)
    const theta = Math.sqrt(props.skills.length * Math.PI) * phi
    objectCSS.position.setFromSphericalCoords(500, phi, theta)
    vector.copy(objectCSS.position).multiplyScalar(2)

    objects.value.push(objectCSS)
    group.add(objectCSS)
  })
}

function applyThemeToIcon(icon) {
  icon.style.filter = isDark.value
    ? 'invert(0%)'
    : 'invert(100%)'
}

function applyThemeToScene() {
  for (const obj of objects.value) {
    const icon = obj.element.querySelector('div')
    if (icon)
      applyThemeToIcon(icon)
  }
}

function animate() {
  requestAnimationFrame(animate)
  addOpacity()
  if (!hasInteraction.value) {
    group.rotation.y += 0.002
    group.rotation.x += 0.002
  }
  renderer.value.render(scene, camera)
  controls.value?.update()
}

function addOpacity() {
  for (const obj of objects.value) {
    obj.element.style.opacity
      = (Number.parseInt(obj.element.style.zIndex || '1') - 1) / (objects.value.length - 1)
  }
}

function handleResize() {
  if (!container.value)
    return
  const width = container.value.clientWidth
  const height = container.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.value.setSize(width, height)
  controls.value?.handleResize()
}

onMounted(() => {
  const el = container.value
  if (!el)
    return
  renderer.value = new CSS2DRenderer()
  renderer.value.setSize(el.clientWidth, el.clientHeight)
  el.appendChild(renderer.value.domElement)

  camera.position.z = 2000
  scene.add(group)
  controls.value = new TrackballControls(camera, renderer.value.domElement)
  controls.value.rotateSpeed = 0.5
  controls.value.noPan = true
  controls.value.noZoom = true

  addSphereToScene()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(isDark, () => {
  nextTick(() => {
    applyThemeToScene()
  })
})
</script>

<template>
  <div
    ref="container" class="relative overflow-hidden aspect-square w-4/5 max-w-144 mx-auto"
    @pointerdown="handleInteraction"
    @pointerup="handleInteraction"
  />
</template>
