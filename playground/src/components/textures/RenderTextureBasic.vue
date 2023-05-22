<script lang="ts" setup>
import { BaseRenderTexture, RenderTexture, SCALE_MODES, Sprite } from 'pixi.js'
import type { SpriteProps } from 'vue3-pixi'
import { onReady } from 'vue3-pixi'
import { ref } from 'vue'

const brt = new BaseRenderTexture({
  width: 300,
  height: 300,
  scaleMode: SCALE_MODES.LINEAR,
  resolution: 1,
})
const rt = new RenderTexture(brt)

const rabbits = ref<Partial<SpriteProps>[]>([])
const containerRef = ref()

for (let i = 0; i < 25; i++) {
  rabbits.value.push({
    texture: 'https://beta.pixijs.com/assets/bunny.png',
    x: (i % 5) * 30,
    y: Math.floor(i / 5) * 30,
    rotation: Math.random() * Math.PI * 2,
  })
}

onReady((app) => {
  app.renderer.render(containerRef.value, { renderTexture: rt })
})
</script>

<template>
  <Sprite :x="450" :y="60" :texture="rt" />
  <container ref="containerRef" :x="100" :y="60">
    <Sprite
      v-for="(it, i) in rabbits"
      :key="i"
      v-bind="it"
    />
  </container>
</template>

<style lang="scss" scoped></style>
