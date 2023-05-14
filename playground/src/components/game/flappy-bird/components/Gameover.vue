<script lang="ts" setup>
import { TransitionPresets, useElementHover, useRafFn, useTransition } from '@vueuse/core'
import { SCALE_MODES, Texture } from 'pixi.js'
import { computed, ref } from 'vue'
import gameoverPNG from '../assets/sprites/gameover.png'
import Score from './Score.vue'

const emit = defineEmits(['restart'])

const texture = Texture.from(gameoverPNG, {
  scaleMode: SCALE_MODES.NEAREST,
})

const time = ref(0)
const speed = 2
const amplitude = 10
const containerRef = ref()

const hovering = useElementHover(containerRef)
const offsetY = computed(() =>
  Math.cos((time.value / 1000) * speed) * amplitude,
)
const scale = useTransition(
  () => (hovering.value ? 1.1 : 1),
  {
    transition: TransitionPresets.easeOutBack,
    duration: 150,
  },
)

useRafFn(({ delta }) => (time.value += delta))
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
    <Score :x="320" :y="(480 / 2) + 30" :score="0" :scale="1.5" />
  </container>
</template>

<style lang="scss" scoped></style>
