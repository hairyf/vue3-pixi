<script lang="ts" setup>
import { Loader } from 'vue3-pixi'

const fonts = {
  'ChaChicle': 'https://pixijs.com/assets/webfont-loader/ChaChicle.ttf',
  'Lineal': 'https://pixijs.com/assets/webfont-loader/Lineal.otf',
  'Dotrice Regular': 'https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff',
  'Crosterian': 'https://pixijs.com/assets/webfont-loader/Crosterian.woff2',
}
</script>

<template>
  <Loader :resources="fonts">
    <text :y="0" :style="{ fontFamily: 'ChaChicle', fontSize: 50 }">
      ChaChicle.ttf
    </text>
    <text :y="150" :style="{ fontFamily: 'Lineal', fontSize: 50 }">
      Lineal.otf
    </text>
    <text :y="300" :style="{ fontFamily: 'Dotrice Regular', fontSize: 50 }">
      Dotrice Regular.woff
    </text>
    <text :y="450" :style="{ fontFamily: 'Crosterian', fontSize: 50 }">
      Crosterian.woff2
    </text>
  </Loader>
</template>
