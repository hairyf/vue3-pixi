<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
</script>

<template>
  <assets
    alias="desyrel"
    entry="https://pixijs.com/assets/bitmap-font/desyrel.xml"
  >
    <bitmap-text
      :anchor="0.5"
      :position="{ x: screen.width / 2, y: screen.height / 2 }"
      :style="{
        fontFamily: 'Desyrel',
        wordWrapWidth: screen.width - 100,
        wordWrap: true,
        fontSize: 50,
        letterSpacing: 10,
        breakWords: true,
      }"
    >
      This_Is_A_Really_Long_Word_That_Would_Normally_Overflow_But_With_BreakWords_It_Wraps!
    </bitmap-text>
  </assets>
</template>
