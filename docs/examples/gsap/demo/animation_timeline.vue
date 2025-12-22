<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { gsap } from 'gsap'
import { DropShadowFilter } from 'pixi-filters'
import {  onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'
import { whenever } from '@vueuse/core'

const screen = useScreen()

const size = 75
const boxes = ref<GraphicsElement[]>()

const dropShadowFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.25,
  blur: 4,
  offset: { x: 0, y: 10 },
})

let timeline: gsap.core.Timeline | null = null


function initial(boxes: GraphicsElement[]) {
  timeline = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1,
    })

    timeline
      .to(boxes[0], { duration: 2, angle: -360 })
      .to(boxes[1], { duration: 1, x: -100, ease: 'elastic.out' })
      .to(boxes[2], { duration: 2, angle: 360, x: 100, ease: 'expo.out' })
}

whenever(boxes, initial)
onUnmounted(() => timeline?.kill())
</script>

<template>
  <container 
    @effect="container => {
      container.x = screen.width / 2 - container.width / 2 + size / 2
      container.y = screen.height / 2 - container.height / 2 + size / 2
    }"
  >
    <graphics
      v-for="i in 3"
      :key="i"
      ref="boxes"
      :y="(i - 1) * 120"
      @effect="graphics => {
        const size = 75
        graphics
          .roundRect(-size / 2, -size / 2, size, size, 8)
          .fill(0xED427C)
          .stroke({ color: 'white', width: 4 })
        graphics.filters = [dropShadowFilter]
      }"
    />
  </container>
</template>
