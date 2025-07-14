<script lang="ts" setup>
import type { Graphics } from 'pixi.js'

function drawRectangle(e: Graphics) {
  e.rect(0, 0, 60, 60)
  e.fill('#00a3af')
}
</script>

<template>
  <graphics :x="120" :y="60" :rotation="0.5" :pivot="0" @render="drawRectangle">
    <blur-filter :strength="2" :blur="4" />
  </graphics>
</template>
