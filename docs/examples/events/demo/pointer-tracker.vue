<script lang="ts" setup>
import type { FederatedPointerEvent } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { reactive } from 'vue'
import { onReady, useStage } from 'vue3-pixi'

const stageRef = useStage()
const position = reactive({ x: 0, y: 0 })

onReady((app) => {
  // Enable interactivity!
  app.stage.eventMode = 'static'
  // Make sure the whole canvas area is interactive, not just the circle.
  app.stage.hitArea = app.screen
  position.x = app.screen.width / 2
  position.y = app.screen.height / 2
})

function onPointerEvent(event: FederatedPointerEvent) {
  Object.assign(position, event.global)
}

useEventListener(stageRef, 'pointermove', onPointerEvent)
</script>

<template>
  <graphics
    :position="position"
    @effect="graphics => graphics
      .beginFill(0xFFFFFF)
      .lineStyle({ color: 0x111111, alpha: 0.87, width: 1 })
      .drawCircle(0, 0, 8)
      .endFill()"
  />
</template>
