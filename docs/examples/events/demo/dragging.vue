<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import type { FederatedPointerEvent } from 'pixi.js'
import { Container, SCALE_MODES, Sprite, Texture } from 'pixi.js'
import { ref } from 'vue'
import type { SpriteInst, SpriteProps } from 'vue3-pixi'
import { onReady, useStage } from 'vue3-pixi'

const stage = useStage()

// create a texture from an image path
const texture = Texture.from('https://pixijs.com/assets/bunny.png')

// Scale mode for pixelation
texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

const sprites = ref<Partial<SpriteProps>[]>([])
const target = ref<SpriteInst>()

function onDragStart(this: SpriteInst) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  // this.data = event.data;
  this.alpha = 0.5
  target.value = this
  stage.value.on('pointermove', onDragMove)
}

function onDragMove(event: FederatedPointerEvent) {
  if (target.value)
    Object.assign(sprites.value[target.value!.index], event.global)
}
function onDragEnd() {
  if (!target.value)
    return
  stage.value.off('pointermove', onDragMove)
  target.value.alpha = 1
  target.value = undefined
}

onReady((app) => {
  sprites.value = Array(10).fill(undefined).map(() => ({
    x: Math.floor(Math.random() * app.screen.width),
    y: Math.floor(Math.random() * app.screen.height),
    onPointerdown: onDragStart,
    texture,
    scale: 3,
    anchor: 0.5,
  }))
  // Enable interactivity!
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'pointerup', onDragEnd)
useEventListener(stage, 'pointerupoutside', onDragEnd)
</script>

<template>
  <container>
    <sprite v-for="(p, i) in sprites" :key="i" :index="i" v-bind="p" />
  </container>
</template>

