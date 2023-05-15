<script lang="ts" setup>
import { useScreen } from 'vue3-pixi'
import { SCALE_MODES } from 'pixi.js'
import { useTilePosition } from '../composables/useTilePosition'
import texture from '../assets/sprites/base.png'
const x = useTilePosition(0.25)
const screen = useScreen()
</script>

<template>
  <tiling-sprite
    :texture="texture"
    :texture-options="{ scaleMode: SCALE_MODES.NEAREST }"
    :tile-position-x="x"
    :width="screen.width * 2"
    :height="112"
    :y="390"
  />
</template>

