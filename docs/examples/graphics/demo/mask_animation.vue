<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import { onReady, onTick, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const stage = useStage()
const maskRef = ref<GraphicsElement>()
const isMasked = ref(true)
let count = 0

const bgRotation = ref(0)
const bgFrontRotation = ref(0)
const light1Rotation = ref(0)
const light2Rotation = ref(0)
const pandaScale = ref({ x: 1, y: 1 })

function onMask(graphics: GraphicsElement) {
  graphics.clear()
  graphics.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
  graphics.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20)
  graphics.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20)
  graphics.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20)
  graphics.fill({ color: 0x8BC5FF, alpha: 0.4 })
  graphics.rotation = count * 0.1
}

function toggleMask() {
  isMasked.value = !isMasked.value
}

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'pointertap', toggleMask)

onTick(() => {
  bgRotation.value += 0.01
  bgFrontRotation.value -= 0.01
  light1Rotation.value += 0.02
  light2Rotation.value += 0.01
  pandaScale.value.x = 1 + Math.sin(count) * 0.04
  pandaScale.value.y = 1 + Math.cos(count) * 0.04
  count += 0.1
})
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg_rotate', src: 'https://pixijs.com/assets/bg_rotate.jpg' },
      { alias: 'bg_scene_rotate', src: 'https://pixijs.com/assets/bg_scene_rotate.jpg' },
      { alias: 'light_rotate_2', src: 'https://pixijs.com/assets/light_rotate_2.png' },
      { alias: 'light_rotate_1', src: 'https://pixijs.com/assets/light_rotate_1.png' },
      { alias: 'panda', src: 'https://pixijs.com/assets/panda.png' },
    ]"
  >
    <sprite
      texture="bg_rotate"
      :anchor="0.5"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :rotation="bgRotation"
    />
    <container
      :x="screen.width / 2"
      :y="screen.height / 2"
      :mask="isMasked ? maskRef : null"
    >
      <sprite texture="bg_scene_rotate" :anchor="0.5" :rotation="bgFrontRotation" />
      <sprite texture="light_rotate_2" :anchor="0.5" :rotation="light2Rotation" />
      <sprite texture="light_rotate_1" :anchor="0.5" :rotation="light1Rotation" />
      <sprite texture="panda" :anchor="0.5" :scale="pandaScale" />
    </container>
    <graphics ref="maskRef" :x="screen.width / 2" :y="screen.height / 2" @effect="onMask" />
    <text
      :x="10"
      :y="screen.height - 26"
      :style="{
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: 'bold',
        fill: 'white',
      }"
    >
      Click or tap to turn masking on / off.
    </text>
  </assets>
</template>
