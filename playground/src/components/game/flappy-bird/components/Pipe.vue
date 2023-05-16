<script setup lang="ts">
import { SCALE_MODES, Texture } from 'pixi.js'
import pipePNG from '../assets/sprites/pipe-green.png'

defineProps<{
  x: number
  y: number
}>()

const texture = Texture.from(pipePNG, {
  scaleMode: SCALE_MODES.NEAREST,
})
</script>

<template>
  <container :x="x" :y="y">
    <sprite
      :texture="texture"
      :anchor-x="0.5"
      :y="-65"
      :scale="[1.5, -1.5]"
    />
    <sprite
      :texture="texture"
      :anchor-x="0.5"
      :y="65"
      :scale="[-1.5, 1.5]"
    />
  </container>
</template>
