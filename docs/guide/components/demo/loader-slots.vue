<script setup>
import { Loader } from 'vue3-pixi'

const images = [
  '/assets/food/lemonpie.png',
  '/assets/food/strawberrycake.png',
  '/assets/food/cheesecake.png',
]
</script>

<template>
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
        v-for="(image, key, index) in textures" :key="key"
        :texture="image"
        :anchor="0.5"
        :x="68 + index * 50"
        :y="120"
        :scale="1.4"
      />
    </template>
  </Loader>
</template>
