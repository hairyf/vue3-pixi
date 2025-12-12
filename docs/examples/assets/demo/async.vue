<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <sprite
      texture="bunny"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :anchor="0.5"
    />
  </assets>
</template>
