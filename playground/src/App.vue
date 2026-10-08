<script setup>
import { ref } from 'vue'
import { Application } from 'vue3-pixi'

const rotation = ref(0)
</script>

<template>
  <main>
    <h1>Vue 3 Pixi Playground</h1>
    <button type="button" @click="rotation += Math.PI / 4">
      Rotate the text
    </button>
    <Application :width="640" :height="360" :background="0x1099BB" antialias>
      <text
        :x="320"
        :y="180"
        :anchor="0.5"
        :rotation="rotation"
        :style="{ fill: 'white', fontSize: 36 }"
      >
        Hello vue3-pixi!
      </text>
    </Application>
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  text-align: center;
}

button {
  margin-bottom: 1rem;
}

canvas {
  display: block;
  max-width: 100%;
  margin: auto;
}
</style>
