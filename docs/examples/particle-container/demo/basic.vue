<script lang="ts" setup>
import type { ParticleContainer } from 'pixi.js'
import { Particle, Rectangle, Texture } from 'pixi.js'
import { onTick, useScreen } from 'vue3-pixi'

interface DudeItem extends Omit<Particle, 'tint'> {
  x: number
  y: number
  tint: number
  direction: number
  turningSpeed: number
  speed: number
  offset: number
  rotation: number
}

const screen = useScreen()
const maggots: DudeItem[] = []
const totalSprites = 10000
const dudeBoundsPadding = 100

let tick = 0

onTick(() => {
  const dudeBounds = new Rectangle(
    -dudeBoundsPadding,
    -dudeBoundsPadding,
    screen.value.width + dudeBoundsPadding * 2,
    screen.value.height + dudeBoundsPadding * 2,
  )

  for (let i = 0; i < maggots.length; i++) {
    const dude = maggots[i]
    dude.scaleY = 0.95 + Math.sin(tick + dude.offset) * 0.05
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scaleY)
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scaleY)
    dude.rotation = -dude.direction + Math.PI

    if (dude.x < dudeBounds.x)
      dude.x += dudeBounds.width
    else if (dude.x > dudeBounds.x + dudeBounds.width)
      dude.x -= dudeBounds.width
    if (dude.y < dudeBounds.y)
      dude.y += dudeBounds.height
    else if (dude.y > dudeBounds.y + dudeBounds.height)
      dude.y -= dudeBounds.height
  }
  tick += 0.1
})

function effect(el: ParticleContainer) {
  const sw = screen.value.width
  const sh = screen.value.height

  for (let i = 0; i < totalSprites; i++) {
    const dude = new Particle({ texture: Texture.from('maggot_tiny') }) as unknown as DudeItem
    dude.anchorX = 0.5
    dude.anchorY = 0.5

    const scale = 0.8 + Math.random() * 0.3
    dude.scaleX = scale
    dude.scaleY = scale

    dude.x = Math.random() * sw
    dude.y = Math.random() * sh
    dude.tint = Math.random() * 0x808080
    dude.direction = Math.random() * Math.PI * 2
    dude.turningSpeed = Math.random() - 0.8
    dude.speed = (2 + Math.random() * 2) * 0.2
    dude.offset = Math.random() * 100

    maggots.push(dude)
  }
  el.addParticle(...maggots)
}
</script>

<template>
  <assets alias="maggot_tiny" entry="https://pixijs.com/assets/maggot_tiny.png">
    <particle-container
      :dynamic-properties="{
        position: true,
        rotation: true,
        vertex: true,
        uvs: true,
        color: true,
      }"
      @effect="effect"
    />
  </assets>
</template>
