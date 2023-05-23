<script lang="ts" setup>
import type { ColorSource } from 'pixi.js'
import { Rectangle, Sprite } from 'pixi.js'
import { reactive } from 'vue'
import { onMountedTicker, useScreen } from 'vue3-pixi'

interface DudeIte {
  x: number
  y: number
  tint: ColorSource
  scale: { x: number; y: number }
  direction: number
  turningSpeed: number
  speed: number
  offset: number
  rotation: number
}

const screen = useScreen()
// create an array to store all the sprites
const maggots: DudeIte[] = reactive([])

for (let index = 0; index < 5000; index++) {
  const scale = 0.8 + Math.random() * 0.3
  // finally we push the dude into the maggots array so it it can be easily accessed later
  maggots.push({
    // different maggots, different sizes
    scale: { x: scale, y: scale },
    tint: Math.random() * 0x808080,
    // create a random direction in radians
    direction: Math.random() * Math.PI * 2,
    // this number will be used to modify the direction of the sprite over time
    turningSpeed: Math.random() - 0.8,
    // create a random speed between 0 - 2, and these maggots are slooww
    speed: (2 + Math.random() * 2) * 0.2,
    offset: Math.random() * 100,
    x: Math.random() * screen.value.width,
    y: Math.random() * screen.value.height,
    rotation: 0,
  })
}

// create a bounding box for the little dudes

const dudeBoundsPadding = 100
const dudeBounds = new Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  screen.value.width + dudeBoundsPadding * 2,
  screen.value.height + dudeBoundsPadding * 2,
)

let count = 0
onMountedTicker(() => {
  for (const dude of maggots) {
    dude.scale.y = 0.95 + Math.sin(count + dude.offset) * 0.05
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y)
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y)
    dude.rotation = -dude.direction + Math.PI
    // wrap the dudes by testing their bounds...
    if (dude.x < dudeBounds.x)
      dude.x += dudeBounds.width
    else if (dude.x > dudeBounds.x + dudeBounds.width)
      dude.x -= dudeBounds.width
    if (dude.y < dudeBounds.y)
      dude.y += dudeBounds.height
    else if (dude.y > dudeBounds.y + dudeBounds.height)
      dude.y -= dudeBounds.height
  }
  count += 0.1
})
</script>

<template>
  <particle-container
    :max-size="10000"
    :properties="{
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    }"
  >
    <sprite
      v-for="(dude, index) in maggots" :key="index"
      texture="https://beta.pixijs.com/assets/maggot_tiny.png"
      :scale="dude.scale"
      :tint="dude.tint"
      :rotation="dude.rotation"
      :x="dude.x"
      :y="dude.y"
      :anchor="0.5"
    />
  </particle-container>
</template>

