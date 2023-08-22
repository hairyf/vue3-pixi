<script lang="ts" setup>
import { Assets, Texture } from 'pixi.js'

import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const textures = ref<Texture[]>([])
const rotation = ref(0)

function onAssetsLoaded() {
  for (let i = 0; i < 30; i++) {
    const texture = Texture.from(`rollSequence00${i < 10 ? `0${i}` : i}.png`)
    textures.value.push(texture)
  }
}

Assets.load('https://pixijs.com/assets/spritesheet/fighter.json')
  .then(onAssetsLoaded)

onTick(() => rotation.value += 0.01)
</script>

<template>
  <animated-sprite
    v-if="textures.length"
    :textures="textures"
    :animation-speed="0.5"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :anchor="0.5"
    :rotation="rotation"
    playing
  />
</template>

