<script lang="ts" setup>
import { DEG_TO_RAD, type Graphics as GraphicsElement } from 'pixi.js'
import { gsap } from 'gsap'
import { DropShadowFilter } from 'pixi-filters'
import { onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'
import { whenever } from '@vueuse/core'

const screen = useScreen()

const boxes = ref<GraphicsElement[]>()

const size = 75

const dropShadowFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.25,
  blur: 4,
  offset: { x: 0, y: 10 },
})

let animation: gsap.core.Tween | null = null

function initial(boxes: GraphicsElement[]) {
  animation = gsap.to(boxes, {
    keyframes: {
      y: [0, 80, -10, 30, 0],
      /**
       * ease across the entire set of keyframes
       * defaults to the one defined in the tween, or "none" if one isn't defined there)
       */
      ease: 'none',
      easeEach: 'power2.inOut', // <- ease between each keyframe (defaults to "power1.inOut")
    },
    rotation: 180 * DEG_TO_RAD,
    /**
     * the "normal" part of the tween. In this case, it affects "rotate" because it's outside the keyframes
     */
    ease: 'elastic',
    duration: 5,
    stagger: 0.2,
    repeat: -1,
    yoyo: true,
  });
}

whenever(boxes, initial)
onUnmounted(() => animation?.kill())
</script>

<template>
  <container @effect="container => {
    container.x = screen.width / 2 - container.width / 2 + size / 2
    container.y = screen.height / 2 - container.height / 2 + size / 2
  }">
    <graphics v-for="i in 4" :key="i" ref="boxes" :x="(i - 1) * 120" @effect="graphics => {
      graphics
        .roundRect(-size / 2, -size / 2, size, size, 8)
        .fill(0xED427C)
        .stroke({ color: 'white', width: 4 })
      graphics.filters = [dropShadowFilter]
    }" />
  </container>
</template>
