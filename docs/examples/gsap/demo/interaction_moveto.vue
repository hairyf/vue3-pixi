<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { FederatedPointerEvent, Sprite as SpriteElement } from 'pixi.js'
import { onReady, useScreen, useStage } from 'vue3-pixi'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import { whenever } from '@vueuse/core'

const screen = useScreen()
const stage = useStage()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const logo = ref<SpriteElement>()
let xTo: ((value: number) => void) | null = null
let yTo: ((value: number) => void) | null = null

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

whenever(logo, (sprite) => {
  if (sprite) {
    sprite.width = 100
    sprite.scale.y = sprite.scale.x
    sprite.eventMode = 'static'
    sprite.anchor.set(0.5)
    
    xTo = gsap.quickTo(sprite, 'x', { duration: 0.6, ease: 'power3' })
    yTo = gsap.quickTo(sprite, 'y', { duration: 0.6, ease: 'power3' })
  }
})

useEventListener(stage, 'globalpointermove', (e: FederatedPointerEvent) => {
  if (xTo && yTo) {
    xTo(e.global.x)
    yTo(e.global.y)
  }
})
</script>

<template>
  <assets 
    alias="bunny" 
    entry="https://pixijs.com/assets/bunny.png"
    @loaded="(texture) => texture.source.scaleMode = 'nearest'"
  >
    <sprite
      ref="logo"
      texture="bunny"
      :position="center"
    />
  </assets>
</template>
