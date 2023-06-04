<script setup>
import { Application, Loader } from 'vue3-pixi'

const images = [
  '/assets/food/lemonpie.png',
  '/assets/food/strawberrycake.png',
  '/assets/food/cheesecake.png',
]
</script>

<template>
  <Application :width="240" :height="240">
    <Loader :resources="images">
      <!-- loading state via #fallback slot -->
      <template #fallback>
        <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
          Loading...
        </text>
      </template>

      <!-- component with nested async dependencies -->
      <template #default="{ textures }">
        <sprite
          v-for="(image, k, i) in textures" :key="k"
          :texture="image"
          :anchor="0.5"
          :x="68 + i * 50"
          :y="120"
          :scale="1.4"
        />
      </template>
    </Loader>
  </Application>
</template>
