<script lang="ts" setup>
import { Container, RenderTexture, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()

const containerRef = ref<Container>()
const rtSpriteRef = ref<Sprite>()
let renderTexture: RenderTexture | null = null

const bunnies = Array.from({ length: 25 }, (_, i) => ({
  x: (i % 5) * 30,
  y: Math.floor(i / 5) * 30,
  rotation: Math.random() * (Math.PI * 2),
}))

onMounted(() => {
  renderTexture = RenderTexture.create({
    width: 300,
    height: 300,
    resolution: 1,
  })
  if (rtSpriteRef.value) {
    rtSpriteRef.value.texture = renderTexture
  }
})

onTick(() => {
  if (!containerRef.value || !renderTexture || !app.value)
    return
  app.value.renderer.render({
    container: containerRef.value,
    target: renderTexture,
  })
})
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <Container ref="containerRef" :x="100" :y="60">
      <Sprite
        v-for="(b, i) in bunnies"
        :key="i"
        texture="bunny"
        :x="b.x"
        :y="b.y"
        :rotation="b.rotation"
      />
    </Container>
    <Sprite ref="rtSpriteRef" :x="450" :y="60" />
  </assets>
</template>
