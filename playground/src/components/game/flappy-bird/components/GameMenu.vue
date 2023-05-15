<script lang="ts" setup>
import { SCALE_MODES, Texture } from 'pixi.js'
import { ref } from 'vue'
import gameoverPNG from '../assets/sprites/message.png'
import { useElementHoverScale } from '../composables/useElementHoverScale'
import { useCosineAmplitude } from '../composables/useCosineAmplitude'

const emit = defineEmits(['start'])

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
    :x="320" :y="180"
    :scale="1.35"
    @click="emit('start')"
  >
    <tiling-sprite
      :y="offsetY"
      :texture="texture"
      :width="184"
      :height="60"
      :anchor="0.5"
      :scale="scale"
      :tile-position="{ x: 0, y: -1 }"
    />
  </container>
</template>

<style lang="scss" scoped></style>
