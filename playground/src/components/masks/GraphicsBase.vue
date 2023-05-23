<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { onReady, onMountedTicker, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const stage = useStage()
const maskRef = ref()

const rotation = ref(0)
const isMask = ref(false)
const pandaScale = reactive({ x: 1, y: 1 })
const count = ref(0)

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
  anchor: 0.5,
}))

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

// @ts-expect-error
useEventListener(stage, 'click', () => isMask.value = !isMask.value)

onMountedTicker(() => {
  count.value += 0.1
  pandaScale.x = 1 + Math.sin(count.value) * 0.04
  pandaScale.y = 1 + Math.cos(count.value) * 0.04
  rotation.value += 0.01
})
</script>

<template>
  <sprite v-bind="center" texture="https://beta.pixijs.com/assets/bg_rotate.jpg" :rotation="+rotation" />
  <container :mask="isMask ? maskRef : null">
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/bg_scene_rotate.jpg" :rotation="rotation" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/light_rotate_1.png" :rotation="rotation * 2" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/light_rotate_2.png" :rotation="rotation" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/panda.png" :scale="pandaScale" />
  </container>
  <text
    :position="{ x: 10, y: screen.height - 26 }"
    :style="{ fontFamily: 'Arial', fontSize: 12, fontWeight: 'bold', fill: 'white' }"
  >
    Click or tap to turn masking on / off.
  </text>
  <graphics
    v-bind="center"
    ref="maskRef"
    @draw="$event
      .lineStyle(0)
      .clear()
      .beginFill(0x8BC5FF, 0.4)
      .moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20)
      .lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20)
      .lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20)
      .lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20)
      .rotation = count * 0.1
    "
  />
</template>
