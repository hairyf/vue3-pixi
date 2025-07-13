<script lang="ts" setup>
import type { Graphics as GraphicsIns } from 'pixi.js'
import { ref } from 'vue'
import { EasePresets, External, PTransition } from 'vue3-pixi'

function onDrawRounded(e: GraphicsIns) {
  e.beginFill('#00a3af')
  e.drawRoundedRect(0, 0, 60, 60, 10)
}

const show = ref(true)
</script>

<template>
  <PTransition
    :before-enter="{ x: 20 }"
    :enter="{ ease: [0, 1.89, .02, 2.01], x: 120 }"
    :leave="[
      { ease: EasePresets.easeInQuart, x: 300 },
      { delay: 1000, alpha: 0 },
    ]"
  >
    <graphics v-if="show" :scale="1" :pivot="30" :x="120" :y="120" @render="onDrawRounded" />
  </PTransition>
  <External class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </External>
</template>
