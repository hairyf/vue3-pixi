<script lang="ts" setup>
import { reactive } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const tileScale = reactive({ x: 1, y: 1 })
const tilePosition = reactive({ x: 0, y: 0 })

let count = 0
onTick(() => {
  count += 0.005
  tileScale.x = 2 + Math.sin(count)
  tileScale.y = 2 + Math.cos(count)
  tilePosition.x += 1
  tilePosition.y += 1
})
</script>

<template>
  <assets entry="/assets/tiling-sprite.jpeg" #="{data}">
    <tiling-sprite
      :texture="data"
      :width="screen.width"
      :height="screen.height"
      :tile-scale="tileScale"
      :tile-position="tilePosition"
    />
  </assets>
</template>
