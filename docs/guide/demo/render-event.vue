<script lang="ts" setup>
import type { GraphicsInst } from 'vue3-pixi'

function drawArc(e: GraphicsInst) {
  e.beginFill('#4f455c')
  e.arc(0, 0, 100, 0, Math.PI, false)
}
</script>

<template>
  <graphics :x="120" :y="120" @render="drawArc" />
</template>

