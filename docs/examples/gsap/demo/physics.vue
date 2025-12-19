<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import Physics2DPlugin from 'gsap/Physics2DPlugin'
import { DropShadowFilter } from 'pixi-filters'
import { onMounted, onUnmounted, ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

gsap.registerPlugin(Physics2DPlugin)

const screen = useScreen()
const stage = useStage()

const cannon = ref<GraphicsElement>()
const bullets = ref<GraphicsElement[]>()
const masterTl = gsap.timeline({ paused: true })

const cannonFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.25,
  blur: 4,
  offset: { x: 0, y: 10 },
})

async function initial(cannon: GraphicsElement, bullets: GraphicsElement[]) {
  const angle = 20
  const tl1 = gsap
    .timeline()
    .to(cannon, {
      angle: -angle,
      duration: 0.65,
      ease: 'power1.inOut',
    })
    .to(cannon, {
      angle,
      ease: 'power1.inOut',
      duration: 1,
      repeat: 3,
      yoyo: true,
    })
    .to(cannon, {
      angle: 0,
      duration: 0.65,
      ease: 'power1.inOut',
    })

  const tl1Time = tl1.duration()
  const tl2 = gsap
    .timeline()
    .to(bullets, {
      alpha: 1,
      duration: 0.25,
      stagger: {
        amount: tl1Time,
      },
    })
    .to(
      bullets,
      {
        duration: tl1Time,
        physics2D: {
          velocity: 'random(600, 850)',
          angle: () => 270 + Number(gsap.getProperty(cannon, 'angle')),
          gravity: 600,
        },
        stagger: {
          amount: tl1Time,
        },
      },
      0,
    )

  masterTl.add(tl1, 0).add(tl2, 0).play()
}

onMounted(() => initial(cannon.value!, bullets.value!))
onUnmounted(() => masterTl.clear())

onReady((app) => {
  // Enable interactivity!
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'click', () => masterTl.restart())
</script>

<template>
  <container
    :x="screen.width / 2"
    :y="screen.height - 100"
  >
    <graphics
      v-for="(_, i) in 40"
      :key="i"
      ref="bullets"
      @effect="bullet => {
        bullet.circle(0, 0, 30).fill({ color: 0xFFFFFF })
        gsap.set(bullet, {
          scale: gsap.utils.random(0.4, 0.6),
          alpha: 0,
        })
      }"
    />
  </container>
  <graphics
    ref="cannon"
    :x="screen.width / 2"
    :y="screen.height - 100"
    @effect="graphics => graphics
      .roundPoly(0, 0, 50, 3, 10)
      .fill(0xED427C)
      .stroke({ color: 'white', width: 4 })"
  >
    <filter :is="cannonFilter" />
  </graphics>
</template>
