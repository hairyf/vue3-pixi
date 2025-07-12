<script lang="ts" setup>
import type { Container } from 'pixi.js'
import { computed, ref } from 'vue'

import { onTick, useScreen } from 'vue3-pixi'
const screen = useScreen()
const containerRef = ref<Container>()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const rotation = ref(0)

onTick(({ deltaTime }) => {
  rotation.value += 0.01 * deltaTime
})
</script>

<template>
  <container
    ref="containerRef"
    :position="center"
    :rotation="rotation"
    :pivot="{ x: 93, y: 98.5 }"
  >
    <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
      <sprite
        v-for="(_, i) in 25"
        :key="i"
        texture="bunny"
        :x="(i % 5) * 40"
        :y="Math.floor(i / 5) * 40"
      />
    </assets>
  </container>
</template>

