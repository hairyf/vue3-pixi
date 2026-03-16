<script lang="ts" setup>
import { Assets } from 'pixi.js'
import { GifSprite } from 'pixi.js/gif'
import { onMounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const containerRef = ref()

onMounted(async () => {
  const container = containerRef.value
  if (!container) return

  const source = await Assets.load('https://userland.pixijs.io/gif/examples/chew.gif')
  const gif = new GifSprite({
    source,
    x: screen.value.width / 2,
    y: screen.value.height / 2,
    anchor: 0.5,
  })
  container.addChild(gif)
})
</script>

<template>
  <container ref="containerRef" />
</template>
