<script lang="ts" setup>
import { TransitionPresets, useTransition } from '@vueuse/core'
import { useScreen } from 'vue3-pixi-renderer'
import texture from '../assets/sprites/background-day.png'
import { useTilePosition } from '../composables/useTilePosition'

const props = defineProps<{
  blur?: boolean
}>()

const x = useTilePosition(0.25)

const screen = useScreen()
const blurValue = useTransition(
  () => (props.blur ? 20 : 0),
  {
    transition: TransitionPresets.easeOutQuad,
    duration: 350,
  },
)
</script>

<template>
  <tiling-sprite :tile-position-x="x" :width="screen.width * 2" :height="480" :texture="texture">
    <blur-filter :strength="10" :blur="blurValue" />
  </tiling-sprite>
</template>

<style lang="scss" scoped></style>
