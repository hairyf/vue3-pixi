<script lang="ts" setup>
import { computed, ref } from 'vue'

import type { ContainerInst } from 'vue3-pixi'
import { onTick, useScreen } from 'vue3-pixi'
const screen = useScreen()
const containerRef = ref<ContainerInst>()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const rotation = ref(0)

onTick((delta) => {
  rotation.value += 0.01 * delta
})
</script>

<template>
  <container
    ref="containerRef"
    :position="center"
    :rotation="rotation"
    :pivot="{ x: 93, y: 98.5 }"
  >
    <sprite
      v-for="(_, i) in 25"
      :key="i"
      texture="https://pixijs.com/assets/bunny.png"
      :x="(i % 5) * 40"
      :y="Math.floor(i / 5) * 40"
    />
  </container>
</template>

