<script lang="ts" setup>
import type { Graphics } from 'pixi.js'
import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const play = ref(false)

function drawButton(e: Graphics) {
  e.roundRect(0, 0, 100, 100, 10)
  e.fill({ color: 0x0, alpha: 0.5 })

  e.moveTo(36, 30)
  e.lineTo(36, 70)
  e.lineTo(70, 50)
  e.fill({ color: 0xFFFFFF })
}
</script>

<template>
  <assets alias="video" entry="https://pixijs.com/assets/video.mp4">
    <sprite
      v-if="play"
      texture="video"
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
    @click="play = true"
  />
</template>
