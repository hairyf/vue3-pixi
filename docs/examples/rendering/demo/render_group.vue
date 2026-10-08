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

const clientMouse = { x: 0, y: 0 }
const mouse = { x: 0, y: 0 }

function onMouseMove(e: MouseEvent) {
  clientMouse.x = e.clientX
  clientMouse.y = e.clientY
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

  app.value.renderer.events.mapPositionToPoint(mouse, clientMouse.x, clientMouse.y)
  const { width: screenWidth, height: screenHeight } = app.value.screen
  if (screenWidth <= 0 || screenHeight <= 0 || !Number.isFinite(mouse.x) || !Number.isFinite(mouse.y))
    return

  const targetX = Math.max(0, Math.min(1, mouse.x / screenWidth)) * Math.max(0, worldSize - screenWidth)
  const targetY = Math.max(0, Math.min(1, mouse.y / screenHeight)) * Math.max(0, worldSize - screenHeight)

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
