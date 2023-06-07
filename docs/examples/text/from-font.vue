<script lang="ts" setup>
import { Assets } from 'pixi.js'
import { useScreen } from 'vue3-pixi'

Assets.addBundle('fonts', {
  'ChaChicle': 'https://beta.pixijs.com/assets/webfont-loader/ChaChicle.ttf',
  'Lineal': 'https://beta.pixijs.com/assets/webfont-loader/Lineal.otf',
  'Dotrice Regular': 'https://beta.pixijs.com/assets/webfont-loader/Dotrice-Regular.woff',
  'Crosterian': 'https://beta.pixijs.com/assets/webfont-loader/Crosterian.woff2',
})

await Assets.loadBundle('fonts')

const screen = useScreen()
</script>

<template>
  <container :x="screen.width / 2" :y="screen.height / 2" :pivot-y="300" :pivot-x="400">
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
  </container>
</template>

