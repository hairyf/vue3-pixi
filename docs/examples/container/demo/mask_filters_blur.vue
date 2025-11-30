<!-- eslint-disable ts/ban-ts-comment -->
<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { BlurFilter, Graphics, Rectangle, SCALE_MODES } from 'pixi.js'
import { computed, reactive, ref } from 'vue'
import { onReady, useApplication, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()
const stage = useStage()

const radius = 100
const blur = 32

const circleRef = ref()
const focusRef = ref()
const position = reactive({ x: 0, y: 0 })

const texture = computed(() => {
  const circle = new Graphics()
    .circle(radius + blur, radius + blur, radius)
    .fill({ color: 0xFF0000 })

  circle.filters = [new BlurFilter(blur)]

  const bounds = new Rectangle(0, 0, (radius + blur) * 2, (radius + blur) * 2)
  const texture = app.value?.renderer.generateTexture({
    target: circle,
    // @ts-expect-error
    style: { scaleMode: SCALE_MODES.LINEAR },
    resolution: 1,
    frame: bounds,
  })

  return texture
})

onReady((app) => {
  app.stage.eventMode = 'static'
  // Make sure stage covers the whole scene
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'pointermove', (e: any) => Object.assign(position, e.global))
</script>

<template>
  <assets alias="bg_grass" entry="https://pixijs.com/assets/bg_grass.jpg">
    <sprite
      ref="circleRef"
      texture="bg_grass"
      :width="screen.width"
      :height="screen.height"
      :mask="focusRef"
    />
  </assets>
  <sprite
    ref="focusRef"
    :texture="texture"
    :position="position"
    :anchor="0.5"
  />
</template>
