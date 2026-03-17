<script lang="ts" setup>
import type { Graphics as PixiGraphics } from 'pixi.js'
import { Point } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const ropeLength = 45
const points: Point[] = []

for (let i = 0; i < 25; i++) {
  points.push(new Point(i * ropeLength, 0))
}

let count = 0
const graphicsRef = ref<PixiGraphics>()

function renderPoints(g: PixiGraphics) {
  g.clear()
  g.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length; i++) {
    g.lineTo(points[i].x, points[i].y)
    g.stroke({ width: 2, color: 0xFFC2C2 })
  }

  for (let i = 1; i < points.length; i++) {
    g.circle(points[i].x, points[i].y, 10)
    g.fill({ color: 0xFF0022 })
    g.stroke({ width: 2, color: 0xFFC2C2 })
  }
}

onTick(() => {
  count += 0.1

  for (let i = 0; i < points.length; i++) {
    points[i].y = Math.sin(i * 0.5 + count) * 30
    points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20
  }

  if (graphicsRef.value) {
    renderPoints(graphicsRef.value)
  }
})
</script>

<template>
  <assets
    alias="snake"
    entry="https://pixijs.com/assets/snake.png"
  >
    <mesh-rope
      texture="snake"
      :points="points"
      :x="-40"
      :y="300"
    />
    <graphics
      ref="graphicsRef"
      :x="-40"
      :y="300"
    />
  </assets>
</template>
