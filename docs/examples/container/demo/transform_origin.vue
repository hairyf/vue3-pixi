<script lang="ts" setup>
import type { Container } from 'pixi.js'
import { Point } from 'pixi.js'
import { reactive, ref } from 'vue'
import { onTick } from 'vue3-pixi'

const rectWidth = 150
const rectHeight = 100

const origin = reactive(new Point(rectWidth / 2, rectHeight / 2))
const useOrigin = ref(true)
const rotation = ref(0)

onTick(({ deltaTime }) => rotation.value += 0.01 * deltaTime)
</script>

<template>
  <container
    :position="100"
    :rotation="rotation"
    @effect="container => {
      if (useOrigin) {
        container.origin.copyFrom(origin);
        container.pivot.set(0, 0);
      }
      else {
        container.pivot.copyFrom(origin);
        container.origin.set(0, 0);
      }
    }"
  >
    <!-- Create a rectangle -->
    <graphics
      @effect="g => {
        g.rect(0, 0, rectWidth, rectHeight)
        g.fill(0x3498DB)
        g.stroke({ width: 4, color: 'black' });
      }"
    />
    <!-- Crosshair to show origin -->
    <graphics
      @effect="g => {
        g.moveTo(-10, 0)
        g.lineTo(10, 0)
        g.moveTo(0, -10)
        g.lineTo(0, 10)
        g.stroke({ width: 4, color: 0xFF0000 });
        g.position.copyFrom(origin)
      }"
    />
  </container>
  <!-- Position marker to show container position -->
  <graphics
    :position="100"
    @effect="g => {
      g.circle(0, 0, 8)
      g.fill('red')
      g.circle(0, 0, 3)
      g.fill(0xFFFFFF);
    }"
  />
  <external tag="div" class="absolute z-10 top-20px right-20px px-10px  py-20px bg-white rounded-md">
    <h3 class="text-center mt-0! mb-2!">
      Adjust Origin/Pivot
    </h3>
    <label>
      <input v-model="useOrigin" type="checkbox">
      Use Origin (unchecked = Pivot)
    </label>
    <br>
    <br>
    <label>
      X: <input v-model="origin.x" type="range" min="0" :max="rectWidth" step="5">
    </label>
    <br>
    <label>
      Y: <input v-model="origin.y" type="range" min="0" :max="rectWidth" step="5">
    </label>
    <br>
    <button
      class="border-solid border-1px border-gray rounded-md px-1"
      @click="() => {
        origin.set(rectWidth / 2, rectHeight / 2)
        useOrigin = true
        rotation = 0
      }"
    >
      Reset
    </button>
  </external>
</template>
