<script lang="ts" setup>
import type { FrameObject } from 'pixi.js'
import { Assets, Texture } from 'pixi.js'

import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const textures = ref<FrameObject[]>([])

function onAssetsLoaded(spritesheet: any) {
  const frames: any[] = []
  for (let i = 0; i < 10; i++) {
    const frame = `0123456789 ${i}.ase`
    const texture = Texture.from(frame)
    const time = spritesheet.data.frames[frame].duration
    frames.push({ texture, time })
  }
  textures.value = frames
}

Assets.load('https://beta.pixijs.com/assets/spritesheet/0123456789.json')
  .then(onAssetsLoaded)
</script>

<template>
  <template v-for="(_) in 50" :key="_">
    <AnimatedSprite
      v-if="textures.length"
      :textures="textures"
      :x="Math.random() * screen.width"
      :y="Math.random() * screen.height"
      :anchor="0.5"
      :rotation="Math.random() * Math.PI"
      :goto-and-play="Math.random() * 2.6 | 0"
    />
  </template>
</template>

