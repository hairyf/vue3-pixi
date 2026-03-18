<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
</script>

<template>
  <text
    text="Hello, PixiJS!"
    :anchor="0.5"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :style="{
      fontFamily: 'Arial',
      fontSize: 48,
      fill: '#ffffff',
      align: 'center',
    }"
  />
</template>
