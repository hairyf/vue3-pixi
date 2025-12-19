<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const containerScale = ref(1)
let count = 0

/**
 * Creates a grid pattern using Graphics lines
 */
function buildGrid(graphics: GraphicsElement, pixelLine: boolean) {
  graphics.clear()
  // Draw 10 vertical lines spaced 10 pixels apart
  for (let i = 0; i < 11; i++) {
    // Move to top of each line (x = i*10, y = 0)
    graphics
      .moveTo(i * 10, 0)
      // Draw down to bottom (x = i*10, y = 100)
      .lineTo(i * 10, 100)
  }

  // Draw 10 horizontal lines spaced 10 pixels apart
  for (let i = 0; i < 11; i++) {
    // Move to start of each line (x = 0, y = i*10)
    graphics
      .moveTo(0, i * 10)
      // Draw across to end (x = 100, y = i*10)
      .lineTo(100, i * 10)
  }

  if (pixelLine) {
    graphics.stroke({
      color: 0xFFFFFF,
      pixelLine: true,
      width: 1,
    })
  }
  else {
    graphics.stroke({
      color: 0xFFFFFF,
      pixelLine: false,
    })
  }
}

function onGridPixel(graphics: GraphicsElement) {
  buildGrid(graphics, true)
}

function onGrid(graphics: GraphicsElement) {
  buildGrid(graphics, false)
}

onTick(() => {
  count += 0.01
  containerScale.value = 1 + (Math.sin(count) + 1) * 2
})
</script>

<template>
  <container
    :x="screen.width / 2"
    :y="screen.height / 2"
    :scale="containerScale"
  >
    <graphics
      :x="-100"
      :y="-50"
      @effect="onGrid"
    />
    <graphics
      :y="-50"
      @effect="onGridPixel"
    />
  </container>
  <text
    :x="20"
    :y="20"
    :style="{ fill: 0xFFFFFF }"
    :width="screen.width - 40"
  >
    Grid Comparison: Standard Lines (Left) vs Pixel-Perfect Lines (Right)
  </text>
</template>
