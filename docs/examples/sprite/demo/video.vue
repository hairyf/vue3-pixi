<script lang="ts" setup>
import type { Graphics } from 'pixi.js'
import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const play = ref(false)

function drawButton(e: Graphics) {
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
  <assets entry="https://pixijs.com/assets/video.mp4" #="{data}">
    <sprite
      v-if="play"
      :texture="data"
      :width="screen.width"
      :height="screen.height"
    />
  </assets>
  <graphics
    v-if="!play"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :pivot="50"
    @effect="drawButton"
    @click="onPlay"
  />
</template>
