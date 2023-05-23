<script lang="ts" setup>
import { ref } from 'vue'
import { tryMountTicker, useScreen } from 'vue3-pixi'

const screen = useScreen()

const dudeBlur = ref(0)
const mobyBlur = ref(0)

let count = 0

tryMountTicker(() => {
  count += 0.005

  const dudeBlurAmount = Math.cos(count)
  const mobyBlurAmount = Math.sin(count)

  dudeBlur.value = 20 * (dudeBlurAmount)
  mobyBlur.value = 20 * (mobyBlurAmount)
})
</script>

<template>
  <sprite :width="screen.width" :height="screen.height" texture="https://beta.pixijs.com/assets/pixi-filters/bg_depth_blur.jpg" />
  <sprite :x="(screen.width / 2) - 315" :y="200" texture="https://beta.pixijs.com/assets/pixi-filters/depth_blur_dudes.jpg">
    <blur-filter :blur="dudeBlur" />
  </sprite>
  <sprite :x="(screen.width / 2) - 200" :y="100" texture="https://beta.pixijs.com/assets/pixi-filters/depth_blur_moby.jpg">
    <blur-filter :blur="mobyBlur" />
  </sprite>
</template>

