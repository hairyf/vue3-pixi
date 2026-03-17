<script lang="ts" setup>
import { Assets, Sprite } from 'pixi.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()
const containerRef = ref()

const starAmount = 1000
let cameraZ = 0
const fov = 20
const baseSpeed = 0.025
let speed = 0
let warpSpeed = 0
const starStretch = 5
const starBaseSize = 0.05

interface Star {
  sprite: Sprite
  z: number
  x: number
  y: number
}

const stars: Star[] = []
let intervalId: ReturnType<typeof setInterval> | null = null

function randomizeStar(star: Star, initial: boolean) {
  star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000
  const deg = Math.random() * Math.PI * 2
  const distance = Math.random() * 50 + 1
  star.x = Math.cos(deg) * distance
  star.y = Math.sin(deg) * distance
}

onMounted(async () => {
  const container = containerRef.value
  if (!container)
    return

  const starTexture = await Assets.load('https://pixijs.com/assets/star.png')

  for (let i = 0; i < starAmount; i++) {
    const star: Star = {
      sprite: new Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0,
    }
    star.sprite.anchor.x = 0.5
    star.sprite.anchor.y = 0.7
    randomizeStar(star, true)
    container.addChild(star.sprite)
    stars.push(star)
  }

  intervalId = setInterval(() => {
    warpSpeed = warpSpeed > 0 ? 0 : 1
  }, 5000)
})

onUnmounted(() => {
  if (intervalId !== null)
    clearInterval(intervalId)
})

onTick((ticker) => {
  if (!app.value?.renderer)
    return
  const renderer = app.value.renderer

  speed += (warpSpeed - speed) / 20
  cameraZ += ticker.deltaTime * 10 * (speed + baseSpeed)

  for (let i = 0; i < stars.length; i++) {
    const star = stars[i]
    if (star.z < cameraZ)
      randomizeStar(star, false)

    const z = star.z - cameraZ
    star.sprite.x = star.x * (fov / z) * renderer.screen.width + renderer.screen.width / 2
    star.sprite.y = star.y * (fov / z) * renderer.screen.width + renderer.screen.height / 2

    const dxCenter = star.sprite.x - renderer.screen.width / 2
    const dyCenter = star.sprite.y - renderer.screen.height / 2
    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
    const distanceScale = Math.max(0, (2000 - z) / 2000)

    star.sprite.scale.x = distanceScale * starBaseSize
    star.sprite.scale.y
      = distanceScale * starBaseSize
        + (distanceScale * speed * starStretch * distanceCenter) / renderer.screen.width
    star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
  }
})
</script>

<template>
  <container ref="containerRef" />
</template>
