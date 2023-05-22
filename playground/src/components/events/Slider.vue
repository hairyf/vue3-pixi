<script lang="ts" setup>
import type { FederatedPointerEvent } from 'pixi.js'
import { computed, reactive, ref } from 'vue'
import { onReady, useScreen, useStage } from 'vue3-pixi'

const screen = useScreen()
const stage = useStage()

const sliderWidth = computed(() => screen.value.width * 0.55)

const sliderRef = ref()
const scale = ref(3)
const position = reactive({ x: 0, y: 2 })

onReady((app) => {
  app.stage.eventMode = 'static'
  // Make sure stage covers the whole scene
  app.stage.hitArea = app.screen
  position.x = sliderWidth.value / 2
})

function onDragStart() {
  stage.value!.addEventListener('pointermove', onDrag)
}

// Update the handle's position & bunny's scale when the handle is moved.
function onDrag(e: FederatedPointerEvent) {
  const halfHandleWidth = 4
  // Set hand le y-position to match pointer, clamped to (4, screen.height - 4).

  position.x = Math.max(halfHandleWidth, Math.min(
    sliderRef.value!.toLocal(e.global).x,
    sliderWidth.value - halfHandleWidth,
  ))

  // Normalize handle position between -1 and 1.
  const t = 2 * ((position.x / sliderWidth.value) - 0.5)

  scale.value = 3 * (1.1 + t)
}

// Stop dragging feedback once the handle is released.
function onDragEnd() {
  stage.value!.removeEventListener('pointermove', onDrag)
}
</script>

<template>
  <text
    :x="screen.width / 2"
    :y="40"
    :anchor="0.5"
    :style="{ fill: '#272d37', fontFamily: 'Roboto', fontSize: 20, align: 'center' }"
  >
    Drag the handle to change the scale of bunny.
  </text>
  <!-- Make the slider -->
  <graphics
    ref="sliderRef"
    :x="(screen.width - sliderWidth) / 2"
    :y="screen.height * 0.75"
    @draw="$event.beginFill(0x272D37).drawRect(0, 0, sliderWidth, 4)"
  >
    <!-- Draw the handle -->
    <graphics
      cursor="pointer"
      :position="position"
      :point="4"
      @draw="$event.beginFill(0xFFFFFF) .drawCircle(0, 0, 8)"
      @pointerdown="onDragStart"
      @pointerup="onDragEnd"
      @pointerupoutside="onDragEnd"
    />
  </graphics>

  <!-- Add bunny whose scale can be changed by user using slider -->
  <sprite
    texture="https://beta.pixijs.com/assets/bunny.png"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :scale="scale"
    anchor="0.5"
  />
</template>

