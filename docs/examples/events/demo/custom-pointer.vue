<script lang="ts" setup>
import type { Sprite as SpriteElement, SpriteOptions, Texture } from 'pixi.js'

import { reactive } from 'vue'
import { onReady, useScreen } from 'vue3-pixi'

type RecordSprite = SpriteElement & Record<string, any>

const screen = useScreen()
const textures = reactive<Record<string, Texture>>({})

// set some silly values...
const buttons: any[] = [
  { x: 175, y: 75, scale: 1.2 },
  { x: 655, y: 75 },
  { x: 410, y: 325, rotation: Math.PI / 10 },
  { x: 150, y: 465, scale: 0.8 },
  { x: 685, y: 445, scale: { x: 0.8, y: 1.2 }, rotation: Math.PI },
]

function onButtonDown(this: RecordSprite) {
  this._is_down = true
  this.texture = textures.buttonDown
  this.alpha = 1
}

function onButtonUp(this: RecordSprite) {
  this._is_down = false
  if (this._is_over)
    this.texture = textures.buttonOver
  else
    this.texture = textures.button
}

function onButtonOver(this: RecordSprite) {
  this._is_over = true
  if (this._is_down)
    return
  this.texture = textures.buttonOver
}

function onButtonOut(this: RecordSprite) {
  this._is_over = false
  if (this._is_down)
    return
  this.texture = textures.button
}

onReady((app) => {
  app.renderer.events.cursorStyles.default = 'url(\'https://pixijs.com/assets/bunny.png\'),auto'
  app.renderer.events.cursorStyles.hover = 'url(\'https://pixijs.com/assets/bunny_saturated.png\'),auto'
})
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg', src: 'https://pixijs.com/assets/bg_button.jpg' },
      { alias: 'button', src: 'https://pixijs.com/assets/button.png' },
      { alias: 'buttonDown', src: 'https://pixijs.com/assets/button_down.png' },
      { alias: 'buttonOver', src: 'https://pixijs.com/assets/button_over.png' },
    ]"
    @loaded="textures = $event"
  >
    <!-- create a background... -->
    <sprite texture="bg" :width="screen.width" :height="screen.height" />
    <!-- add it to the stage -->
    <sprite
      v-for="(p, i) in buttons"
      :key="i"
      v-bind="p"
      :texture="textures?.button"
      :anchor="0.5"
      cursor="hover"
      @pointerdown="onButtonDown"
      @pointerup="onButtonUp"
      @pointerupoutside="onButtonUp"
      @pointerover="onButtonOver"
      @pointerout="onButtonOut"
    />
  </assets>
</template>
