<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { StageInst } from 'vue3-pixi-renderer'
import CursorSprite from './components/CursorSprite.vue'

const stageRef = ref<StageInst>()
const enabled = ref(true)
const { width, height } = useWindowSize()
</script>

<template>
  <div>
    <p>
      <button @click="enabled = !enabled">
        Toggle
      </button>

      <span style="margin-left: 10px"> Sprite visible: {{ enabled }} </span>
    </p>
    <Stage ref="stageRef" :style="{ width: `${width / 2}px` }" :width="width - 80" :height="height">
      <CursorSprite v-if="enabled" :x="100" :y="100" />
    </Stage>
  </div>
</template>
