<script lang="ts" setup>
</script>

<template>
  <assets
    alias="desyrel"
    entry="https://pixijs.com/assets/bitmap-font/desyrel.xml"
  >
    <bitmap-text
      :x="50"
      :y="200"
      :style="{
        fontFamily: 'Desyrel',
        fontSize: 55,
        align: 'left',
      }"
    >
      bitmap fonts are supported!
      Woo yay!
    </bitmap-text>
  </assets>
</template>
