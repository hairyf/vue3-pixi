<script lang="ts" setup>
import { SimplePlane, Ticker } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const ticker = new Ticker()
const simplePlaneRef = ref<SimplePlane>()

onMounted(() => {
  const plane = simplePlaneRef.value!
  // Get the buffer for vertice positions.
  const buffer = plane.geometry.getBuffer('aVertexPosition')

  // Listen for animate update
  let timer = 0

  ticker.add(() => {
    // Randomize the vertice positions a bit to create movement.
    for (let i = 0; i < buffer.data.length; i++)
      buffer.data[i] += Math.sin((timer / 10) + i) * 0.5
    buffer.update()
    timer++
  })

  ticker.start()
})

onBeforeUnmount(() => ticker.destroy())
</script>

<template>
  <SimplePlane
    ref="simplePlaneRef"
    texture="https://beta.pixijs.com/assets/bg_grass.jpg"
    :vertices-x="10"
    :vertices-y="10"
    :x="100"
    :y="100"
  />
</template>

