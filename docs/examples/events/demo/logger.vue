<script lang="ts" setup>
import type { FederatedPointerEvent } from 'pixi.js'
import { useEventListener } from '@vueuse/core'
import { ref } from 'vue'
import { onReady, useStage } from 'vue3-pixi'

const stageRef = useStage()
const whiteBoxRef = ref()
const blackBoxRef = ref()
const logs = ref<string[]>([])

function onPointerEvent(event: FederatedPointerEvent) {
  const type = event.type
  const targetName = Reflect.get(event.target, 'name')
  const currentTargetName = Reflect.get(event.currentTarget, 'name')

  // Add event to top of logs
  logs.value.push(`${currentTargetName} received ${type} event (target is ${targetName})`)

  // Prevent logs from growing too long
  if (currentTargetName === 'stage' || ['pointerenter', 'pointerleave'].includes(type))
    logs.value.push('-----------------------------------------', '')

  if (logs.value.length > 30) {
    while (logs.value.length > 30)
      logs.value.shift()
  }
}

onReady((app) => {
  Reflect.set(app.stage, 'name', 'stage')
  // Enable interactivity!
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

for (const r of [stageRef, whiteBoxRef, blackBoxRef]) {
  useEventListener(r, 'pointerenter', onPointerEvent)
  useEventListener(r, 'pointerleave', onPointerEvent)
  useEventListener(r, 'pointerover', onPointerEvent)
  useEventListener(r, 'pointerout', onPointerEvent)
}
</script>

<template>
  <text :x="2" :style="{ fontSize: 14 }">
    Move your mouse slowly over the boxes to\nsee the order of pointerenter, pointerleave,\npointerover, pointerout events on each target!
  </text>
  <text :x="2" :y="80" :style="{ fontSize: 12 }">
    {{ logs.join('\n') }}
  </text>
  <!-- Enable interactivity everywhere! -->
  <graphics
    ref="blackBoxRef"
    :x="300"
    name="black box"
    event-mode="static"
    @effect="$event.beginFill(0).drawRect(0, 50, 300, 300).endFill()"
  >
    <!-- Mount white box inside the white one -->
    <graphics
      ref="whiteBoxRef"
      name="white box"
      event-mode="static"
      @effect="$event.beginFill(0xFFFFFF).drawRect(100, 150, 100, 100).endFill()"
    />
  </graphics>
</template>
