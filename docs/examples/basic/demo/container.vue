<script lang="ts" setup>
import type { Container } from 'pixi.js'
import { computed, ref } from 'vue'

import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

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
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <container
      :position="center"
      :rotation="rotation"
      :pivot="{ x: 93, y: 98.5 }"
    >
      <sprite
        v-for="(_, i) in 25"
        :key="i"
        :x="(i % 5) * 40"
        :y="Math.floor(i / 5) * 40"
        texture="bunny"
      />
    </container>
  </assets>
</template>
