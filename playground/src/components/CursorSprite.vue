<script setup lang="ts">
import { computed, ref } from 'vue'
import { BlurFilter, Circle, Graphics } from 'pixi.js'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'

const position = ref({
  y: 60,
  x: 60,
})

const hitArea = new Circle(0, 0, 32)

const spriteRef = ref()

const hovering = useElementHover(spriteRef)

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

function renderBlurFilter(props: any) {
  return new BlurFilter(
    props.strength,
    props.quality,
    props.resolution,
    props.kernelSize,
  )
}

const show = ref(false)
</script>

<template>
  <Container :position-x="position.x">
    <Filter :is="renderBlurFilter" v-if="show" :quality="3" :blur="5" />
    <Sprite
      ref="spriteRef"
      texture="/cursor.png"
      :hit-area="hitArea"
      :scale="scaleAnimated"
      :anchor="0.5"
      event-mode="static"
      tint="orange"
      @click="show = !show"
    />
    <Graphics @draw="drawOutline" />
  </Container>
</template>
