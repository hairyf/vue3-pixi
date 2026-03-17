<script lang="ts" setup>
import { RenderTexture, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()

const outputSpriteRef = ref<Sprite>()
const stuffContainerRef = ref()

let renderTexture: RenderTexture | null = null
let renderTexture2: RenderTexture | null = null
let count = 0

const fruits = [
  'https://pixijs.com/assets/rt_object_01.png',
  'https://pixijs.com/assets/rt_object_02.png',
  'https://pixijs.com/assets/rt_object_03.png',
  'https://pixijs.com/assets/rt_object_04.png',
  'https://pixijs.com/assets/rt_object_05.png',
  'https://pixijs.com/assets/rt_object_06.png',
  'https://pixijs.com/assets/rt_object_07.png',
  'https://pixijs.com/assets/rt_object_08.png',
]

const items = Array.from({ length: 20 }, (_, i) => ({
  src: fruits[i % fruits.length],
  x: Math.random() * 400 - 200,
  y: Math.random() * 400 - 200,
  rotation: 0,
}))

onMounted(() => {
  const stageSize = {
    width: screen.value.width,
    height: screen.value.height,
  }
  renderTexture = RenderTexture.create(stageSize)
  renderTexture2 = RenderTexture.create(stageSize)
  if (outputSpriteRef.value) {
    outputSpriteRef.value.texture = renderTexture
  }
})

onTick(() => {
  if (!outputSpriteRef.value || !stuffContainerRef.value || !renderTexture || !renderTexture2 || !app.value)
    return

  for (const item of items) {
    item.rotation += 0.1
  }

  count += 0.01

  // Swap the buffers
  const temp = renderTexture
  renderTexture = renderTexture2
  renderTexture2 = temp

  outputSpriteRef.value.texture = renderTexture
  stuffContainerRef.value.rotation -= 0.01
  outputSpriteRef.value.scale.set(1 + Math.sin(count) * 0.2)

  app.value.renderer.render({
    container: app.value.stage,
    target: renderTexture2,
    clear: false,
  })
})
</script>

<template>
  <assets :entry="fruits">
    <Sprite
      ref="outputSpriteRef"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :anchor="0.5"
    />
    <container
      ref="stuffContainerRef"
      :x="screen.width / 2"
      :y="screen.height / 2"
    >
      <Sprite
        v-for="(item, i) in items"
        :key="i"
        :texture="item.src"
        :x="item.x"
        :y="item.y"
        :rotation="item.rotation"
        :anchor="0.5"
      />
    </container>
  </assets>
</template>
