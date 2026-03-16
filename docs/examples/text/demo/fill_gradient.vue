<script lang="ts" setup>
import { Color, FillGradient, TextStyle } from 'pixi.js'

// Create gradient fill
const fill = new FillGradient(0, 0, 0, 10)
const colors = [0xFFFFFF, 0x00FF99].map(color => Color.shared.setValue(color).toNumber())
colors.forEach((number, index) => {
  const ratio = index / colors.length
  fill.addColorStop(ratio, number)
})

const richStyle = new TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: { fill },
  stroke: { color: '#4a1850', width: 5, join: 'round' },
  dropShadow: {
    color: '#000000',
    blur: 4,
    angle: Math.PI / 6,
    distance: 6,
  },
  wordWrap: true,
  wordWrapWidth: 440,
})

const skewStyle = new TextStyle({
  fontFamily: 'Arial',
  dropShadow: {
    alpha: 0.8,
    angle: 2.1,
    blur: 4,
    color: '0x111111',
    distance: 10,
  },
  fill: '#ffffff',
  stroke: { color: '#004620', width: 12, join: 'round' },
  fontSize: 60,
  fontWeight: 'lighter',
})
</script>

<template>
  <text :x="50" :y="100">
    Basic text in pixi
  </text>
  <text :x="50" :y="220" :style="richStyle">
    Rich text with a lot of options and across multiple lines
  </text>
  <text
    :x="300"
    :y="480"
    :style="skewStyle"
    :anchor="0.5"
    :skew="{ x: 0.65, y: -0.3 }"
  >
    SKEW IS COOL
  </text>
</template>
