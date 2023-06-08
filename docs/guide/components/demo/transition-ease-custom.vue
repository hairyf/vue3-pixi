<script lang="ts" setup>
import { EasePresets, External, PTransition } from 'vue3-pixi'
import type { Graphics as GraphicsIns } from 'pixi.js'
import { ref } from 'vue'

function onDrawRounded(e: GraphicsIns) {
  e.beginFill('#00a3af')
  e.drawRoundedRect(0, 0, 60, 60, 10)
}

// custom ease function
function easeOutElastic(n: number) {
  return n === 0
    ? 0
    : n === 1
      ? 1
      : 2 ** (-10 * n) * Math.sin((n * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
}

const show = ref(true)
</script>

<template>
  <p-transition
    :before-enter="{ alpha: 0, scaleX: 0.25, scaleY: 0.25 }"
    :enter="{ ease: EasePresets.easeInCubic, alpha: 1, scaleX: 1, scaleY: 1 }"
    :leave="[
      { ease: easeOutElastic, x: 300 },
      { delay: 500, alpha: 0 },
    ]"
  >
    <graphics v-if="show" :scale="1" :pivot="30" :x="120" :y="120" @render="onDrawRounded" />
  </p-transition>
  <external class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </external>
</template>
