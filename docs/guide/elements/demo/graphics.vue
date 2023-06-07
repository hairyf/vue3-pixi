<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const size = ref(100)

let count = 0

onTick((delta) => {
  count += delta * 0.025
  size.value = 60 + Math.sin(count) * 30
})
</script>

<template>
  <graphics
    :x="120"
    :y="120"
    @render="graphics => {
      graphics.clear()
      graphics.beginFill(0xDE3249)
      graphics.drawCircle(0, 0, size)
      graphics.endFill()
    }"
  />
</template>
