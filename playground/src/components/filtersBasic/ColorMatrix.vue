<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import type { ColorMatrixFilterInst } from 'vue3-pixi'
import { onMountedTicker, onReady, useScreen } from 'vue3-pixi'

const screen = useScreen()

const filterRef = ref<ColorMatrixFilterInst>()
const rotation = ref(0)
const pandaScale = reactive({ x: 1, y: 1 })
const showFilter = ref(true)

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
  anchor: 0.5,
}))

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

let count = 0

onMountedTicker(() => {
  count += 0.1
  pandaScale.x = 1 + Math.sin(count) * 0.04
  pandaScale.y = 1 + Math.cos(count) * 0.04
  rotation.value += 0.01

  if (!filterRef.value)
    return
  const { matrix } = filterRef.value
  matrix[1] = Math.sin(count) * 3
  matrix[2] = Math.cos(count)
  matrix[3] = Math.cos(count) * 1.5
  matrix[4] = Math.sin(count / 3) * 2
  matrix[5] = Math.sin(count / 2)
  matrix[6] = Math.sin(count / 4)
})
</script>

<template>
  <container @click="showFilter = !showFilter">
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/bg_scene_rotate.jpg" :rotation="rotation" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/light_rotate_1.png" :rotation="rotation * 2" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/light_rotate_2.png" :rotation="rotation" />
    <sprite v-bind="center" texture="https://beta.pixijs.com/assets/panda.png" :scale="pandaScale" />
  </container>
  <text
    :position="{ x: 10, y: screen.height - 26 }"
    :style="{ fontFamily: 'Arial', fontSize: 12, fontWeight: 'bold', fill: 'white' }"
  >
    Click or tap to turn filters on / off.
  </text>
  <!-- add to outermost stage -->
  <color-matrix-filter v-if="showFilter" ref="filterRef" />
</template>
