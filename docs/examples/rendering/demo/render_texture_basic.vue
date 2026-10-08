<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { Container, RenderTexture, Sprite } from 'pixi.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { onTick, useApplication, useScreen } from 'vue3-pixi'

const app = useApplication()
const screen = useScreen()

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
  for (const bunny of bunnies) {
    const sprite = new Sprite(texture)
    sprite.position.set(bunny.x, bunny.y)
    sprite.rotation = bunny.rotation
    source.addChild(sprite)
  }
  const bounds = source.getLocalBounds()
  source.pivot.set(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  source.position.set(150, 150)
}

onUnmounted(() => {
  source.destroy({ children: true })
  renderTexture?.destroy(true)
})

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
  <Sprite
    ref="outputSpriteRef"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :anchor="0.5"
  />
</template>
