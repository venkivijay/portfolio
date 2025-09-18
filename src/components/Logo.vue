<template>
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Venki @ venkivijay.com</title>
    <g>
      <path
        class="path1"
        d="M25.64 89.27l114.91 314 107.33-292.89L355.5 403.5 469.51 89.31h-183.1c-.03 0 .12 13.28.12 13.28l163.94-.12L355.5 363.5 255.38 89.4l-184.94-.02.09 13.24 164.95-.19-95 262.05L40.44 89.3l-14.8-.03z"
        stroke="black" stroke-width="2.5" stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@keyframes grow {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 1600px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  40% {
    stroke-dasharray: 1600px 0;
  }
  85% {
    stroke-dasharray: 1600px 0;
  }
  95%,
  to {
    stroke-dasharray: 0 1600px;
  }
}
.path1 {
  stroke-dashoffset: 1px;
  stroke-dasharray: 1600px 0;
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}
.dark .path1 {
  stroke: #fdfdfd;
}
</style>
