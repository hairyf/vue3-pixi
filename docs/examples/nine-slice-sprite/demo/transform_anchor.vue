<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const rotation = ref(0)

onTick(() => {
  rotation.value += 0.01
})
</script>

<template>
  <assets alias="panel" entry="https://pixijs.com/assets/nine-slice/panel-031.png">
    <nine-slice-sprite
      texture="panel"
      :left-width="30"
      :right-width="30"
      :top-height="30"
      :bottom-height="30"
      :anchor="0.5"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :width="screen.width / 2"
      :height="screen.height / 2"
      :rotation="rotation"
    />
  </assets>
</template>
