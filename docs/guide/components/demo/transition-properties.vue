<script lang="ts" setup>
import type { Graphics as GraphicsIns } from 'pixi.js'
import { ref } from 'vue'
import { External } from 'vue3-pixi'

function onDrawRounded(e: GraphicsIns) {
  e.roundRect(0, 0, 60, 60, 10)
  e.fill('#00a3af')
}

const show = ref(true)
</script>

<template>
  <AnimatedTransition
    :duration="{ enter: 600, leave: 700 }"
    :before-enter="{ alpha: 0, scaleX: 0.25, scaleY: 0.25 }"
    :enter="{ alpha: 1, scaleX: 1, scaleY: 1 }"
    :leave="[
      { x: 300 },
      { delay: 500, alpha: 0 },
    ]"
  >
    <graphics v-if="show" :scale="1" :pivot="30" :x="120" :y="120" @effect="onDrawRounded" />
  </AnimatedTransition>
  <External class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </External>
</template>
