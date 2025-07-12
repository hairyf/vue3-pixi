<script setup>
import { Assets } from 'vue3-pixi'

const images = [
  '/assets/food/lemonpie.png',
  '/assets/food/strawberrycake.png',
  '/assets/food/cheesecake.png',
]
</script>

<template>
  <Assets :entry="images">
    <!-- loading state via #fallback slot -->
    <template #fallback>
      <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
        Loading...
      </text>
    </template>
    <!-- component with nested async dependencies -->
    <template #default="{ data }">
      <sprite
        v-for="(image, key, index) in data" :key="key"
        :texture="image"
        :anchor="0.5"
        :x="68 + index * 50"
        :y="120"
        :scale="1.4"
      />
    </template>
  </Assets>
</template>
