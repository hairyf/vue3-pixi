<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Circle, Graphics } from 'pixi.js'
import type { AssetsResolvers } from 'vue3-pixi-renderer'
import { Assets } from 'vue3-pixi-renderer'
import { TransitionPresets, useElementHover, useTransition } from '@vueuse/core'

const resolves: AssetsResolvers = {
  cursor: import('../assets/cursor.png'),
}

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

function progress(p: number) {
  console.log(p)
}
</script>

<template>
  <container>
    <Assets :resolves="resolves" @progress="progress">
      <template #default="{ textures }">
        <sprite
          ref="el"
          :texture="textures.cursor"
          :hit-area="hitArea"
          :scale="scaleAnimated"
          :anchor="0.5"
          event-mode="static"
          tint="orange"
        />
        <Graphics @draw="drawOutline" />
      </template>
      <template #fallback>
        <!-- loading... -->
      </template>
    </Assets>
  </container>
</template>
