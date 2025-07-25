<script lang="ts" setup>
import type { BLEND_MODES } from 'pixi.js'
import { Rectangle } from 'pixi.js'
import { computed, reactive } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

interface DudeIte {
  scale: number
  x: number
  y: number
  blendMode: BLEND_MODES
  direction: number
  turningSpeed: number
  speed: number
  rotation: number
}

const screen = useScreen()
const totalDues = 20

const dudes: Required<DudeIte>[] = reactive([])

for (let i = 0; i < totalDues; i++) {
  dudes.push({
    // set a random scale for the dude
    scale: 0.8 + Math.random() * 0.3,
    // finally let's set the dude to be at a random position...
    x: Math.random() * screen.value.width,
    y: Math.random() * screen.value.height,
    // The important bit of this example, this is how you change the default blend mode of the sprite
    blendMode: 'add',
    // create some extra properties that will control movement
    direction: Math.random() * Math.PI * 2,
    // this number will be used to modify the direction of the dude over time
    turningSpeed: Math.random() - 0.8,
    // create a random speed for the dude between 0 - 2
    speed: 2 + Math.random() * 2,
    rotation: 0,
  })
}

const dudeBoundsPadding = 100

// create a bounding box for the little dudes
const dudeBounds = computed(() => {
  return new Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    screen.value.width + dudeBoundsPadding * 2,
    screen.value.height + dudeBoundsPadding * 2,
  )
})

onTick(() => {
  // iterate through the dudes and update their position
  for (const dude of dudes) {
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * dude.speed
    dude.y += Math.cos(dude.direction) * dude.speed
    dude.rotation = -dude.direction - Math.PI / 2
    // wrap the dudes by testing their bounds...
    if (dude.x < dudeBounds.value.x)
      dude.x += dudeBounds.value.width
    else if (dude.x > dudeBounds.value.x + dudeBounds.value.width)
      dude.x -= dudeBounds.value.width
    if (dude.y < dudeBounds.value.y)
      dude.y += dudeBounds.value.height
    else if (dude.y > dudeBounds.value.y + dudeBounds.value.height)
      dude.y -= dudeBounds.value.height
  }
})
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg_rotate', src: 'https://pixijs.com/assets/bg_rotate.jpg' },
      { alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' },
    ]"
  >
    <!-- create a new background sprite -->
    <sprite
      texture="bg_rotate"
      :width="screen.width"
      :height="screen.height"
    />
    <sprite
      v-for="(dude, index) in dudes" :key="index"
      texture="flowerTop"
      :scale="dude.scale"
      :x="dude.x"
      :y="dude.y"
      :blend-mode="dude.blendMode"
      :anchor="0.5"
    />
  </assets>
</template>
