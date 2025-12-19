<script lang="ts" setup>
import type { Graphics as GraphicsElement, Texture } from 'pixi.js'
import { ref } from 'vue'

const texture = ref<Texture>()

function onRealPath(graphics: GraphicsElement) {
  graphics.clear()
  graphics.moveTo(0, 0)
  graphics.lineTo(100, 200)
  graphics.lineTo(200, 200)
  graphics.lineTo(240, 100)
  graphics.stroke({ width: 2, color: 0xFFFFFF })
}

function onBezier(graphics: GraphicsElement) {
  graphics.clear()
  graphics.bezierCurveTo(100, 200, 200, 200, 240, 100)
  graphics.stroke({ width: 5, color: 0xAA0000 })
}

function onRealPath2(graphics: GraphicsElement) {
  graphics.clear()
  graphics.moveTo(0, 0)
  graphics.lineTo(0, -100)
  graphics.lineTo(150, 150)
  graphics.lineTo(240, 100)
  graphics.stroke({ width: 2, color: 0xFFFFFF })
}

function onBezier2(graphics: GraphicsElement) {
  if (!texture.value)
    return
  graphics.clear()
  graphics.bezierCurveTo(0, -100, 150, 150, 240, 100)
  graphics.stroke({ width: 10, texture: texture.value })
}

function onArc(graphics: GraphicsElement) {
  graphics.clear()
  graphics.arc(600, 100, 50, Math.PI, 2 * Math.PI)
  graphics.stroke({ width: 5, color: 0xAA00BB })
}

function onArc2(graphics: GraphicsElement) {
  graphics.clear()
  graphics.arc(650, 270, 60, 2 * Math.PI, (3 * Math.PI) / 2)
  graphics.stroke({ width: 6, color: 0x3333DD })
}

function onArc3(graphics: GraphicsElement) {
  if (!texture.value)
    return
  graphics.clear()
  graphics.arc(650, 420, 60, 2 * Math.PI, (2.5 * Math.PI) / 2)
  graphics.stroke({ width: 20, texture: texture.value })
}

function onRectAndHole(graphics: GraphicsElement) {
  graphics.clear()
  graphics.rect(350, 350, 150, 150)
  graphics.fill(0x00FF00)
  graphics.circle(375, 375, 25)
  graphics.circle(425, 425, 25)
  graphics.circle(475, 475, 25)
  graphics.cut()
}

function onBeautifulRect(graphics: GraphicsElement) {
  if (!texture.value)
    return
  graphics.clear()
  graphics.rect(80, 350, 150, 150)
  graphics.fill(0xFF0000)
  graphics.stroke({ width: 20, texture: texture.value })
}
</script>

<template>
  <assets
    entry="https://pixijs.com/assets/bg_rotate.jpg"
    @loaded="(tex) => texture = tex"
  >
    <!-- BEZIER CURVE -->
    <graphics
      :x="50"
      :y="50"
      @effect="onRealPath"
    />
    <graphics
      :x="50"
      :y="50"
      @effect="onBezier"
    />

    <!-- BEZIER CURVE 2 -->
    <graphics
      :x="320"
      :y="150"
      @effect="onRealPath2"
    />
    <graphics
      :x="320"
      :y="150"
      @effect="onBezier2"
    />

    <!-- ARC -->
    <graphics @effect="onArc" />

    <!-- ARC 2 -->
    <graphics @effect="onArc2" />

    <!-- ARC 3 -->
    <graphics @effect="onArc3" />

    <!-- Hole -->
    <graphics @effect="onRectAndHole" />

    <!-- Line Texture Style -->
    <graphics @effect="onBeautifulRect" />
  </assets>
</template>
