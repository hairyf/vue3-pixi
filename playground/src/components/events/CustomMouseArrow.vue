<script lang="ts" setup>
import { Sprite, Texture } from 'pixi.js'
import type { SpriteProps } from 'vue3-pixi'
import { useApplication, useScreen } from 'vue3-pixi'

type RecordSprite = Sprite & Record<string, any>

const app = useApplication()
const screen = useScreen()

// Css style for icons
const defaultIcon = 'url(\'https://beta.pixijs.com/assets/bunny.png\'),auto'
const hoverIcon = 'url(\'https://beta.pixijs.com/assets/bunny_saturated.png\'),auto'

app.value.renderer.events.cursorStyles.default = defaultIcon
app.value.renderer.events.cursorStyles.hover = hoverIcon

// create some textures from an image path
const texture = Texture.from('https://beta.pixijs.com/assets/button.png')
const textureDown = Texture.from('https://beta.pixijs.com/assets/button_down.png')
const textureOver = Texture.from('https://beta.pixijs.com/assets/button_over.png')

// set some silly values...
const buttons: Partial<SpriteProps>[] = [
  { x: 175, y: 75, scale: 1.2 },
  { x: 655, y: 75 },
  { x: 410, y: 325, rotation: Math.PI / 10 },
  { x: 150, y: 465, scale: 0.8 },
  { x: 685, y: 445, scale: { x: 0.8, y: 1.2 }, rotation: Math.PI },
]

function onButtonDown(this: RecordSprite) {
  this._is_down = true
  this.texture = textureDown
  this.alpha = 1
}

function onButtonUp(this: RecordSprite) {
  this._is_down = false
  if (this._is_over)
    this.texture = textureOver
  else
    this.texture = texture
}

function onButtonOver(this: RecordSprite) {
  this._is_over = true
  if (this._is_down)
    return
  this.texture = textureOver
}

function onButtonOut(this: RecordSprite) {
  this._is_over = false
  if (this._is_down)
    return
  this.texture = texture
}
</script>

<template>
  <!-- create a background... -->
  <Sprite texture="https://beta.pixijs.com/assets/bg_button.jpg" :width="screen.width" :height="screen.height" />
  <!-- add it to the stage -->
  <Sprite
    v-for="(p, i) in buttons"
    :key="i" v-bind="p"
    :texture="texture"
    :anchor="0.5"
    cursor="hover"
    @pointerdown="onButtonDown"
    @pointerup="onButtonUp"
    @pointerover="onButtonOver"
    @pointerout="onButtonOut"
  />
</template>
