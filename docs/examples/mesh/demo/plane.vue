<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const meshRef = ref()
let timer = 0

onTick(() => {
  if (!meshRef.value) return

  const { buffer } = meshRef.value.geometry.getAttribute('aPosition')

  for (let i = 0; i < buffer.data.length; i++) {
    buffer.data[i] += Math.sin(timer / 10 + i) * 0.5
  }
  buffer.update()
  timer++
})
</script>

<template>
  <assets
    alias="grass"
    entry="https://pixijs.com/assets/bg_grass.jpg"
  >
    <mesh-plane
      ref="meshRef"
      texture="grass"
      :vertices-x="10"
      :vertices-y="10"
      :x="100"
      :y="100"
    />
  </assets>
</template>
