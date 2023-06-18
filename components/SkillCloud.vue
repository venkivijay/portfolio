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

<script setup>
import { PerspectiveCamera, Scene, Vector3, Group } from "three";
import { TrackballControls } from "../node_modules/three/examples/jsm/controls/TrackballControls.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js";
import { skills } from "assets/staticData";

// final css objects that gets added to the scene
const objects = ref([]);
const container = ref();
const camera = ref();
const scene = ref();
const renderer = ref();
const group = ref();
const controls = ref();
const hasInteraction = ref();

function init() {
  // get the container
  container.value = document.getElementById("skillcloud");

  // Setting Camera
  camera.value = new PerspectiveCamera(35, 1, 0.1, 3500);
  camera.value.position.z = 2000;

  // Setting Scene
  scene.value = new Scene();

  // Setting Renderer
  renderer.value = new CSS2DRenderer();
  renderer.value.setSize(
    container.value.parentElement.clientWidth,
    container.value.parentElement.clientHeight
  );

  // Group for CSSObjects
  group.value = new Group();
  scene.value.add(group.value);

  // Create sphere and add to scene
  addSphereToScene();
  container.value.appendChild(renderer.value.domElement);

  // Setting Controls
  controls.value = new TrackballControls(
    camera.value,
    renderer.value.domElement
  );
  controls.value.rotateSpeed = 2;
  controls.value.noPan = true;
  controls.value.noZoom = true;

  // Custom control interaction handler
  hasInteraction.value = false;
}

function addSphereToScene() {
  const vector = new Vector3();

  // provides a extra depth effect as in THREE.Fog
  const fog = document.createElement("div");
  fog.className = "fog";
  const fogObject = new CSS2DObject(fog);
  scene.value.add(fogObject);

  for (let i = 0; i < skills.length; i++) {
    // Create a wrapper element
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "iconWrapper";

    // Create and add icon as an image to the element
    const img = document.createElement("img");
    img.className = "icon";
    img.src =
      "https://unpkg.com/simple-icons@9.1.0/icons/" + skills[i].slug + ".svg";
    img.alt = skills[i].name;
    img.draggable = false;

    // color-primary - #808dad
    img.style.filter =
      "invert(64%) sepia(6%) saturate(1740%) hue-rotate(185deg) brightness(87%) contrast(83%)";

    // color-accent - #eb4a4a
    // img.style.filter =
    // 	"invert(42%) sepia(11%) saturate(6555%) hue-rotate(326deg) brightness(95%) contrast(93%)"

    const label = document.createElement("p");
    label.className = "label whitespace-nowrap";
    label.innerText = skills[i].name;

    iconWrapper.appendChild(img);
    iconWrapper.appendChild(label);

    const objectCSS = new CSS2DObject(iconWrapper);

    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    objectCSS.position.setFromSphericalCoords(500, phi, theta);
    vector.copy(objectCSS.position).multiplyScalar(2);

    // collect final objects to manipulate opacity later
    objects.value.push(objectCSS);
    group.value.add(objectCSS);
  }
}

function animate() {
  requestAnimationFrame(animate);
  addOpacity();
  if (!hasInteraction.value) {
    group.value.rotation.y += 0.004;
    group.value.rotation.x += 0.004;
  }
  render();
  controls.value.update();
}

function addOpacity() {
  for (let i = 0; i < objects.value.length; i++) {
    objects.value[i].element.style.opacity =
      (objects.value[i].element.style.zIndex - 1) / (objects.value.length - 1);
  }
}
function render() {
  renderer.value.render(scene.value, camera.value);
}

function windowResizeHandler() {
  camera.value.aspect =
    container.value.parentElement.clientWidth /
    container.value.parentElement.clientHeight;
  camera.value.updateProjectionMatrix();
  renderer.value.setSize(
    container.value.parentElement.clientWidth,
    container.value.parentElement.clientHeight
  );
  controls.value.handleResize();
  render();
}

function handleInteraction(e) {
  if (!e) return;
  if (e.type === "pointerdown") {
    hasInteraction.value = true;
  }
  if (e.type === "pointerup") {
    hasInteraction.value = false;
  }
}

onMounted(() => {
  window.addEventListener("resize", windowResizeHandler);
  init();
  animate();
});

onUnmounted(() => {
  window.removeEventListener("resize", windowResizeHandler);
});
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
