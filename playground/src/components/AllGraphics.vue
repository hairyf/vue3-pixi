<script lang="ts" setup>
import type { Graphics as GraphicsIns } from 'pixi.js'

function drawRounded(e: GraphicsIns) {
  e.beginFill('#00a3af')
  e.drawRoundedRect(0, 0, 164, 164, 10)
}
function drawEllipse(e: GraphicsIns) {
  e.beginFill('#f6bfbc')
  e.drawEllipse(0, 0, 60, 80)
}
function drawPolygon(e: GraphicsIns) {
  e.beginFill('#83ccd2', 0.9)
  e.drawPolygon([0, 0, 100, 0, 100, 100, 0, 100])
}
function drawArc(e: GraphicsIns) {
  e.beginFill('#4f455c')
  e.arc(0, 0, 100, 0, Math.PI, false)
}
function drawLine(e: GraphicsIns) {
  e.lineStyle(4, '#9e3d3f')
  e.moveTo(0, 0)
  e.lineTo(100, 0)
  e.lineTo(100, 100)
}
</script>

<template>
  <graphics :x="200" :y="60" @draw="drawRounded" />
  <graphics :x="280" :y="340" @draw="drawEllipse" />
  <graphics :x="400" :y="300" @draw="drawPolygon" />
  <graphics :x="600" :y="300" @draw="drawArc" />
  <graphics :x="600" :y="200" @draw="drawLine" />
</template>
