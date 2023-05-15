<script lang="ts" setup>
import { useRafFn } from '@vueuse/core'
import { SCALE_MODES, Texture } from 'pixi.js'
import { ref } from 'vue'
import gameoverPNG from '../assets/sprites/gameover.png'
import { useElementHoverScale } from '../composables/useElementHoverScale'
import { useCosineAmplitude } from '../composables/useCosineAmplitude'

const emit = defineEmits(['restart'])

const texture = Texture.from(gameoverPNG, {
  scaleMode: SCALE_MODES.NEAREST,
})

const containerRef = ref()

const offsetY = useCosineAmplitude()
const scale = useElementHoverScale(containerRef)
</script>

<template>
  <container
    ref="containerRef"
    event-mode="static"
    :x="320" :y="180"
    :scale="1.35"
    @click="emit('restart')"
  >
    <sprite
      :y="offsetY"
      :texture="texture"
      :anchor="0.5"
      :scale="scale"
    />
  </container>
</template>

<style lang="scss" scoped></style>
