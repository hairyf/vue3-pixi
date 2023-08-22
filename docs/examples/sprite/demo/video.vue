<script lang="ts" setup>
import type { GraphicsInst } from 'vue3-pixi'
import { useScreen } from 'vue3-pixi'
import { ref } from 'vue'

const screen = useScreen()

const play = ref(false)

function drawButton(e: GraphicsInst) {
  e.beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()

  e.beginFill(0xFFFFFF)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50)
}

function onPlay() {
  play.value = true
}
</script>

<template>
  <sprite
    v-if="play"
    texture="https://pixijs.com/assets/video.mp4"
    :width="screen.width"
    :height="screen.height"
  />
  <graphics
    v-if="!play"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :pivot="50"
    @render="drawButton"
    @click="onPlay"
  />
</template>

