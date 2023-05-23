<script lang="ts" setup>
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'
import { Graphics } from 'pixi.js'
import { computed, ref } from 'vue'
const graphicsRef = ref()
const hovering = useElementHover(graphicsRef)
const blur = computed(() => (hovering.value ? 4 : 0))

const blurAnimated = useTransition(blur, {
  duration: 150,
  transition: TransitionPresets.easeOutQuad,
})

function drawRectangle(e: Graphics) {
  e.lineStyle(2, '#674196', 1)
  e.beginFill('#00a3af')
  e.drawRect(0, 0, 164, 164)
}
</script>

<template>
  <Graphics ref="graphicsRef" :x="200" :y="60" :rotation="0.5" :pivot="0" @render="drawRectangle">
    <blur-filter :strength="2" :blur="blurAnimated" />
  </Graphics>
</template>

