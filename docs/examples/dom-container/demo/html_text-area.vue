<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const element = ref<HTMLTextAreaElement>()
const rotation = ref(0)

onMounted(() => {
  const textarea = document.createElement('textarea')
  textarea.value = 'Type here...'
  textarea.style.width = '200px'
  textarea.style.height = '100px'
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
  <container :x="screen.width / 2" :y="screen.height / 2">
    <dom-container
      v-if="element"
      :element="element"
      :anchor="0.5"
      :rotation="rotation"
    />
  </container>
</template>
