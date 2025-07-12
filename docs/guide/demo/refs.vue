<script lang="ts" setup>
import type { Text } from 'pixi.js'
import { onMounted, ref } from 'vue'

const textRef = ref<Text>()
onMounted(() => {
  textRef.value!.style.fill = 'yellow'
})
</script>

<template>
  <text ref="textRef" :anchor="0.5" :x="120" :y="120">
    Hello World
  </text>
</template>
