<script lang="ts" setup>
import type { FederatedPointerEvent, Sprite as SpriteElement, Texture } from 'pixi.js'

import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

const stage = useStage()
const screen = useScreen()

const sprites = ref<Partial<any>[]>([])
const target = ref<SpriteElement>()

function onDragStart(this: SpriteElement) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  // this.data = event.data;
  this.alpha = 0.5
  target.value = this
  stage.value.on('pointermove', onDragMove)
}

function onDragMove(event: FederatedPointerEvent) {
  if (target.value) {
    // Directly update the sprite's position
    target.value.x = event.global.x
    target.value.y = event.global.y
  }
}

function onDragEnd() {
  if (!target.value)
    return
  stage.value.off('pointermove', onDragMove)
  target.value.alpha = 1
  target.value = undefined
}

function onLoaded(texture: Texture) {
  texture.source.scaleMode = 'nearest'

  sprites.value = Array.from({ length: 10 }).fill(undefined).map(() => ({
    x: Math.floor(Math.random() * screen.value.width),
    y: Math.floor(Math.random() * screen.value.height),
    onPointerdown: onDragStart,
    texture,
    scale: 3,
    anchor: 0.5,
  }))
}

onReady((app) => {
  // Enable interactivity!
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'pointerup', onDragEnd)
useEventListener(stage, 'pointerupoutside', onDragEnd)
</script>

<template>
  <assets entry="https://pixijs.com/assets/bunny.png" @loaded="onLoaded">
    <sprite
      v-for="(p, i) in sprites"
      :key="i"
      :index="i"
      v-bind="p"
      @pointerdown="onDragStart"
    />
  </assets>
</template>
