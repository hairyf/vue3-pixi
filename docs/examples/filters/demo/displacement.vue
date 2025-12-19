<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { onReady, onTick } from 'vue3-pixi'

const displacementSpriteRef = ref()
const position = reactive({ x: 100, y: 100 })


// 初始化应用
onReady((app) => {
  app.stage.eventMode = 'static'
})

onTick(() => {
  if (!displacementSpriteRef.value)
    return

    // Offset the sprite position to make vFilterCoord update to larger value.
    // Repeat wrapping makes sure there's still pixels on the coordinates.
  displacementSpriteRef.value.x++

   // Reset x to 0 when it's over width to keep values from going to very huge numbers.
  if (displacementSpriteRef.value.x > displacementSpriteRef.value.width) {
    displacementSpriteRef.value.x = 0
  }
})
</script>

<template>
  <assets
    :entry="[
      { alias: 'flag', src: 'https://pixijs.com/assets/pixi-filters/flag.png' },
      { alias: 'displacement_map_repeat', src: 'https://pixijs.com/assets/pixi-filters/displacement_map_repeat.jpg' },
    ]"
    @loaded="textures => {
      // Make sure the sprite is wrapping.
      textures.displacement_map_repeat.baseTexture.wrapMode = 'repeat'
    }"
  >
    <container>
      <sprite :position="position"  texture="flag">
        <displacement-filter
          v-if="displacementSpriteRef"
          :sprite="displacementSpriteRef"
          :scale="{ x: 60, y: 120 }"
        />
      </sprite>

      <sprite
        ref="displacementSpriteRef"
        texture="displacement_map_repeat"
        :position="position"
      />
    </container>
  </assets>
</template>
