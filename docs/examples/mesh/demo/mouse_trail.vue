<script lang="ts" setup>
import { Point } from 'pixi.js'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const historyX: number[] = []
const historyY: number[] = []
const historySize = 20
const ropeSize = 100
const points: Point[] = []

for (let i = 0; i < historySize; i++) {
  historyX.push(0)
  historyY.push(0)
}

for (let i = 0; i < ropeSize; i++) {
  points.push(new Point(0, 0))
}

let mousePosition: { x: number, y: number } | null = null

function onMouseMove(e: any) {
  if (!mousePosition)
    mousePosition = { x: 0, y: 0 }
  mousePosition.x = e.global?.x ?? e.x
  mousePosition.y = e.global?.y ?? e.y
}

function clipInput(k: number, arr: number[]) {
  if (k < 0)
    k = 0
  if (k > arr.length - 1)
    k = arr.length - 1
  return arr[k]
}

function getTangent(k: number, factor: number, array: number[]) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2
}

function cubicInterpolation(array: number[], t: number, tangentFactor = 1) {
  const k = Math.floor(t)
  const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)]
  const p = [clipInput(k, array), clipInput(k + 1, array)]

  t -= k
  const t2 = t * t
  const t3 = t * t2

  return (
    (2 * t3 - 3 * t2 + 1) * p[0]
    + (t3 - 2 * t2 + t) * m[0]
    + (-2 * t3 + 3 * t2) * p[1]
    + (t3 - t2) * m[1]
  )
}

onTick(() => {
  if (!mousePosition)
    return

  historyX.pop()
  historyX.unshift(mousePosition.x)
  historyY.pop()
  historyY.unshift(mousePosition.y)

  for (let i = 0; i < ropeSize; i++) {
    const p = points[i]
    const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize)
    const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize)

    p.x = ix
    p.y = iy
  }
})
</script>

<template>
  <assets
    alias="trail"
    entry="https://pixijs.com/assets/trail.png"
  >
    <container
      event-mode="static"
      :hit-area="{ x: 0, y: 0, width: screen.width, height: screen.height, contains: () => true }"
      @mousemove="onMouseMove"
    >
      <mesh-rope
        texture="trail"
        :points="points"
        blend-mode="add"
      />
    </container>
  </assets>
</template>
