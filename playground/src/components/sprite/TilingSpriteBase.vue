<script lang="ts" setup>
import { reactive } from 'vue'
import { onMountedTicker, useScreen } from 'vue3-pixi'
const screen = useScreen()

const tileScale = reactive({ x: 1, y: 1 })
const tilePosition = reactive({ x: 0, y: 0 })

let count = 0
onMountedTicker(() => {
  count += 0.005
  tileScale.x = 2 + Math.sin(count)
  tileScale.y = 2 + Math.cos(count)

  tilePosition.x += 1
  tilePosition.y += 1
})
</script>

<template>
  <tiling-sprite
    texture="https://beta.pixijs.com/assets/p2.jpeg"
    :width="screen.width"
    :height="screen.height"
    :tile-scale="tileScale"
    :tile-position="tilePosition"
  />
</template>

