<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { RenderTexture } from 'pixi.js'
import { computed, markRaw, ref } from 'vue'
import type { SpriteProps } from 'vue3-pixi'
import { tryMountTicker, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()

const full = computed(() => ({
  width: screen.value.width,
  height: screen.value.height,
}))

const texture = ref<Texture>()
const rotation = ref(0)
const scale = ref(1)

let renderTexture_1 = markRaw(RenderTexture.create(full.value))
let renderTexture_2 = markRaw(RenderTexture.create(full.value))

texture.value = renderTexture_1

// create an array of image ids..
const fruits = [
  'https://beta.pixijs.com/assets/rt_object_01.png',
  'https://beta.pixijs.com/assets/rt_object_02.png',
  'https://beta.pixijs.com/assets/rt_object_03.png',
  'https://beta.pixijs.com/assets/rt_object_04.png',
  'https://beta.pixijs.com/assets/rt_object_05.png',
  'https://beta.pixijs.com/assets/rt_object_06.png',
  'https://beta.pixijs.com/assets/rt_object_07.png',
  'https://beta.pixijs.com/assets/rt_object_08.png',
]

// create an array of items
const items = ref<Partial<SpriteProps>[]>([])

for (let i = 0; i < 20; i++) {
  items.value.push({
    texture: fruits[i % fruits.length],
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    rotation: 0,
  })
}

// used for spinning!
let count = 0

tryMountTicker(() => {
  if (!app.value)
    return
  items.value.forEach(it => (it.rotation! += 0.1))
  count++

  // swap the buffers..
  const temp = renderTexture_1
  renderTexture_1 = renderTexture_2
  renderTexture_2 = temp

  // set the new texture
  texture.value = renderTexture_1

  // twist this up!
  rotation.value -= 0.01
  scale.value = 1 + Math.sin(count) * 0.2

  app.value.renderer.render(app.value.stage, {
    renderTexture: renderTexture_2,
    clear: false,
  })
})
</script>

<template>
  <sprite :scale="scale" :texture="texture" :x="400" :y="300" :anchor="0.5" />
  <container :rotation="rotation" :x="400" :y="300">
    <sprite v-for="(it, i) in items" v-bind="it" :key="i" :anchor="0.5" />
  </container>
</template>

<style lang="scss" scoped></style>
