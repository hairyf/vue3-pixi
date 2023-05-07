<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import CursorSprite from './components/CursorSprite.vue'

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
    <Stage :style="{ width: `${width / 2}px` }" :width="width - 80" :height="height">
      <CursorSprite v-if="enabled" :x="100" :y="100" />
    </Stage>
  </div>
</template>
