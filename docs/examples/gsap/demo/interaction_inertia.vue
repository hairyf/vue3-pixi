<script lang="ts" setup>
import type { Container as ContainerElement, FederatedPointerEvent, Sprite as SpriteElement } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import InertiaPlugin from 'gsap/InertiaPlugin'
import { computed } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

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

useEventListener(stage, 'pointermove', (e: FederatedPointerEvent) => {
  deltaX = e.global.x - oldX
  deltaY = e.global.y - oldY
  oldX = e.global.x
  oldY = e.global.y
})

function onPointerover(this: ContainerElement) {
  const image = this.getChildAt(0) as SpriteElement
  const tl = gsap.timeline()
  const kill = () => tl.kill()
  tl.eventCallback('onComplete', () => {
    image.off('destroyed', kill)
    tl.kill()
  })
  image.once('destroyed', kill)

  tl.timeScale(1.2)

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
        :x="(i % 5) * 40"
        :y="Math.floor(i / 5) * 40"
        @pointerover="onPointerover"
      >
        <sprite texture="bunny" />
      </container>
    </container>
  </assets>
</template>
