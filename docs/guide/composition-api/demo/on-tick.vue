<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const text = ref('Delta: 0')

onTick((delta) => {
  text.value = `Delta: ${delta.toFixed(10)}`
})
</script>

<template>
  <text
    :x="150" :y="120"
    :anchor="0.5"
    :style="{ fill: 'white' }"
  >
    {{ text }}
  </text>
</template>
