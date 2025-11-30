<script lang="ts" setup>
import type { Graphics } from 'pixi.js'
import { computed, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const starMaskRef = ref<Graphics>()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))
</script>

<template>
  <graphics
    :position="center"
    :pivot="200"
    @effect="graphics => {
      graphics.rect(0, 0, 400, 400).fill('red')
      starMaskRef && graphics.setMask({ mask: starMaskRef, inverse: true })
    }"
  />
  <graphics
    ref="starMaskRef"
    :position="center"
    :pivot="160"
    :width="240"
    :height="240"
    @effect="graphics => graphics.star(160, 160, 5, 100).fill('yellow')"
  />
</template>
