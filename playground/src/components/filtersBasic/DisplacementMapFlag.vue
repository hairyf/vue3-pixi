<script lang="ts" setup>
import { Texture, WRAP_MODES } from 'pixi.js'
import { reactive, ref } from 'vue'
import { onTick } from 'vue3-pixi'

const position = reactive({ x: 100, y: 100 })
const spriteRef = ref()

const texture = Texture.from('https://beta.pixijs.com/assets/pixi-filters/displace.png', {
  wrapMode: WRAP_MODES.REPEAT,
})
onTick(() => {
  position.x += 1
})
</script>

<template>
  <sprite ref="spriteRef" :texture="texture" :position="position" :anchor="0.5" />
  <sprite :x="100" :y="100" texture="https://beta.pixijs.com/assets/pixi-filters/flag.png">
    <displacement-filter v-if="spriteRef" :sprite="spriteRef" :padding="10" :scale="[30, 60]" />
  </sprite>
</template>

<style lang="scss" scoped></style>
