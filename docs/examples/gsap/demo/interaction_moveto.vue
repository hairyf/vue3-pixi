<script lang="ts" setup>
import type { Container as ContainerElement, Sprite as SpriteElement } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import InertiaPlugin from 'gsap/InertiaPlugin'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

gsap.registerPlugin(InertiaPlugin)

const screen = useScreen()
const stage = useStage()

const container = ref<ContainerElement>()
const holders = ref<ContainerElement[]>([])

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

onMounted(async () => {
  await nextTick()
  if (container.value && holders.value.length === 25) {
    container.value.x = screen.value.width / 2
    container.value.y = screen.value.height / 2
    container.value.pivot.x = container.value.width / 2
    container.value.pivot.y = container.value.height / 2

    holders.value.forEach((holder) => {
      holder.eventMode = 'static'
      holder.on('pointerover', () => {
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill()
          },
        })

        tl.timeScale(1.2)

        const image = holder.getChildAt(0) as SpriteElement

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
      })
    })
  }
})

onUnmounted(() => {
  holders.value.forEach((holder) => {
    holder.removeAllListeners()
  })
})
</script>

<template>
  <assets entry="https://pixijs.com/assets/bunny.png">
    <container ref="container">
      <container
        v-for="i in 25"
        :key="i"
        :ref="(el: any) => { if (el) holders[i - 1] = el as ContainerElement }"
        :x="((i - 1) % 5) * 40"
        :y="Math.floor((i - 1) / 5) * 40"
        @effect="(holder: ContainerElement) => {
          const sprite = holder.getChildAt(0) as SpriteElement
          if (sprite) {
            holder.origin.set(sprite.width / 2, sprite.height / 2)
          }
        }"
      >
        <sprite texture="https://pixijs.com/assets/bunny.png" />
      </container>
    </container>
  </assets>
</template>
