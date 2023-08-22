<script lang="ts" setup>
import { Graphics, Polygon, Sprite, Texture } from 'pixi.js'

const star = Texture.from('https://pixijs.com/assets/yellowstar.png')

const hitArea = new Polygon([
  80, 0,
  100, 50,
  160, 55,
  115, 95,
  130, 150,
  80, 120,
  30, 150,
  45, 95,
  0, 55,
  60, 50,
])

const square = new Graphics()
  .beginFill(0xFFFFFF)
  .drawRect(450, 200, 75, 200)
  .endFill()

const squareHit = new Graphics()
  .beginFill(0xFFFFFF)
  .drawRect(600, 200, 75, 200)
  .endFill()

function onClick(this: Sprite) {
  this.tint = 0x333333
}
function onPointerOver(this: Sprite) {
  this.tint = 0x666666
}
function onPointerOut(this: Sprite) {
  this.tint = 0xFFFFFF
}

const sBind = {
  texture: star,
  cursor: 'pointer',
  onClick,
  onPointerOver,
  onPointerOut,
  y: 200,
}
const tBind = {
  style: { fill: '#fff' },
  y: 200 + 170,
}
</script>

<template>
  <Sprite v-bind="sBind" :x="50" />
  <Text v-bind="tBind" :x="50 + 25">
    Standard
  </Text>
  <Sprite v-bind="sBind" :x="250" :hit-area="hitArea" />
  <Text v-bind="tBind" :x="250 + 35">
    Hit Area
  </Text>
  <Sprite v-bind="sBind" :x="450" :mask="square" />
  <Text v-bind="tBind" :x="450 + 10">
    Mask
  </Text>
  <Sprite v-bind="sBind" :x="600" :hit-area="hitArea" :mask="squareHit" />
  <Text v-bind="tBind" :x="600 + 10">
    Mask + Hit Area
  </Text>
</template>

