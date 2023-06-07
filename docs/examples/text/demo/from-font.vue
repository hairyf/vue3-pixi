<script lang="ts" setup>
import { Loader } from 'vue3-pixi'

const fonts = {
  'ChaChicle': 'https://beta.pixijs.com/assets/webfont-loader/ChaChicle.ttf',
  'Lineal': 'https://beta.pixijs.com/assets/webfont-loader/Lineal.otf',
  'Dotrice Regular': 'https://beta.pixijs.com/assets/webfont-loader/Dotrice-Regular.woff',
  'Crosterian': 'https://beta.pixijs.com/assets/webfont-loader/Crosterian.woff2',
}
</script>

<template>
  <Loader :resources="fonts">
    <text :x="60" :y="50" :style="{ fontFamily: 'ChaChicle', fontSize: 34 }">
      ChaChicle.ttf
    </text>
    <text :x="60" :y="150" :style="{ fontFamily: 'Lineal', fontSize: 34 }">
      Lineal.otf
    </text>
    <text :x="60" :y="250" :style="{ fontFamily: 'Dotrice Regular', fontSize: 34 }">
      Dotrice Regular.woff
    </text>
    <text :x="60" :y="350" :style="{ fontFamily: 'Crosterian', fontSize: 34 }">
      Crosterian.woff2
    </text>
  </Loader>
</template>

