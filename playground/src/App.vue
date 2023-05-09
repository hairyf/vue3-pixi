<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import BasicText from './components/BasicText.vue'
// import Basic from './components/Basic.vue'
// import AllGraphics from './components/AllGraphics.vue'
// import CursorSprite from './components/CursorSprite.vue'
import BasicSprite from './components/BasicSprite.vue'
// import CursorSprite from './components/CursorSprite.vue'

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
      <template v-if="enabled">
        <BasicText />
      </template>
    </Stage>
  </div>
</template>
