<script lang="ts" setup>
import { computed } from 'vue'
import type { Container as ContainerElement, Sprite as SpriteElement } from 'pixi.js'
import { onReady, useScreen, useStage } from 'vue3-pixi'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import InertiaPlugin from 'gsap/InertiaPlugin'

gsap.registerPlugin(InertiaPlugin)

const screen = useScreen()
const stage = useStage()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

let oldX = 0
let oldY = 0
let deltaX = 0
let deltaY = 0

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'pointermove', (e: PointerEvent) => {
  deltaX = e.clientX - oldX
  deltaY = e.clientY - oldY
  oldX = e.clientX
  oldY = e.clientY
})

function onPointerover(this: ContainerElement) {
  const tl = gsap.timeline({
    onComplete: () => {
      tl.kill()
    },
  })

  tl.timeScale(1.2)


  const image = this.getChildAt(0) as SpriteElement

  tl.to(image, {
    inertia: {
      x: {
        velocity: deltaX * 30,
        end: 0,
      },
      y: {
        velocity: deltaY * 30,
        end: 0,
      },
    },
  })
  tl.fromTo(
    image,
    {
      angle: 0,
    },
    {
      duration: 0.4,
      angle: (Math.random() - 0.5) * 30,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    },
    '<',
  )

}
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <container
      :position="center"
      :pivot="{ x: 93, y: 98.5 }"
    >
      <container
        v-for="(_, i) in 25"
        :key="i"
        @pointerover="onPointerover"
        :x="(i % 5) * 40"
        :y="Math.floor(i / 5) * 40"
      >
        <sprite texture="bunny" />
      </container>
    </container>
</assets>
</template>