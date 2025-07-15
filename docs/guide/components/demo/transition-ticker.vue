<script lang="ts" setup>
import type { Text } from 'pixi.js'
import { ref } from 'vue'
import { External } from 'vue3-pixi'

function typewriter(el: Text) {
  const speed = 2
  const text = el.text
  const duration = text.length / (speed * 0.01)
  function tick(t: number) {
    const i = ~~(text.length * t)
    el.text = text.slice(0, i)
  }
  return {
    duration,
    tick,
  }
}

const show = ref(true)
</script>

<template>
  <AnimatedTransition
    :enter="typewriter"
    :leave="typewriter"
  >
    <text v-if="show" :x="40" :y="120" :style="{ fill: '#fff', fontSize: '16px' }">
      The quick brown fox jumps over the lazy dog
    </text>
  </AnimatedTransition>
  <External class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </External>
</template>
