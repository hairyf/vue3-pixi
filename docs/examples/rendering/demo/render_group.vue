<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()

const worldContainerRef = ref()
const worldSize = 5000
const treeCount = 1000 // Reduced from 100k for browser performance

const trees = Array.from({ length: treeCount }, () => ({
  x: Math.random() * worldSize,
  y: Math.random() * worldSize,
})).sort((a, b) => a.y - b.y)

let mouseX = 0
let mouseY = 0

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

onTick(() => {
  if (!worldContainerRef.value || !app.value)
    return

  const screenWidth = app.value.renderer.width
  const screenHeight = app.value.renderer.height

  const targetX = (mouseX / screenWidth) * (worldSize - screenWidth)
  const targetY = (mouseY / screenHeight) * (worldSize - screenHeight)

  worldContainerRef.value.x += (-targetX - worldContainerRef.value.x) * 0.1
  worldContainerRef.value.y += (-targetY - worldContainerRef.value.y) * 0.1
})
</script>

<template>
  <assets alias="tree" entry="https://pixijs.com/assets/tree.png">
    <container ref="worldContainerRef" :is-render-group="true">
      <sprite
        v-for="(tree, i) in trees"
        :key="i"
        texture="tree"
        :x="tree.x"
        :y="tree.y"
        :scale="0.25"
        :anchor="0.5"
      />
    </container>
  </assets>
</template>
