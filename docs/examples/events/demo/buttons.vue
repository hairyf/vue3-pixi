<script lang="ts" setup>
import type { Sprite as SpriteElement, Texture } from 'pixi.js'

import { computed, reactive } from 'vue'
import { useScreen } from 'vue3-pixi'

type RecordSprite = SpriteElement & Record<string, any>

const screen = useScreen()
const textures = reactive<Record<string, Texture>>({})

// 根据 screen 计算按钮位置和尺寸
const buttons = computed(() => {
  const { width, height } = screen.value
  return [
    { x: width * 0.25, y: height * 0.15, scale: 1.2 },
    { x: width * 0.75, y: height * 0.15 },
    { x: width * 0.5, y: height * 0.5, rotation: Math.PI / 10 },
    { x: width * 0.2, y: height * 0.85, scale: 0.8 },
    { x: width * 0.8, y: height * 0.85, scale: { x: 0.8, y: 1.2 }, rotation: Math.PI },
  ]
})

function onButtonDown(this: RecordSprite) {
  this.isDown = true
  this.texture = textures.buttonDown
  this.alpha = 1
}

function onButtonUp(this: RecordSprite) {
  this.isDown = false
  if (this.isOver)
    this.texture = textures.buttonOver
  else
    this.texture = textures.button
}

function onButtonOver(this: RecordSprite) {
  this.isOver = true
  if (this.isDown)
    return
  this.texture = textures.buttonOver
}

function onButtonOut(this: RecordSprite) {
  this.isOver = false
  if (this.isDown)
    return
  this.texture = textures.button
}
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg', src: 'https://pixijs.com/assets/bg_button.jpg' },
      { alias: 'button', src: 'https://pixijs.com/assets/button.png' },
      { alias: 'buttonDown', src: 'https://pixijs.com/assets/button_down.png' },
      { alias: 'buttonOver', src: 'https://pixijs.com/assets/button_over.png' },
    ]"
    @loaded="Object.assign(textures, $event)"
  >
    <!-- create a background... -->
    <Sprite texture="bg" :width="screen.width" :height="screen.height" />
    <!-- add it to the stage -->
    <sprite
      v-for="(p, i) in buttons"
      :key="i"
      v-bind="p"
      :texture="textures.button"
      :anchor="0.5"
      cursor="pointer"
      event-mode="static"
      @pointerdown="onButtonDown"
      @pointerup="onButtonUp"
      @pointerupoutside="onButtonUp"
      @pointerover="onButtonOver"
      @pointerout="onButtonOut"
    />
  </assets>
</template>
