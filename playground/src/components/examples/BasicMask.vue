<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'
import type { Graphics as GraphicsIns, Sprite as SpriteInst } from 'pixi.js'
import { ref } from 'vue'

const screen = useScreen()
const arcRef = ref<GraphicsIns>()
const spriteRef = ref<SpriteInst>()

function drawArc(e: GraphicsIns) {
  e.beginFill('#fff')
  e.arc(0, 0, 100, 0, Math.PI * 2, false)
}
</script>

<template>
  <graphics ref="arcRef" :x="600" :y="300" @draw="drawArc" />
  <sprite :mask="arcRef" :width="screen.width" :height="screen.height" texture="/bg.jpg" />

  <sprite ref="spriteRef" texture="https://pixijs.io/examples/examples/assets/bunny.png" :scale="10" :position="20" />
  <sprite :mask="spriteRef" :width="screen.width" :height="screen.height" texture="/bg.jpg" />
</template>
