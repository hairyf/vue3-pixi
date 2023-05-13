<script lang="ts" setup>
import { Stage } from 'vue3-pixi-renderer'
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

const resolution = window.devicePixelRatio || 1
const { width, height } = useWindowSize()
</script>

<template>
  <div class="warp">
    <Stage
      class="full"
      background="#fff"
      :width="width"
      :height="height"
      :resolution="resolution"
      :background-alpha="0"
    >
      <Game />
    </Stage>
  </div>
</template>

<style>
.warp {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.full {
  width: 100%;
  height: 100%;
}
</style>
