<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const dudeBlur = ref(0)
const mobyBlur = ref(0)

let count = 0

onTick(() => {
  count += 0.005

  const dudeBlurAmount = Math.cos(count)
  const mobyBlurAmount = Math.sin(count)

  dudeBlur.value = 20 * (dudeBlurAmount)
  mobyBlur.value = 20 * (mobyBlurAmount)
})
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg_depth_blur', src: 'https://pixijs.com/assets/pixi-filters/bg_depth_blur.jpg' },
      { alias: 'depth_blur_dudes', src: 'https://pixijs.com/assets/pixi-filters/depth_blur_dudes.jpg' },
      { alias: 'depth_blur_moby', src: 'https://pixijs.com/assets/pixi-filters/depth_blur_moby.jpg' },
    ]"
  >
    <sprite :width="screen.width" :height="screen.height" texture="bg_depth_blur" />
    <sprite :x="(screen.width / 2) - 315" :y="200" texture="depth_blur_dudes">
      <blur-filter :blur="dudeBlur" />
    </sprite>
    <sprite :x="(screen.width / 2) - 200" :y="100" texture="depth_blur_moby">
      <blur-filter :blur="mobyBlur" />
    </sprite>
  </assets>
</template>
