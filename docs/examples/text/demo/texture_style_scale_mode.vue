<script lang="ts" setup>
import { Assets, BitmapFont, Text } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const ready = ref(false)
const containerRef = ref()

onMounted(async () => {
  await Assets.load('https://pixijs.com/assets/webfont-loader/PixelifySans.ttf')

  BitmapFont.install({
    name: 'Custom',
    style: {
      fontFamily: 'PixelifySans',
      fontSize: 140,
      fill: '#ffffff',
    },
    chars: [
      ['a', 'z'],
      ['A', 'Z'],
      ['0', '9'],
    ],
    resolution: 2,
    padding: 4,
    textureStyle: {
      scaleMode: 'nearest',
    },
  })

  // Create the linear-scaled text imperatively since textureStyle is constructor-only
  const linearText = new Text({
    text: 'Linear',
    style: {
      fontFamily: 'PixelifySans',
      fontSize: 70,
      fill: 'white',
      align: 'center',
    },
    textureStyle: {
      scaleMode: 'linear',
    },
  })
  linearText.scale.set(2)
  linearText.anchor.set(0.5)
  linearText.position.set(screen.value.width / 2, screen.value.height / 2 + 75)

  if (containerRef.value) {
    containerRef.value.addChild(linearText)
  }

  ready.value = true
})
</script>

<template>
  <container ref="containerRef">
    <bitmap-text
      v-if="ready"
      :style="{
        fontFamily: 'Custom',
        fontSize: 70,
        fill: 'white',
        align: 'center',
      }"
      :scale="2"
      :anchor="0.5"
      :position="{ x: screen.width / 2, y: screen.height / 2 - 75 }"
    >
      Nearest
    </bitmap-text>
  </container>
</template>
