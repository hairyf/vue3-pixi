<script lang="ts" setup>
import { Graphics } from 'pixi.js'

function drawRectangle(e: Graphics) {
  e.beginFill('#00a3af')
  e.drawRect(0, 0, 60, 60)
}
</script>

<template>
  <graphics :x="120" :y="60" :rotation="0.5" :pivot="0" @render="drawRectangle">
    <blur-filter :strength="2" :blur="4" />
  </graphics>
</template>

