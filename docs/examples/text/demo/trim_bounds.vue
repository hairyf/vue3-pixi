<script lang="ts" setup>
import { Graphics } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const textRef = ref()
const text2Ref = ref()
const boundsReady = ref(false)

const rect1 = { x: 0, y: 0, width: 0, height: 0 }
const rect2 = { x: 0, y: 0, width: 0, height: 0 }

// We need to wait a tick after mount for the text to be measured
let rafId: number
onBeforeUnmount(() => cancelAnimationFrame(rafId))
onMounted(() => {
  rafId = requestAnimationFrame(() => {
    if (textRef.value && text2Ref.value) {
      const tb = textRef.value.getBounds()
      rect1.x = tb.x
      rect1.y = tb.y
      rect1.width = tb.width
      rect1.height = tb.height

      const tb2 = text2Ref.value.getBounds()
      rect2.x = tb2.x
      rect2.y = tb2.y
      rect2.width = tb2.width
      rect2.height = tb2.height

      boundsReady.value = true
    }
  })
})

function drawRect1(g: Graphics) {
  g.rect(rect1.x, rect1.y, rect1.width, rect1.height)
  g.stroke({ width: 2, color: '#FFD600' })
}

function drawRect2(g: Graphics) {
  g.rect(rect2.x, rect2.y, rect2.width, rect2.height)
  g.stroke({ width: 2, color: '#FFD600' })
}
</script>

<template>
  <text
    ref="textRef"
    :anchor="0.5"
    :position="{ x: screen.width / 2, y: screen.height / 2 - 50 }"
    :style="{
      fontFamily: 'Arial',
      fontSize: 60,
      fill: 'white',
    }"
  >
    UNTRIMMED TEXT
  </text>
  <text
    ref="text2Ref"
    :anchor="0.5"
    :position="{ x: screen.width / 2, y: screen.height / 2 + 80 }"
    :style="{
      fontFamily: 'Arial',
      fontSize: 60,
      fill: 'white',
      trim: true,
    }"
  >
    TRIMMED TEXT
  </text>
  <Graphics v-if="boundsReady" @effect="drawRect1" />
  <Graphics v-if="boundsReady" @effect="drawRect2" />
</template>
