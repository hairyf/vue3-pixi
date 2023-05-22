<script lang="ts" setup>
import { Texture } from 'pixi.js'

function createGradTexture() {
  const quality = 256
  const canvas = document.createElement('canvas')
  canvas.width = quality
  canvas.height = 1

  const ctx = canvas.getContext('2d')!
  // use canvas2d API to create gradient
  const gradient = ctx.createLinearGradient(0, 0, quality, 0)

  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)')
  gradient.addColorStop(0.3, 'cyan')
  gradient.addColorStop(0.7, 'red')
  gradient.addColorStop(1, 'green')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, quality, 1)

  return Texture.from(canvas)
}

const texture = createGradTexture()
</script>

<template>
  <sprite :position="100" :rotation="Math.PI / 8" :width="500" :height="50" :texture="texture" />
</template>


