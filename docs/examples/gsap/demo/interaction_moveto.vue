<script lang="ts" setup>
import type { FederatedPointerEvent, Sprite as SpriteElement } from 'pixi.js'
import { useEventListener, whenever } from '@vueuse/core'
import { gsap } from 'gsap'
import { computed, ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const stage = useStage()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const logo = ref<SpriteElement>()
let xTo: gsap.QuickToFunc | null = null
let yTo: gsap.QuickToFunc | null = null

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

    const xTween = xTo = gsap.quickTo(sprite, 'x', { duration: 0.6, ease: 'power3' })
    const yTween = yTo = gsap.quickTo(sprite, 'y', { duration: 0.6, ease: 'power3' })
    sprite.once('destroyed', () => {
      xTween.tween.kill()
      yTween.tween.kill()
      if (xTo === xTween)
        xTo = yTo = null
    })
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
