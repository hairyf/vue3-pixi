<script lang="ts" setup>
import { SCALE_MODES, Texture } from 'pixi.js'

import t0 from '../assets/sprites/0.png'
import t1 from '../assets/sprites/1.png'
import t2 from '../assets/sprites/2.png'
import t3 from '../assets/sprites/3.png'
import t4 from '../assets/sprites/4.png'
import t5 from '../assets/sprites/5.png'
import t6 from '../assets/sprites/6.png'
import t7 from '../assets/sprites/7.png'
import t8 from '../assets/sprites/8.png'
import t9 from '../assets/sprites/9.png'

withDefaults(
  defineProps<{
    score: number
    scale?: number
    x?: number
    y?: number
  }>(), {
    x: 0,
    y: 0,
  },
)

const textures = [
  t0,
  t1,
  t2,
  t3,
  t4,
  t5,
  t6,
  t7,
  t8,
  t9,
].map(url => Texture.from(url, { scaleMode: SCALE_MODES.NEAREST }))
</script>

<template>
  <container :x="x" :y="0">
    <sprite
      v-for="(digit, index) in score.toString().split('')"
      :key="index"
      :texture="textures[+digit]"
      :x="index * 24"
      :anchor="0.5"
      :y="y"
      :scale="scale || 1"
    />
  </container>
</template>

<style lang="scss" scoped></style>
