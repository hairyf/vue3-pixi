<script lang="ts" setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import Game from './components/Game.vue'

// import BasicFilter from './components/BasicFilter.vue'
// import BasicMask from './components/BasicMask.vue'
// import BasicText from './components/BasicText.vue'
// import ShockwaveFilter from './components/ShockwaveFilter.vue'
// import Basic from './components/Basic.vue'
// import BasicGraphics from './components/BasicGraphics.vue'
// import CursorSprite from './components/CursorSprite.vue'
// import BasicSprite from './components/BasicSprite.vue'
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
    <Stage
      :style="{ width: `${width / 2}px` }"
      :width="width - 80"
      :height="height"
    >
      <template v-if="enabled">
        <Game />
      </template>
    </Stage>
  </div>
</template>
