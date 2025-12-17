<script lang="ts" setup>
import { computed, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const element = document.createElement('textarea')
element.value = 'Type here...'

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))

const rotation = ref(0)

onTick(({ deltaTime }) => rotation.value += 0.01 * deltaTime)
</script>

<template>
  <dom-container
    :element="element"
    :anchor="0.5"
    :x="center.x"
    :y="center.y"
    :rotation="rotation"
  />
</template>
