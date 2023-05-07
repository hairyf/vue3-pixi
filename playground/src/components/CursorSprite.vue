<script setup lang="ts">
import { computed, ref } from 'vue'
import { Circle, Graphics } from 'pixi.js'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'

const hitArea = new Circle(0, 0, 32)

const el = ref()

const hovering = useElementHover(el)

const scale = computed(() => (hovering.value ? 1.25 : 1))

const scaleAnimated = useTransition(scale, {
  duration: 150,
  transition: TransitionPresets.easeOutQuad,
})

function drawOutline(g: Graphics) {
  g.clear()

  g.lineStyle(2, 0xE3FF45, (scaleAnimated.value - 1) * 4)
  g.drawCircle(0, 0, 32 * scaleAnimated.value)
}
</script>

<template>
  <container>
    <sprite
      ref="el"
      texture="../assets/cursor.png"
      :hit-area="hitArea"
      :scale="scaleAnimated"
      :anchor="0.5"
      event-mode="static"
      tint="orange"
    />
    <Graphics @draw="drawOutline" />
  </container>
</template>
