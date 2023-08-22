<script lang="ts" setup>
import { Loader, useScreen } from 'vue3-pixi'
const screen = useScreen()
</script>

<template>
  <Loader :resources="['https://pixijs.com/assets/bitmap-font/desyrel.xml']">
    <bitmap-text
      :x="screen.width / 2"
      :y="screen.height / 2"
      :anchor="0.5"
      :style="{ fontName: 'Desyrel', fontSize: 34, align: 'left', wordWrap: true }"
    >
      bitmap fonts are supported!\nWoo yay!
    </bitmap-text>
  </Loader>
</template>

