<script lang="ts" setup>
import type { Graphics } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const graphicsRef = ref<Graphics>()
const thingRef = ref<Graphics>()

function onDraw(graphics: Graphics) {
// set a fill and line style
  graphics.beginFill(0xFF3300)
  graphics.lineStyle(10, 0xFFD900, 1)

  // draw a shape
  graphics.moveTo(50, 50)
  graphics.lineTo(250, 50)
  graphics.lineTo(100, 100)
  graphics.lineTo(250, 220)
  graphics.lineTo(50, 220)
  graphics.lineTo(50, 50)
  graphics.closePath()
  graphics.endFill()

  // set a fill and line style again
  graphics.lineStyle(10, 0xFF0000, 0.8)
  graphics.beginFill(0xFF700B, 1)

  // draw a second shape
  graphics.moveTo(210, 300)
  graphics.lineTo(450, 320)
  graphics.lineTo(570, 350)
  graphics.quadraticCurveTo(600, 0, 480, 100)
  graphics.lineTo(330, 120)
  graphics.lineTo(410, 200)
  graphics.lineTo(210, 300)
  graphics.closePath()
  graphics.endFill()

  // draw a rectangle
  graphics.lineStyle(2, 0x0000FF, 1)
  graphics.drawRect(50, 250, 100, 100)

  // draw a circle
  graphics.lineStyle(0)
  graphics.beginFill(0xFFFF0B, 0.5)
  graphics.drawCircle(470, 200, 100)
  graphics.endFill()

  graphics.lineStyle(20, 0x33FF00)
  graphics.moveTo(30, 30)
  graphics.lineTo(600, 300)
}

let count = 0

function onDrawThing(thing: Graphics) {
  count += 0.1

  thing.clear()
  thing.lineStyle(10, 0xFF0000, 1)
  thing.beginFill(0xFFFF00, 0.5)

  thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
  thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20)
  thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20)
  thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20)
  thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
  thing.closePath()

  thing.rotation = count * 0.1
}

function onClick() {
  if (!graphicsRef.value)
    return
  const graphics = graphicsRef.value
  graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1)
  graphics.moveTo(Math.random() * 800, Math.random() * 600)
  graphics.bezierCurveTo(
    Math.random() * 800,
    Math.random() * 600,
    Math.random() * 800,
    Math.random() * 600,
    Math.random() * 800,
    Math.random() * 600,
  )
}

useEventListener('pointerdown', onClick)

onTick(() => thingRef.value && onDrawThing(thingRef.value))
</script>

<template>
  <Graphics ref="graphicsRef" @effect="onDraw" />
  <Graphics ref="thingRef" :x="400" :y="300" @effect="onDrawThing" />
</template>
