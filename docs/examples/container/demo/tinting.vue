<script lang="ts" setup>
import type { Sprite } from 'pixi.js'
import { Rectangle } from 'pixi.js'
import { computed } from 'vue'

import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const dudeBoundsPadding = 100
const dudeBounds = computed(() => new Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  screen.value.width + dudeBoundsPadding * 2,
  screen.value.height + dudeBoundsPadding * 2,
))

function onRender(dude: Sprite & Record<string, any>) {
  dude.direction += dude.turningSpeed * 0.01
  dude.x += Math.sin(dude.direction) * dude.speed
  dude.y += Math.cos(dude.direction) * dude.speed
  dude.rotation = -dude.direction - Math.PI / 2
  if (dude.x < dudeBounds.value.x) {
    dude.x += dudeBounds.value.width
  }
  else if (dude.x > dudeBounds.value.x + dudeBounds.value.width) {
    dude.x -= dudeBounds.value.width
  }
  if (dude.y < dudeBounds.value.y) {
    dude.y += dudeBounds.value.height
  }
  else if (dude.y > dudeBounds.value.y + dudeBounds.value.height) {
    dude.y -= dudeBounds.value.height
  }
}
</script>

<template>
  <assets alias="eggHead" entry="https://pixijs.com/assets/eggHead.png">
    <sprite
      v-for="i in 20"
      :key="i"
      :anchor="0.5"
      :scale="0.8 + Math.random() * 0.3"
      :x="Math.random() * screen.width"
      :y="Math.random() * screen.height"
      :tint="Math.random() * 0xFFFFFF"
      :direction="Math.random() * 2 * Math.PI"
      :turning-speed="Math.random() - 0.8"
      :speed="2 + Math.random() * 2"
      texture="eggHead"
      @render="onRender"
    />
  </assets>
</template>
