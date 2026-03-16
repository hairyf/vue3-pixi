<script lang="ts" setup>
import { groupD8, Rectangle, Texture } from 'pixi.js'
import { computed, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const textureLoaded = ref(false)
const baseTexture = ref<Texture>()

interface RotatedItem {
  texture: Texture
  x: number
  y: number
  labelX: number
  labelY: number
  rotateValue: number
}

const rotatedItems = ref<RotatedItem[]>([])

function onTextureLoaded(texture: any) {
  baseTexture.value = texture

  const D8 = groupD8
  const allTextures: Texture[] = [texture]

  for (let rotate = 1; rotate < 16; rotate++) {
    const h = D8.isVertical(rotate) ? texture.frame.width : texture.frame.height
    const w = D8.isVertical(rotate) ? texture.frame.height : texture.frame.width

    const { frame } = texture
    const crop = new Rectangle(texture.frame.x, texture.frame.y, w, h)
    const trim = crop

    const rotatedTexture = new Texture({
      source: texture.source,
      frame,
      orig: crop,
      trim,
      rotate,
    })
    allTextures.push(rotatedTexture)
  }

  const offsetX = (screen.value.width / 16) | 0
  const offsetY = (screen.value.height / 8) | 0
  const gridW = (screen.value.width / 4) | 0
  const gridH = (screen.value.height / 5) | 0

  const items: RotatedItem[] = []

  for (let i = 0; i < 16; i++) {
    const tex = allTextures[i < 8 ? i * 2 : (i - 8) * 2 + 1]
    const x = offsetX + gridW * (i % 4)
    const y = offsetY + gridH * ((i / 4) | 0)

    items.push({
      texture: tex,
      x,
      y,
      labelX: x,
      labelY: y - 20,
      rotateValue: tex.rotate,
    })
  }

  rotatedItems.value = items
  textureLoaded.value = true
}
</script>

<template>
  <assets
    alias="flowerTop"
    entry="https://pixijs.com/assets/flowerTop.png"
    @loaded="onTextureLoaded"
  >
    <container v-if="textureLoaded">
      <template v-for="(item, i) in rotatedItems" :key="i">
        <sprite
          :texture="item.texture"
          :x="item.x"
          :y="item.y"
          :scale="{ x: 0.5, y: 0.5 }"
        />
        <text
          :x="item.labelX"
          :y="item.labelY"
          :style="{
            fontFamily: 'Courier New',
            fontSize: 12,
            fill: 'white',
            align: 'left',
          }"
        >
          rotate = {{ item.rotateValue }}
        </text>
      </template>
    </container>
  </assets>
</template>
