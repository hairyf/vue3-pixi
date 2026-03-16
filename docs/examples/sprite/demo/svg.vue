<script lang="ts" setup>
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const rotation = ref(0)
const scale = ref(1)
const pivotX = ref(0)
const pivotY = ref(0)

onTick(() => {
  rotation.value += 0.01
  scale.value = 2 + Math.sin(rotation.value)
})

function onSpriteEffect(sprite: any) {
  const bounds = sprite.getLocalBounds()
  pivotX.value = (bounds.x + bounds.width) / 2
  pivotY.value = (bounds.y + bounds.height) / 2
}
</script>

<template>
  <assets entry="https://pixijs.com/assets/tiger.svg" alias="tiger">
    <sprite
      texture="tiger"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :pivot-x="pivotX"
      :pivot-y="pivotY"
      :rotation="rotation"
      :scale="scale"
      @effect="onSpriteEffect"
    />
  </assets>
</template>
