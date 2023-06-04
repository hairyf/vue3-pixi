<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { TextInst } from 'vue3-pixi'

const textRef = ref<TextInst>()
onMounted(() => {
  textRef.value!.style.fill = 'yellow'
})
</script>

<template>
  <text ref="textRef" :anchor="0.5" :x="120" :y="120">
    Hello World
  </text>
</template>
