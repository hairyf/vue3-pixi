<script lang="ts" setup>
import type { Graphics as GraphicsIns } from 'pixi.js'
import { ref } from 'vue'
import { EasePresets, External } from 'vue3-pixi'

function onDrawRounded(e: GraphicsIns) {
  e.roundRect(0, 0, 60, 60, 10)
  e.fill('#00a3af')
}

const show = ref(true)
</script>

<template>
  <AnimatedTransition
    :before-enter="{ x: 20 }"
    :enter="{ ease: [0, 1.89, .02, 2.01], x: 120 }"
    :leave="[
      { ease: EasePresets.easeInQuart, x: 300 },
      { delay: 1000, alpha: 0 },
    ]"
  >
    <graphics v-if="show" :scale="1" :pivot="30" :x="120" :y="120" @effect="onDrawRounded" />
  </AnimatedTransition>
  <External class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </External>
</template>
