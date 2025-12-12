<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
</script>

<template>
  <assets
    v-slot="{ data }"
    :entry="[
      { alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' },
      { alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' },
    ]"
  >
    <sprite
      :texture="data.flowerTop"
      :x="screen.width * 0.25"
      :y="screen.height / 2"
      :anchor="0.5"
    />
    <sprite
      :texture="data.eggHead"
      :x="screen.width * 0.75"
      :y="screen.height / 2"
      :anchor="0.5"
    />
  </assets>
</template>
