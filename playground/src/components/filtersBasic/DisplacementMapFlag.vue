<script lang="ts" setup>
import { Texture, WRAP_MODES } from 'pixi.js'
import { reactive, ref } from 'vue'

const position = reactive({ x: 100, y: 100 })
const scale = reactive({ x: 30, y: 60 })
const spriteRef = ref()

const texture = Texture.from('https://beta.pixijs.com/assets/pixi-filters/displace.png', {
  wrapMode: WRAP_MODES.REPEAT,
})
</script>

<template>
  <container>
    <sprite ref="spriteRef" :texture="texture" :position="position" :anchor="0.5" />
    <sprite :x="100" :y="100" texture="https://beta.pixijs.com/assets/pixi-filters/flag.png" />
    <displacement-filter v-if="spriteRef" :sprite="spriteRef" :padding="10" :scale="scale" />
  </container>
</template>

<style lang="scss" scoped></style>
