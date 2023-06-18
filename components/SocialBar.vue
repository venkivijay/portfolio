<template>
  <ul class="flex justify-around">
    <li v-for="social in socials" :key="social.primaryIcon">
      <a
        :href="social.url ? social.url : '#'"
        :aria-label="social.name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon :primary-icon="social.primaryIcon" class="w-5 h-5" />
      </a>
    </li>
  </ul>
</template>

<script setup>
import { socials } from "assets/staticData.js";
</script>
