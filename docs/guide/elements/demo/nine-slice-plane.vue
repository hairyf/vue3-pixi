<script setup>
import { ref } from 'vue'
import { Assets, onTick } from 'vue3-pixi'

const width = ref(0)
const height = ref(0)
let count = 0

onTick((delta) => {
  count += delta * 0.04
  width.value = 100 + Math.cos(count) * 20
  height.value = 100 + Math.sin(count) * 20
})
</script>

<template>
  <assets alias="nine-slice-blue" entry="/assets/nine-slice-blue.png">
    <nine-slice-plane
      :position="120"
      texture="x"
      :pivot="{ x: width / 2, y: height / 2 }"
      :width="width"
      :height="height"
      :left-width="12"
      :top-height="12"
      :right-width="12"
      :bottom-height="12"
    />
  </assets>
</template>
