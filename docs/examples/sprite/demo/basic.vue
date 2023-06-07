<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const rotation = ref(0)

onTick(() => rotation.value += 0.01)
</script>

<template>
  <sprite
    texture="https://beta.pixijs.com/assets/bunny.png"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :rotation="rotation"
    :anchor="0.5"
  />
</template>

