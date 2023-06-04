<script lang=ts setup>
import { reactive } from 'vue'
import { onTick } from 'vue3-pixi'

const position = reactive({ x: 120, y: 120 })

let count = 0
onTick((delta) => {
  count += delta * 0.05
  position.x = 120 + Math.cos(count) * 50
  position.y = 120 + Math.sin(count) * 50
})
</script>

<template>
  <sprite
    texture="/assets/food/lemonpie.png"
    :position="position"
    :anchor="0.5"
    :scale="1.4"
  />
</template>
