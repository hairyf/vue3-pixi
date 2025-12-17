<script lang="ts" setup>
import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const scale = ref(1)
</script>

<template>
  <assets
    alias="bunny"
    entry="https://pixijs.com/assets/bunny.png"
    @loaded="texture => texture.source.scaleMode = 'nearest'"
  >
    <sprite
      texture="bunny"
      :x="screen.width / 2"
      :scale="scale"
      :y="screen.height / 2"
      :anchor="0.5"
      cursor="pointer"
      @click="scale += 1.25"
    />
  </assets>
</template>
