<script lang="ts" setup>
import type { Sprite } from 'pixi.js'
import { computed, reactive, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const maskRef = ref<Sprite>()
const position = reactive({ x: 310, y: 190 })
const target = reactive({ x: 0, y: 0 })

const full = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
  width: screen.value.width,
  height: screen.value.height,
  anchor: 0.5,
}))

function reset() {
  target.x = Math.floor(Math.random() * screen.value.width)
  target.y = Math.floor(Math.random() * screen.value.height)
}

onTick(() => {
  position.x += (target.x - position.x) * 0.15
  position.y += (target.y - position.y) * 0.15
  if (Math.abs(position.x - target.x) < 1)
    reset()
})

reset()
</script>

<template>
  <sprite texture="https://pixijs.com/assets/bg_plane.jpg" v-bind="full" />
  <sprite texture="https://pixijs.com/assets/cells.png" v-bind="full" :mask="maskRef" />
  <sprite ref="maskRef" texture="https://pixijs.com/assets/flowerTop.png" :position="position" :anchor="0.5" />
</template>
