<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { gsap } from 'gsap'
import { DropShadowFilter } from 'pixi-filters'
import { onMounted, onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const boxes = ref<GraphicsElement[]>([])
const wrapper = ref()

const dropShadowFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.25,
  blur: 4,
  offset: { x: 0, y: 10 },
})

let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  if (boxes.value.length === 3 && wrapper.value) {
    const size = 75
    wrapper.value.x = screen.width / 2 - wrapper.value.width / 2 + size / 2
    wrapper.value.y = screen.height / 2 - wrapper.value.height / 2 + size / 2

    timeline = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1,
    })

    timeline
      .to(boxes.value[0], { duration: 2, angle: -360 })
      .to(boxes.value[1], { duration: 1, x: -100, ease: 'elastic.out' })
      .to(boxes.value[2], { duration: 2, angle: 360, x: 100, ease: 'expo.out' })
  }
})

onUnmounted(() => {
  if (timeline) {
    timeline.kill()
  }
})
</script>

<template>
  <container ref="wrapper">
    <graphics
      v-for="i in 3"
      :key="i"
      :ref="el => { if (el) boxes[i - 1] = el as GraphicsElement }"
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
