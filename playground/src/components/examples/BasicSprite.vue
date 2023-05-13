<script lang="ts" setup>
import { Graphics } from 'pixi.js'
import { ref, watchEffect } from 'vue-demi'
import { tryMountTicker } from 'vue3-pixi-renderer'

const rotation = ref(Math.PI / 2)

const alpha = ref(0.5)

tryMountTicker((delta) => {
  rotation.value += 0.01 * delta
})

function drawRectangle(e: Graphics) {
  e.lineStyle(2, '#674196', 1)
  e.beginFill('#00a3af')
  e.drawRect(0, 0, 164, 164)
}
</script>

<template>
  <sprite
    texture="https://pixijs.io/examples/examples/assets/bunny.png"
    :alpha="alpha"
    :scale="2"
    :anchor="0.5"
    :x="500"
    :y="500"
    @mouseenter="alpha = 1"
    @mouseleave="alpha = 0.5"
  />
  <Graphics :x="200" :y="60" :rotation="0.5" :pivot="0" @draw="drawRectangle" />
</template>

<style lang="scss" scoped></style>
