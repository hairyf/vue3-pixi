<script lang="ts" setup>
import type { GraphicsInst } from 'vue3-pixi'
import { useScreen } from 'vue3-pixi'
import type { Sprite as SpriteInst } from 'pixi.js'
import { ref } from 'vue'

const screen = useScreen()
const arcRef = ref<GraphicsInst>()
const spriteRef = ref<SpriteInst>()

function drawArc(e: GraphicsInst) {
  e.beginFill('#fff')
  e.arc(0, 0, 100, 0, Math.PI * 2, false)
}
</script>

<template>
  <graphics ref="arcRef" :x="600" :y="300" @render="drawArc" />
  <sprite :mask="arcRef" :width="screen.width" :height="screen.height" texture="/bg.jpg" />

  <sprite ref="spriteRef" texture="https://pixijs.io/examples/examples/assets/bunny.png" :scale="10" :position="20" />
  <sprite :mask="spriteRef" :width="screen.width" :height="screen.height" texture="/bg.jpg" />
</template>
