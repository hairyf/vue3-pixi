<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import type { ColorSource } from 'pixi.js'
import { Assets, Texture, Ticker } from 'pixi.js'

import { reactive, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

interface Aline {
  texture: any
  tint: ColorSource
  x: number
  y: number
  rotation: number
  scaleX: number
  scaleY: number
}

const ticker = new Ticker()

ticker.stop()

const screen = useScreen()

let count = 0

// holder to store aliens
const alienFrames = ['eggHead.png', 'flowerTop.png', 'helmlok.png', 'skully.png']

const aliens = reactive<Aline[]>([])
const scale = reactive({ x: 1, y: 1 })
const rotation = ref(0)
const cacheAsBitmap = ref(false)

function onAssetsLoaded() {
  // add a bunch of aliens with textures from image paths
  for (let i = 0; i < 100; i++) {
    const frameName = alienFrames[i % 4]
    // create an alien using the frame name..
    aliens.push({
      texture: Texture.from(frameName),
      x: Math.random() * 800 - 400,
      y: Math.random() * 600 - 300,
      tint: Math.random() * 0xFFFFFF,
      rotation: 0,
      scaleX: 0.5,
      scaleY: 0.5,
    })
  }

  ticker.start()
}

function tickAlines() {
  // let's rotate the aliens a little bit
  for (let i = 0; i < 100; i++) {
    const alien = aliens[i]

    alien.rotation += 0.1
  }

  count += 0.01

  scale.x = Math.sin(count)
  scale.y = Math.sin(count)
  rotation.value += 0.01
}

// load resources
Assets.load('https://beta.pixijs.com/assets/spritesheet/monsters.json').then(onAssetsLoaded)
ticker.add(tickAlines)

// combines both mouse click + touch tap
useEventListener('pointerdown', () => {
  cacheAsBitmap.value = !cacheAsBitmap.value
})
</script>

<template>
  <container
    :x="screen.width / 2"
    :y="screen.height / 2"
    :scale="scale"
    :rotation="rotation"
    :cache-as-bitmap="cacheAsBitmap"
  >
    <sprite
      v-for="(alien, index) in aliens" :key="index"
      :texture="alien.texture"
      :tint="alien.tint"
      :x="alien.x"
      :y="alien.y"
      :rotation="alien.rotation"
      :scale-x="alien.scaleX"
      :scale-y="alien.scaleY"
    />
  </container>
</template>

