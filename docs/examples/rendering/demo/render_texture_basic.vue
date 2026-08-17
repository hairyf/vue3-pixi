<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { Container, RenderTexture, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()

const outputSpriteRef = ref<Sprite>()

// Detached render source: created imperatively and never added to app.stage,
// so it can be safely re-rendered into a render texture every frame without
// disturbing the on-stage scene.
const source = new Container()
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
  if (outputSpriteRef.value) {
    outputSpriteRef.value.texture = renderTexture
  }
})

function onBunnyLoaded(texture: Texture) {
  source.position.set(100, 60)
  for (const bunny of bunnies) {
    const sprite = new Sprite(texture)
    sprite.position.set(bunny.x, bunny.y)
    sprite.rotation = bunny.rotation
    source.addChild(sprite)
  }
}

onTick(() => {
  if (!renderTexture || !app.value)
    return
  app.value.renderer.render({
    container: source,
    target: renderTexture,
  })
})
</script>

<template>
  <assets
    alias="bunny"
    entry="https://pixijs.com/assets/bunny.png"
    @loaded="onBunnyLoaded"
  />
  <!-- Output: displays the render texture -->
  <Sprite ref="outputSpriteRef" :x="450" :y="60" />
</template>
