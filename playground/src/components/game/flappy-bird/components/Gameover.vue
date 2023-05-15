<script lang="ts" setup>
import { SCALE_MODES, Texture } from 'pixi.js'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { useElementHoverScale } from '../composables/useElementHoverScale'
import { useCosineAmplitude } from '../composables/useCosineAmplitude'
import gameoverPNG from '../assets/sprites/gameover.png'
import Score from './Score.vue'

const emit = defineEmits(['restart'])
const score = inject<Ref<number>>('score')!

const texture = Texture.from(gameoverPNG, {
  scaleMode: SCALE_MODES.NEAREST,
})
const containerRef = ref()

const offsetY = useCosineAmplitude()
const scale = useElementHoverScale(containerRef)
</script>

<template>
  <container>
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
    <Score :x="320" :y="(480 / 2) + 30" :score="score" :scale="1.5" />
  </container>
</template>

<style lang="scss" scoped></style>
