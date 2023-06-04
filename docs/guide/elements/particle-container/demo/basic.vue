<script lang="ts" setup>
import { Sprite, Texture } from 'pixi.js'

import { onUnmounted, ref } from 'vue'
import type { ParticleContainerInst } from 'vue3-pixi'
import { Application, onTick } from 'vue3-pixi'

interface StarSprite extends Sprite {
  initX: number
  initY: number
  initZ: number
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
const containerRef = ref<ParticleContainerInst>()

let camera = 0
let stars = [] as StarSprite[]

function updateStars() {
  stars.forEach(star => star.destroy())

  if (!containerRef.value)
    return

  stars = new Array(+amount.value).fill(null).map(() => {
    const star = new Sprite(Texture.from('/assets/star.png')) as StarSprite
    const deg = Math.random() * Math.PI * 2
    const distance = Math.random() * 50 + 1

    star.initX = Math.cos(deg) * distance
    star.initY = Math.sin(deg) * distance
    star.initZ = Math.random() * 1000 + 750

    star.x = star.initX
    star.y = star.initY
    star.z = star.initZ

    updateStar(star)

    return star
  })

  containerRef.value.addChild(...stars)
}

function updateStar(star: StarSprite) {
  const z = star.z - camera
  const distance = Math.max(0, (2000 - (z)) / 2000)

  star.scale.set(distance * starSize)
  star.anchor.set(0.5, 0.7)

  star.x = star.initX * (fov / z) * width + width / 2
  star.y = star.initY * (fov / z) * width + height / 2
}

onTick((delta) => {
  camera += delta * 10 * speed
  stars.forEach(updateStar)
})

onUnmounted(() => stars.forEach(star => star.destroy()))
</script>

<template>
  <Application :width="400" :height="240">
    <particle-container ref="containerRef" @render="updateStars" />
  </Application>
  <div style="margin-top: 20px;">
    <div>Amount: {{ amount }}</div>
    <input v-model="amount" type="range" min="0" max="10000" step="100">
  </div>
</template>

<style>
  input {
    width: 100%;
  }
</style>
