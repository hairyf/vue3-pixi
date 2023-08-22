<script lang="ts" setup>
import type { FrameObject } from 'pixi.js'
import { Assets, Texture } from 'pixi.js'

import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const textures = ref<FrameObject[]>([])
const slowRef = ref()

function onAssetsLoaded(spritesheet: any) {
  for (let i = 0; i < 10; i++) {
    const frame = `0123456789 ${i}.ase`
    const texture = Texture.from(frame)
    const time = spritesheet.data.frames[frame].duration
    textures.value.push({ texture, time })
  }
}

Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json')
  .then(onAssetsLoaded)
</script>

<template>
  <animated-sprite
    v-if="textures.length"
    ref="slowRef"
    :textures="textures"
    :animation-speed="0.5"
    :x="(screen.width - 200) / 2"
    :y="screen.height / 2"
    :anchor="0.5"
    :scale="4"
    playing
  />
  <animated-sprite
    v-if="textures.length"
    :textures="textures"
    :x="(screen.width + 200) / 2"
    :y="screen.height / 2"
    :anchor="0.5"
    :scale="4"
    playing
  />
</template>

