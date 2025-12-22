<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { gsap } from 'gsap'
import Physics2DPlugin from 'gsap/Physics2DPlugin'
import { DropShadowFilter } from 'pixi-filters'
import {  onUnmounted, ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

gsap.registerPlugin(Physics2DPlugin)

const screen = useScreen()
const stage = useStage()

interface Dot {
  id: number
  x: number
  y: number
  size: number
}

const dots = ref<Dot[]>([])
let dotIdCounter = 0
let timeline: gsap.core.Timeline | null = null  

const textFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.5,
  blur: 4,
  offset: { x: 0, y: 5 },
})

const dotFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.5,
  blur: 4,
  offset: { x: 0, y: 5 },
})

function createConfetti(event: PointerEvent) {
  
  const dotCount = gsap.utils.random(15, 30, 1)

  for (let i = 0; i < dotCount; i++) {
    const size = gsap.utils.random(20, 40)
    const dot: Dot = {
      id: dotIdCounter++,
      x: event.clientX,
      y: event.clientY,
      size,
    }
    dots.value.push(dot)
  }
}

function animateDot(dotRef: GraphicsElement, dot: Dot) {
  gsap.set(dotRef, {
    scale: 0,
  })

  timeline = gsap
    .timeline({
      onComplete: () => {
        const index = dots.value.findIndex(d => d.id === dot.id)
        if (index > -1) {
          dots.value.splice(index, 1)
        }
        if (dotRef) {
          gsap.killTweensOf(dotRef)
        }
      },
    })
    .to(dotRef, {
      scale: gsap.utils.random(0.3, 1),
      duration: 0.02,
      ease: 'power3.out',
    })
    .to(dotRef, {
      duration: 2,
      physics2D: {
        velocity: gsap.utils.random(500, 1000),
        angle: gsap.utils.random(0, 360),
        gravity: 1500,
      },
      ease: 'none',
    })
}

onReady((app) => {
  app.stage.eventMode = 'static'
  app.stage.cursor = 'pointer'
  app.stage.hitArea = app.screen
})

useEventListener(stage, 'click', (event) => {
  createConfetti(event as PointerEvent)
})

onUnmounted(() => {
  dots.value = []
  timeline?.kill()
})
</script>

<template>
  <assets entry="https://pixijs.com/assets/webfont-loader/Grandstander-ExtraBold.ttf">
    <text
      :x="screen.width / 2"
      :y="screen.height / 2 - 50"
      :anchor="0.5"
      :style="{
        fontFamily: 'Grandstander ExtraBold',
        fontSize: 50,
        fill: 'white',
        textAlign: 'center',
      }"
      :filters="[textFilter]"
    >
      Click to create confetti
    </text>
    <graphics
      v-for="dot in dots"
      :key="dot.id"
      :x="dot.x"
      :y="dot.y"
      @effect="(graphics) => {
        graphics
          .circle(0, 0, dot.size)
          .fill('white')
          .stroke({ color: 'white', width: 2 })
        graphics.filters = [dotFilter]
        animateDot(graphics, dot)
      }"
    />
  </assets>
</template>
