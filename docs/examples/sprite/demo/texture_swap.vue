<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const rotation = ref(0)
const current = ref<'flowerTop' | 'eggHead'>('flowerTop')

onTick(() => rotation.value += 0.01)

function swap() {
  current.value = current.value === 'flowerTop' ? 'eggHead' : 'flowerTop'
}
</script>

<template>
  <assets
    :entry="[
      { alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' },
      { alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' },
    ]"
  >
    <sprite
      :texture="current"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :rotation="rotation"
      :anchor="0.5"
      @click="swap"
    />
  </assets>
</template>
