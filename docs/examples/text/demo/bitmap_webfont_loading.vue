<script lang="ts" setup>
</script>

<template>
  <assets
    :entry="[
      { alias: 'ChaChicle', src: 'https://pixijs.com/assets/webfont-loader/ChaChicle.ttf' },
      { alias: 'Lineal', src: 'https://pixijs.com/assets/webfont-loader/Lineal.otf' },
      { alias: 'Dotrice Regular', src: 'https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff' },
      { alias: 'Crosterian', src: 'https://pixijs.com/assets/webfont-loader/Crosterian.woff2' },
    ]"
  >
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
  </assets>
</template>
