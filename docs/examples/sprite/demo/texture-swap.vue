<script lang="ts" setup>
import { Texture } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const asserts = {
  flowerTop: Texture.from('https://beta.pixijs.com/assets/flowerTop.png'),
  eggHead: Texture.from('https://beta.pixijs.com/assets/eggHead.png'),
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
  <Sprite
    :texture="asserts[current]"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :rotation="rotation"
    :anchor="0.5"
    @click="swap"
  />
</template>

