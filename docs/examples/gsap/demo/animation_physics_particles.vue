<script lang="ts" setup>
import type { Container as ContainerElement, Graphics } from 'pixi.js'
import { gsap } from 'gsap'
import Physics2DPlugin from 'gsap/Physics2DPlugin'
import PixiPlugin from 'gsap/PixiPlugin'
import { onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'
import { whenever } from '@vueuse/core'

gsap.registerPlugin(Physics2DPlugin, PixiPlugin)

const screen = useScreen()

const particleCount = 160
const particles = ref<ContainerElement[]>()


let animations: gsap.core.Tween[] = []

function initial(particles: ContainerElement[]) {
  particles.forEach((particle, i) => {
    particle.x = (i * (100 / particleCount) * screen.value.width) / 100
    particle.y = screen.value.height + 10

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
        particle.x = (i * (100 / particleCount) * screen.value.width) / 100
        particle.y = screen.value.height + 10
        particle.scale.set(1)
        particle.alpha = 1
      },
    })
    animations.push(anim)
  })
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

whenever(particles, initial)

onUnmounted(() => {
  animations.forEach(anim => anim.kill())
  animations = []
})

</script>

<template>
  <container>
    <container v-for="i in particleCount" :key="i" ref="particles">
      <graphics @effect="graphics => {
        const size = random(5, 40)
        graphics
          .circle(0, 0, size)
          .fill({ color: 0x000000, alpha: 0 })
          .stroke({
            color: `hsl(${(i - 1) * (300 / particleCount) - 5}, 100%, 50%)`,
            width: 2,
          })
      }
      " />
    </container>
  </container>
</template>
