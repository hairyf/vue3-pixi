<script lang="ts" setup>
import { Point } from 'pixi.js'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const ropeLength = 918 / 20
const points: Point[] = []

for (let i = 0; i < 20; i++) {
  points.push(new Point(i * ropeLength, 0))
}

let count = 0

onTick(() => {
  count += 0.1

  for (let i = 0; i < points.length; i++) {
    points[i].y = Math.sin(i * 0.5 + count) * 30
    points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20
  }
})
</script>

<template>
  <assets
    alias="snake"
    entry="https://pixijs.com/assets/snake.png"
  >
    <container :x="400" :y="300" :scale="{ x: 800 / 1100, y: 800 / 1100 }">
      <mesh-rope
        texture="snake"
        :points="points"
        :x="-459"
      />
    </container>
  </assets>
</template>
