<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const graphicsRef = ref<GraphicsElement>()
const rotation = ref(0)
const scale = ref(2)

function onDraw(graphics: GraphicsElement) {
  if (!graphicsRef.value) {
    graphicsRef.value = graphics
    // line it up as this svg is not centered
    const bounds = graphics.getLocalBounds()
    graphics.pivot.set(
      (bounds.x + bounds.width) / 2,
      (bounds.y + bounds.height) / 2,
    )
  }
}

onTick(() => {
  rotation.value += 0.01
  scale.value = 2 + Math.sin(rotation.value)
})
</script>

<template>
  <assets
    :entry="{
      src: 'https://pixijs.com/assets/tiger.svg',
      data: {
        parseAsGraphicsContext: true,
      },
    }"
  >
    <template #default="{ data }">
      <graphics
        :texture="data"
        :x="screen.width / 2"
        :y="screen.height / 2"
        :rotation="rotation"
        :scale="scale"
        @effect="onDraw"
      />
    </template>
  </assets>
</template>
