<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import type { FederatedPointerEvent } from 'pixi.js'
import { Point, Rectangle, Sprite } from 'pixi.js'

import { computed, reactive, ref } from 'vue'
import { onReady, onTick, useScreen, useStage } from 'vue3-pixi'

interface DudeIte {
  x: number
  y: number
  scale: { x: number; y: number }
  direction: number
  turningSpeed: number
  speed: number
  offset: number
  rotation: number
  original: Point
}

const padding = 100

const screen = useScreen()
const stage = useStage()

let count = 0
const spriteRef = ref()
const visible = ref(false)
const maggots = reactive<DudeIte[]>([])
const position = reactive({ x: 0, y: 0 })

const bounds = computed(() => new Rectangle(
  -padding, -padding,
  screen.value.width + padding * 2,
  screen.value.height + padding * 2,
))

for (let i = 0; i < 20; i++) {
  const scale = 0.8 + Math.random() * 0.3
  maggots.push({
    scale: { x: scale, y: scale },
    direction: Math.random() * Math.PI * 2,
    turningSpeed: Math.random() - 0.8,
    speed: (2 + Math.random() * 2) * 0.2,
    offset: Math.random() * 100,
    x: Math.random() * screen.value.width,
    y: Math.random() * screen.value.height,
    rotation: 0,
    original: new Point().copyFrom({ x: scale, y: scale }),
  })
}

function pointMove(event: FederatedPointerEvent) {
  visible.value = true
  Object.assign(position, event.global)
}

function creep() {
  for (const dude of maggots) {
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y)
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y)
    dude.rotation = -dude.direction + Math.PI

    dude.scale.y = 0.95 + Math.sin(count + dude.offset) * 0.05
    dude.scale.x = dude.original.x + Math.sin(count) * 0.2

    const dbs = bounds.value
    // wrap the dudes by testing their bounds...
    if (dude.x < dbs.x)
      dude.x += dbs.width
    else if (dude.x > dbs.x + dbs.width)
      dude.x -= dbs.width
    if (dude.y < dbs.y)
      dude.y += dbs.height
    else if (dude.y > dbs.y + dbs.height)
      dude.y -= dbs.height
  }
  count += 0.05
}

useEventListener(stage, 'mousemove', pointMove)
useEventListener(stage, 'touchmove', pointMove)

onReady((app) => {
  // Enable interactivity!
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

onTick(creep)
</script>

<template>
  <sprite
    texture="https://beta.pixijs.com/assets/bg_grass.jpg"
    :width="screen.width"
    :height="screen.height"
    :alpha="0.4"
  />
  <sprite
    ref="spriteRef"
    texture="https://beta.pixijs.com/assets/pixi-filters/displace.png"
    :position="position"
    :anchor="0.5"
  />
  <sprite
    texture="https://beta.pixijs.com/assets/pixi-filters/ring.png"
    :visible="visible"
    :position="position"
    :anchor="0.5"
  />
  <sprite
    v-for="(dude, index) in maggots" :key="index"
    texture="https://beta.pixijs.com/assets/maggot_tiny.png"
    :scale="dude.scale"
    :rotation="dude.rotation"
    :x="dude.x"
    :y="dude.y"
    :anchor="0.5"
  />
  <displacement-filter v-if="spriteRef" :sprite="spriteRef" :scale="110" />
</template>

<style lang="scss" scoped></style>
