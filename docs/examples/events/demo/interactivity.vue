<script lang="ts" setup>
import type { SpriteInst, SpriteProps } from 'vue3-pixi'
import { Texture } from 'pixi.js'
import { useScreen } from 'vue3-pixi'

type RecordSprite = SpriteInst & Record<string, any>

const screen = useScreen()

// create some textures from an image path
const texture = Texture.from('https://pixijs.com/assets/button.png')
const textureDown = Texture.from('https://pixijs.com/assets/button_down.png')
const textureOver = Texture.from('https://pixijs.com/assets/button_over.png')

// set some silly values...
const buttons: Partial<SpriteProps>[] = [
  { x: 175, y: 75, scale: 1.2 },
  { x: 655, y: 75 },
  { x: 410, y: 325, rotation: Math.PI / 10 },
  { x: 150, y: 465, scale: 0.8 },
  { x: 685, y: 445, scale: { x: 0.8, y: 1.2 }, rotation: Math.PI },
]

function onButtonDown(this: RecordSprite) {
  this.isDown = true
  this.texture = textureDown
  this.alpha = 1
}

function onButtonUp(this: RecordSprite) {
  this.isDown = false
  if (this.isOver)
    this.texture = textureOver
  else
    this.texture = texture
}

function onButtonOver(this: RecordSprite) {
  this.isOver = true
  if (this.isDown)
    return
  this.texture = textureOver
}

function onButtonOut(this: RecordSprite) {
  this.isOver = false
  if (this.isDown)
    return
  this.texture = texture
}
</script>

<template>
  <!-- create a background... -->
  <sprite texture="https://pixijs.com/assets/bg_button.jpg" :width="screen.width" :height="screen.height" />
  <!-- add it to the stage -->
  <sprite
    v-for="(p, i) in buttons"
    :key="i" v-bind="p"
    :texture="texture"
    :anchor="0.5"
    cursor="pointer"
    @pointerdown="onButtonDown"
    @pointerup="onButtonUp"
    @pointerover="onButtonOver"
    @pointerout="onButtonOut"
  />
</template>
