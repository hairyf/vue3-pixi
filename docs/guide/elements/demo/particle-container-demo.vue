<script lang="ts" setup>
import type { ParticleContainer } from 'pixi.js'

import { Particle, Texture } from 'pixi.js'
import { ref } from 'vue'
import { External, onTick } from 'vue3-pixi'

interface StarParticle extends Particle {
  init: { x: number, y: number, z: number }
  x: number
  y: number
  z: number
}

const width = 400
const height = 240
const speed = 0.025
const fov = 20
const starSize = 0.05

const amount = ref(1000)
const containerRef = ref<ParticleContainer>()

let camera = 0

function updateStars(particleContainer: ParticleContainer) {
  const length = particleContainer.particleChildren.length
  if (amount.value < length) {
    const removeChildren = particleContainer.particleChildren.slice(0, (length - amount.value))
    particleContainer.removeParticle(...removeChildren)
    return
  }

  const stars = Array.from({ length: +amount.value - length }).fill(null).map(() => {
    const deg = Math.random() * Math.PI * 2
    const distance = Math.random() * 50 + 1
    const star = new Particle({ texture: Texture.from('star') }) as StarParticle

    star.init = {
      x: Math.cos(deg) * distance,
      y: Math.sin(deg) * distance,
      z: Math.random() * 1000 + 750,
    }

    Object.assign(star, star.init)

    updateStar(star)

    return star
  })
  particleContainer.addParticle(...stars)
}

function updateStar(star: StarParticle) {
  const z = star.z - camera
  const distance = Math.max(0, (2000 - (z)) / 2000)
  const scale = distance * starSize

  star.scaleY = star.scaleX = scale
  star.anchorX = 0.5
  star.anchorY = 0.7

  star.x = star.init.x * (fov / z) * width + width / 2
  star.y = star.init.y * (fov / z) * width + height / 2
}

onTick(({ deltaTime }) => {
  camera += deltaTime * 10 * speed
  for (const element of containerRef.value?.particleChildren || []) {
    updateStar(element as StarParticle)
  }
})
</script>

<template>
  <assets alias="star" entry="/assets/star.png">
    <particle-container ref="containerRef" @effect="updateStars" />
  </assets>
  <External style="margin-top: 20px;" tag="div">
    <div>Amount: {{ amount }}</div>
    <input v-model="amount" type="range" min="0" max="50000" step="100">
  </External>
</template>

<style>
input {
  width: 100%;
}
</style>
