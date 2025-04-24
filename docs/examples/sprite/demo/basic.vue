<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'
import type { Texture } from 'pixi.js'
import { Assets } from 'pixi.js'

const screen = useScreen()
const texture = ref<Texture>()
const rotation = ref(0)
function onAssetsLoaded(image: Texture) {
  texture.value = image
}
Assets.load('https://pixijs.com/assets/bunny.png').then(onAssetsLoaded)
onTick(() => rotation.value += 0.01)
</script>

<template>
  <sprite
    v-if="texture"
    :texture="texture"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :rotation="rotation"
    :anchor="0.5"
  />
</template>

