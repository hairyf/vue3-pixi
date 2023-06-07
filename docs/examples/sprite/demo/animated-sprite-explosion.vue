<script lang="ts" setup>
import { Assets, Texture } from 'pixi.js'

import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const textures = ref<Texture[]>([])

function onAssetsLoaded() {
  for (let i = 0; i < 10; i++) {
    const frame = `Explosion_Sequence_A ${i + 1}.png`
    const texture = Texture.from(frame)
    textures.value.push(texture)
  }
}

Assets.load('https://beta.pixijs.com/assets/spritesheet/mc.json')
  .then(onAssetsLoaded)
</script>

<template>
  <template v-for="(_) in 100" :key="_">
    <animated-sprite
      v-if="textures.length"
      :textures="textures"
      :x="Math.random() * screen.width"
      :y="Math.random() * screen.height"
      :anchor="0.5"
      :rotation="Math.random() * Math.PI"
      :goto-and-play="Math.floor(Math.random() * 9) + 1"
      :animation-speed="0.5"
    />
  </template>
</template>

