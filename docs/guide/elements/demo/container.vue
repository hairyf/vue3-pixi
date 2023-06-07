<script setup>
import { reactive } from 'vue'
import { onTick } from 'vue3-pixi'

const style = { fill: 'white' }
let direction = -1

const position = reactive({ x: 120, y: 80 })

onTick((delta) => {
  if (position.x <= 0)
    direction = 1
  else if (position.x >= 180)
    direction = -1
  position.x += 2 * direction * delta
})
</script>

<template>
  <container :position="position">
    <text text="Hello" :style="style" />
    <text text="World" :style="style" y="60" />
  </container>
</template>
