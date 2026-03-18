<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const element = ref<HTMLTextAreaElement>()
const rotation = ref(0)

const width = 200
const height = 100

onMounted(() => {
  const textarea = document.createElement('textarea')
  textarea.value = 'Type here...'
  textarea.style.width = `${width}px`
  textarea.style.height = `${height}px`
  textarea.style.fontSize = '16px'
  textarea.style.padding = '8px'
  textarea.style.borderRadius = '8px'
  textarea.style.border = '2px solid #888'
  textarea.style.resize = 'none'
  element.value = textarea
})

onTick(({ deltaTime }) => rotation.value += 0.01 * deltaTime)
</script>

<template>
  <dom-container
    v-if="element"
    :element="element"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :pivot="{ x: width / 2, y: height / 2 }"
    :rotation="rotation"
  />
</template>
