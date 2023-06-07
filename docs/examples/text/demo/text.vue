<template>
  <text :x="50" :y="24">
    Basic text in pixi
  </text>
  <text
    :x="50" :y="110"
    :style="{
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: 'round',
    }"
  >
    Rich text with a lot of options and across multiple lines
  </text>
  <text
    :x="300"
    :y="350"
    :style="{
      fontFamily: 'Arial',
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: 2.1,
      dropShadowBlur: 4,
      dropShadowColor: '0x111111',
      dropShadowDistance: 10,
      fill: ['#ffffff'],
      stroke: '#004620',
      fontSize: 60,
      fontWeight: 'lighter',
      lineJoin: 'round',
      strokeThickness: 12,
    }"
    :skew-x="0.65"
    :skew-y="-0.3"
    :anchor="0.5"
  >
    SKEW IS COOL
  </text>
</template>

