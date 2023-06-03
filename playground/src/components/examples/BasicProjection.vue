<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const x = ref(0)

onTick(() => {
  x.value += 1
})
</script>

<template>
  <camera-3d
    :focus="400"
    :near="10"
    :far="10000"
    :orthographic="false"
    :x="screen.width / 2"
    :y="screen.height / 2"
  >
    <sprite-3d
      texture="https://pixijs.io/examples/examples/assets/bunny.png"
      :anchor="0.5"
      :width="100"
      :position3d-z="x"
      :height="140"
    />
  </camera-3d>
</template>

