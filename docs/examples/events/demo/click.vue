<script lang="ts" setup>
import { SCALE_MODES, settings } from 'pixi.js'
import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

// Scale mode for all textures, will retain pixelation
settings.SCALE_MODE = SCALE_MODES.NEAREST

const screen = useScreen()
const scale = ref(1)
</script>

<template>
  <sprite
    texture="https://pixijs.com/assets/bunny.png"
    :x="screen.width / 2"
    :scale="scale"
    :y="screen.height / 2"
    :anchor="0.5"
    cursor="pointer"
    @click="scale += 1.25"
  />
</template>
