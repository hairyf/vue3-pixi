<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { SimplePlaneInst } from 'vue3-pixi'
import { onTick } from 'vue3-pixi'

const planeRef = ref<SimplePlaneInst>()
const buffer = computed(() => planeRef.value?.geometry.getBuffer('aVertexPosition'))

onTick(() => {
  if (buffer.value) {
    // Randomize the vertice positions a bit to create movement.
    for (let i = 0; i < buffer.value.data.length; i++)
      buffer.value.data[i] += (Math.random() - 0.5)
    buffer.value.update()
  }
})
</script>

<template>
  <simple-plane
    ref="planeRef"
    texture="/assets/bg_grass.jpg"
    :vertices="10"
  />
</template>
