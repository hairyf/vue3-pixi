<script lang="ts" setup>
import type { NineSliceSprite as NineSliceSpriteType } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const spriteWidth = ref(500)
const spriteHeight = ref(300)
let counter = 0

onTick(() => {
  counter++
  spriteWidth.value = 500 + Math.sin(counter / 20) * 100
  spriteHeight.value = 300 + Math.cos(counter / 20) * 50
})
</script>

<template>
  <assets alias="panel" entry="https://pixijs.com/assets/nine-slice/panel-031.png">
    <nine-slice-sprite
      texture="panel"
      :left-width="30"
      :right-width="30"
      :top-height="30"
      :bottom-height="30"
      :anchor="0.5"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :width="spriteWidth"
      :height="spriteHeight"
    />
    <text
      :anchor="0.5"
      :x="screen.width / 2"
      :y="screen.height - 50"
      :style="{
        fontSize: 24,
        fill: '#ffffff',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: screen.width - 300,
      }"
      text="As you resize the NineSliceSprite, the edges and corners will remain intact, while the center stretches."
    />
  </assets>
</template>
