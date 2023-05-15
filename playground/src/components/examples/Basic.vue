<script lang="ts" setup>
import { Graphics } from 'pixi.js'

function drawRectangle(e: Graphics) {
  e.lineStyle(2, '#674196', 1)
  e.beginFill('#00a3af')
  e.drawRect(0, 0, 164, 164)
}
function drawCircle(e: Graphics) {
  e.beginFill('#f3bf88', 0.9)
  e.drawCircle(0, 0, 32)
}
</script>

<template>
  <Graphics :x="200" :y="60" :rotation="0.5" :pivot="0" @draw="drawRectangle" />
  <Graphics :x="200" :y="60" @draw="drawCircle" />
</template>

