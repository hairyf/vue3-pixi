<script lang="ts" setup>
import { ref } from 'vue'
import { Loader, onTick, useScreen } from 'vue3-pixi'

const asserts = {
  flowerTop: ('https://pixijs.com/assets/flowerTop.png'),
  eggHead: ('https://pixijs.com/assets/eggHead.png'),
}

const screen = useScreen()

const rotation = ref(0)
const current = ref<keyof typeof asserts>('flowerTop')

onTick(() => rotation.value += 0.01)

function swap() {
  current.value = current.value === 'flowerTop' ? 'eggHead' : 'flowerTop'
}
</script>

<template>
  <Loader :resources="asserts">
    <sprite
      :texture="current"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :rotation="rotation"
      :anchor="0.5"
      @click="swap"
    />
  </Loader>
</template>
