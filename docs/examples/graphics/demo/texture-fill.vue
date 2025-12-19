<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { GraphicsContext } from 'pixi.js'
import { computed, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const pandaTexture = ref<Texture>()

const pandasContext = computed(() => {
  if (!pandaTexture.value)
    return undefined

  return new GraphicsContext()
    .circle(0, 0, 120)
    .fill('green')
    .texture(
      pandaTexture.value,
      0xFFFFFF,
      -pandaTexture.value.width / 2,
      -pandaTexture.value.height / 2,
    )
    // add a baby purple panda
    .translate(100, 100)
    .scale(0.4)
    .texture(pandaTexture.value, 'yellow')
})
</script>

<template>
  <assets
    entry="https://pixijs.com/assets/panda.png"
    @loaded="(texture) => pandaTexture = texture"
  >
    <graphics
      :context="pandasContext"
      :x="screen.width / 2"
      :y="screen.height / 2"
    />
    <graphics
      :context="pandasContext"
      :x="screen.width / 2 - 200"
      :y="screen.height / 2 - 200"
      :rotation="0.5"
    />
  </assets>
</template>
