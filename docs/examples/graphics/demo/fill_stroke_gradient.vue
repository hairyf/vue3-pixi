<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { FillGradient } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const graphic1Rotation = ref(0)
const graphic2StrokeWidth = ref(20)
let tick = 0

// Create a color array for the linear gradient
const colorStops = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x000000]

// Create a fill gradient
const gradientFill = new FillGradient(0, 0, 1, 1)

// Add the color stops to the fill gradient
colorStops.forEach((number, index) => {
  const ratio = index / colorStops.length
  gradientFill.addColorStop(ratio, number)
})

function onGraphic1(graphics: GraphicsElement) {
  graphics.clear()
  graphics.roundRect(0, 0, 150, 150, 50)
  graphics.fill(gradientFill)
}

function onGraphic2(graphics: GraphicsElement) {
  graphics.clear()
  graphics.roundRect(0, 0, 150, 150, 50)
  graphics.stroke({ width: graphic2StrokeWidth.value, fill: gradientFill })
}

onTick(() => {
  tick += 0.025
  graphic1Rotation.value += 0.01
  graphic2StrokeWidth.value = Math.sin(tick) * 100
})
</script>

<template>
  <graphics
    :pivot="{ x: 75, y: 75 }"
    :x="150"
    :y="200"
    :rotation="graphic1Rotation"
    @effect="onGraphic1"
  />
  <graphics
    :x="350"
    :y="125"
    @effect="onGraphic2"
  />
</template>
