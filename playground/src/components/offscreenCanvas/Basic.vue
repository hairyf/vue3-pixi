<script lang="ts" setup>
import { computed, ref } from 'vue'

import type { ContainerInst } from 'vue3-pixi'
import { onMountedTicker, useScreen } from 'vue3-pixi'
const screen = useScreen()
const containerRef = ref<ContainerInst>()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const containerCenter = computed(() => ({
  x: (containerRef.value?.width || 0) / 2,
  y: (containerRef.value?.height || 0) / 2,
}))

const rotation = ref(0)

onMountedTicker((delta) => {
  rotation.value += 0.01 * delta
})
</script>

<template>
  <container
    ref="containerRef"
    :position="center"
    :rotation="rotation"
    :pivot="containerCenter"
  >
    <sprite
      v-for="(_, i) in 25"
      :key="i"
      texture="https://beta.pixijs.com/assets/bunny.png"
      :x="(i % 5) * 40"
      :y="Math.floor(i / 5) * 40"
    />
  </container>
</template>

