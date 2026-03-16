<script lang="ts" setup>
import { Assets, BitmapText, Container, SplitBitmapText } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const sceneRef = ref<Container>()

const theText = 'Break apart text into characters, words, and/or lines for easy animation.'

onMounted(async () => {
  if (!sceneRef.value)
    return

  await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml')

  const scene = sceneRef.value

  const bitmapFontText = new BitmapText({
    text: theText,
    style: {
      fontFamily: 'Desyrel',
      fontSize: 60,
      fill: 'white',
      wordWrap: true,
      wordWrapWidth: screen.value.width - 100,
    },
    alpha: 0.5,
  })

  const splitText = new SplitBitmapText({
    text: theText,
    style: {
      fontFamily: 'Desyrel',
      fontSize: 60,
      fill: 0x0,
      wordWrap: true,
      wordWrapWidth: screen.value.width - 100,
    },
    alpha: 1,
  })

  bitmapFontText.x = splitText.x = -bitmapFontText.width / 2
  bitmapFontText.y = splitText.y = -bitmapFontText.height / 2
  scene.addChild(bitmapFontText, splitText)

  // Simple animation loop for characters
  let frame = 0
  const chars = splitText.chars

  function animate() {
    frame++
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i]
      const offset = Math.sin((frame + i * 4) * 0.05) * 5
      char.y = (char as any)._originalY !== undefined
        ? (char as any)._originalY + offset
        : char.y + offset

      if ((char as any)._originalY === undefined) {
        (char as any)._originalY = char.y - offset
      }
    }
    animId = requestAnimationFrame(animate)
  }
  animId = requestAnimationFrame(animate)
})

let animId: number | null = null

onBeforeUnmount(() => {
  if (animId !== null) cancelAnimationFrame(animId)
})
</script>

<template>
  <container
    ref="sceneRef"
    :x="screen.width / 2"
    :y="screen.height / 2"
  />
</template>
