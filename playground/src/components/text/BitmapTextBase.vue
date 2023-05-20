<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'
import { Assets } from 'pixi.js'

await Assets.load('https://beta.pixijs.com/assets/bitmap-font/desyrel.xml')
const screen = useScreen()
</script>

<template>
  <bitmap-text
    :x="screen.width / 2"
    :y="screen.height / 2"
    :anchor="0.5"
    :style="{ fontName: 'Desyrel', fontSize: 55, align: 'left', wordWrap: true }"
  >
    bitmap fonts are supported!\nWoo yay!
  </bitmap-text>
</template>

<style lang="scss" scoped></style>
