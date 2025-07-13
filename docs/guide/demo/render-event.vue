<script lang="ts" setup>
import type { Graphics } from 'pixi.js'

function drawArc(graphics: Graphics) {
  graphics.arc(0, 0, 100, 0, Math.PI, false)
  graphics.fill('#4f455c')
}
</script>

<template>
  <graphics :x="120" :y="120" @render="drawArc" />
</template>
