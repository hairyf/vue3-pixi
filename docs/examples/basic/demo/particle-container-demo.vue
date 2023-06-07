<script lang="ts" setup>
import type { ColorSource } from 'pixi.js'
import { Rectangle, Sprite } from 'pixi.js'
import type { ParticleContainerInst } from 'vue3-pixi'
import { onTick } from 'vue3-pixi'

interface DudeIte extends Sprite {
  x: number
  y: number
  tint: ColorSource
  direction: number
  turningSpeed: number
  speed: number
  offset: number
  rotation: number
}

// create an array to store all the sprites
const maggots: DudeIte[] = []

const totalSprites = 5000

// create a bounding box box for the little maggots
const dudeBoundsPadding = 100
const dudeBounds = new Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  572 + dudeBoundsPadding * 2,
  550 + dudeBoundsPadding * 2,
)

let tick = 0

onTick(() => {
  // iterate through the sprites and update their position
  for (let i = 0; i < maggots.length; i++) {
    const dude = maggots[i]

    dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05
    dude.direction += dude.turningSpeed * 0.01
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y)
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y)
    dude.rotation = -dude.direction + Math.PI

    // wrap the maggots
    if (dude.x < dudeBounds.x)
      dude.x += dudeBounds.width

    else if (dude.x > dudeBounds.x + dudeBounds.width)
      dude.x -= dudeBounds.width

    if (dude.y < dudeBounds.y)
      dude.y += dudeBounds.height

    else if (dude.y > dudeBounds.y + dudeBounds.height)
      dude.y -= dudeBounds.height
  }

  // increment the ticker
  tick += 0.1
})

function onRender(el: ParticleContainerInst) {
  for (let i = 0; i < totalSprites; i++) {
  // create a new Sprite
    const dude = Sprite.from('https://beta.pixijs.com/assets/maggot_tiny.png') as DudeIte

    // set the anchor point so the texture is centerd on the sprite
    dude.anchor.set(0.5)

    // different maggots, different sizes
    dude.scale.set(0.8 + Math.random() * 0.3)

    // scatter them all
    dude.x = Math.random() * 572
    dude.y = Math.random() * 550

    dude.tint = Math.random() * 0x808080

    // create a random direction in radians
    dude.direction = Math.random() * Math.PI * 2

    // this number will be used to modify the direction of the sprite over time
    dude.turningSpeed = Math.random() - 0.8

    // create a random speed between 0 - 2, and these maggots are slooww
    dude.speed = (2 + Math.random() * 2) * 0.2

    dude.offset = Math.random() * 100

    // finally we push the dude into the maggots array so it it can be easily accessed later
    maggots.push(dude)
  }
  el.addChild(...maggots)
}
</script>

<template>
  <particle-container
    :max-size="10000"
    :properties="{
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true,
    }"
    @render="onRender"
  />
</template>

