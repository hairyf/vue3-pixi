<script lang="ts" setup>
import type { Container as ContainerElement, Graphics } from 'pixi.js'
import { gsap } from 'gsap'
import Physics2DPlugin from 'gsap/Physics2DPlugin'
import PixiPlugin from 'gsap/PixiPlugin'
import { Graphics as GraphicsClass } from 'pixi.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

gsap.registerPlugin(Physics2DPlugin, PixiPlugin)

const screen = useScreen()

const particleCount = 160
const particles = ref<ContainerElement[]>([])
const wrapper = ref<ContainerElement>()

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

let animations: gsap.core.Tween[] = []

onMounted(() => {
  if (particles.value.length === particleCount) {
    particles.value.forEach((particle, i) => {
      const size = random(5, 40)
      const graphics = particle.getChildAt(0) as Graphics
      if (graphics) {
        graphics.clear()
        graphics
          .circle(0, 0, size)
          .fill({ color: 0x000000, alpha: 0 })
          .stroke({
            color: `hsl(${i * (300 / particleCount) - 5}, 100%, 50%)`,
            width: 2,
          })
      }

      particle.x = (i * (100 / particleCount) * screen.width) / 100
      particle.y = screen.height + 10

      const anim = gsap.to(particle, {
        physics2D: {
          velocity: random(100, 300),
          gravity: 100,
          angle: random(-80, -100),
        },
        pixi: { scaleX: 0.1, scaleY: 0.1 },
        alpha: 0,
        duration: random(2, 6),
        ease: 'power1.out',
        repeat: -1,
        delay: i * -0.2,
        onComplete: () => {
          particle.x = (i * (100 / particleCount) * screen.width) / 100
          particle.y = screen.height + 10
          particle.scale.set(1)
          particle.alpha = 1
        },
      })
      animations.push(anim)
    })
  }
})

onUnmounted(() => {
  animations.forEach(anim => anim.kill())
  animations = []
})
</script>

<template>
  <container ref="wrapper">
    <container
      v-for="i in particleCount"
      :key="i"
      :ref="el => { if (el) particles[i - 1] = el as ContainerElement }"
      @effect="container => {
        const size = random(5, 40)
        const graphics = new GraphicsClass()
          .circle(0, 0, size)
          .fill({ color: 0x000000, alpha: 0 })
          .stroke({
            color: `hsl(${(i - 1) * (300 / particleCount) - 5}, 100%, 50%)`,
            width: 2,
          })
        container.addChild(graphics)
      }"
    />
  </container>
</template>
