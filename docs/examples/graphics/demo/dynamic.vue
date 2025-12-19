<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { ref } from 'vue'
import { onReady, onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
let count = 0

function onStaticGraphics(graphics: GraphicsElement) {
  // Draw a shape
  graphics
    .moveTo(50, 50)
    .lineTo(250, 50)
    .lineTo(100, 100)
    .lineTo(250, 220)
    .lineTo(50, 220)
    .lineTo(50, 50)
    .fill({ color: 0xFF3300 })
    .stroke({ width: 10, color: 0xFFD900 })

  // Draw a second shape
  graphics
    .moveTo(210, 300)
    .lineTo(450, 320)
    .lineTo(570, 350)
    .quadraticCurveTo(600, 0, 480, 100)
    .lineTo(330, 120)
    .lineTo(410, 200)
    .lineTo(210, 300)
    .fill({ color: 0xFF700B })
    .stroke({ width: 10, color: 0xFF0000, alpha: 0.8 })

  // Draw a rectangle
  graphics.rect(50, 250, 100, 100)
  graphics.stroke({ width: 2, color: 0x0000FF })

  // Draw a circle
  graphics.circle(470, 200, 100)
  graphics.fill({ color: 0xFFFF0B, alpha: 0.5 })

  graphics.moveTo(30, 30)
  graphics.lineTo(600, 300)
  graphics.stroke({ width: 20, color: 0x33FF00 })
}

const staticGraphicsRef = ref<GraphicsElement>()

function onStaticGraphicsEffect(graphics: GraphicsElement) {
  staticGraphicsRef.value = graphics
  onStaticGraphics(graphics)
}

function onDynamicGraphics(graphics: GraphicsElement) {
  graphics.clear()
  graphics
    .moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
    .lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20)
    .lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20)
    .lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20)
    .lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
    .fill({ color: 0xFFFF00, alpha: 0.5 })
    .stroke({ width: 10, color: 0xFF0000 })
  graphics.rotation = count * 0.1
}

function onPointerDown() {
  if (!staticGraphicsRef.value)
    return
  staticGraphicsRef.value.moveTo(Math.random() * screen.value.width, Math.random() * screen.value.height)
  staticGraphicsRef.value.bezierCurveTo(
    Math.random() * screen.value.width,
    Math.random() * screen.value.height,
    Math.random() * screen.value.width,
    Math.random() * screen.value.height,
    Math.random() * screen.value.width,
    Math.random() * screen.value.height,
  )
  staticGraphicsRef.value.stroke({
    width: Math.random() * 30,
    color: Math.random() * 0xFFFFFF,
  })
}

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

onTick(() => {
  count += 0.1
})
</script>

<template>
  <graphics
    ref="staticGraphicsRef"
    @effect="onStaticGraphicsEffect"
  />
  <graphics
    :x="screen.width / 2"
    :y="screen.height / 2"
    @effect="onDynamicGraphics"
  />
  <container
    event-mode="static"
    :hit-area="screen"
    @pointerdown="onPointerDown"
  />
</template>
