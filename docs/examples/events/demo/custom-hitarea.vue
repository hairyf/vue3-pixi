<script lang="ts" setup>
import type { Sprite as SpriteElement } from 'pixi.js'
import { Graphics, Polygon } from 'pixi.js'

const hitArea = new Polygon([
  80,
  0,
  100,
  50,
  160,
  55,
  115,
  95,
  130,
  150,
  80,
  120,
  30,
  150,
  45,
  95,
  0,
  55,
  60,
  50,
])

const square = new Graphics().rect(400, 200, 75, 200).fill()
const squareHit = new Graphics().rect(550, 200, 75, 200).fill()

function onClick(this: SpriteElement) {
  this.tint = 0x333333
}
function onPointerOver(this: SpriteElement) {
  this.tint = 0x666666
}
function onPointerOut(this: SpriteElement) {
  this.tint = 0xFFFFFF
}

const sBind = {
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
  <assets alias="star" entry="https://pixijs.com/assets/yellowstar.png">
    <sprite v-bind="sBind" :x="0" texture="star" />
    <text v-bind="tBind" :x="25">
      Standard
    </text>
    <sprite v-bind="sBind" :x="200" :hit-area="hitArea" texture="star" />
    <text v-bind="tBind" :x="200 + 35">
      Hit Area
    </text>
    <sprite v-bind="sBind" :x="400" :mask="square" texture="star" />
    <text v-bind="tBind" :x="400 + 10">
      Mask
    </text>
    <sprite v-bind="sBind" :x="550" :hit-area="hitArea" :mask="squareHit" texture="star" />
    <text v-bind="tBind" :x="550 + 10">
      Mask\nHit Area
    </text>
  </assets>
</template>
