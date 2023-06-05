<script lang="ts" setup>
import type { FederatedPointerEvent } from 'pixi.js'
import { Circle } from 'pixi.js'
import { reactive, ref, useModel } from 'vue'

const props = withDefaults(
  defineProps<{
    x?: number
    y?: number
    screenWidth?: number
    screenHeight?: number
  }>(),
  {
    x: 120,
    y: 120,
    screenHeight: 240,
    screenWidth: 240,
  },
)
const x = useModel(props, 'x', { local: true })
const y = useModel(props, 'y', { local: true })

const dragging = ref(false)
const offset = reactive({ x: 0, y: 0 })
const size = 50

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

function handleDragStart({ global }: FederatedPointerEvent) {
  dragging.value = true
  Object.assign(offset, {
    x: global.x - x.value,
    y: global.y - y.value,
  })
}
function handleDragEnd() {
  dragging.value = false
}
function handleDragMove({ global }: FederatedPointerEvent) {
  if (dragging.value) {
    x.value = clamp(global.x - offset.x, size, props.screenWidth - size)
    y.value = clamp(global.y - offset.y, size, props.screenHeight - size)
  }
}
</script>

<template>
  <graphics
    :x="x"
    :y="y"
    :hit-area="new Circle(0, 0, size)"
    @pointerdown="handleDragStart"
    @pointerup="handleDragEnd"
    @pointerupoutside="handleDragEnd"
    @mousemove="handleDragMove"
    @render="graphics => {
      graphics.clear()
        .beginFill(0xDE3249)
        .drawCircle(0, 0, size)
        .endFill()
    }"
  />
</template>

