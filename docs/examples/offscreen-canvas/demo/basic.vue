<script lang="ts" setup>
// Note: OffscreenCanvas requires canvas.transferControlToOffscreen() at init time.
// vue3-pixi manages the Application internally, so true OffscreenCanvas must be done
// imperatively. This example shows the equivalent visual (rotating bunnies) using
// vue3-pixi's declarative approach.
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const rotation = ref(0)

onTick((ticker) => {
  rotation.value -= 0.01 * ticker.deltaTime
})
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <container
      :x="screen.width / 2"
      :y="screen.height / 2"
      :pivot-x="80"
      :pivot-y="80"
      :rotation="rotation"
    >
      <sprite
        v-for="i in 25"
        :key="i"
        texture="bunny"
        :anchor="0.5"
        :x="((i - 1) % 5) * 40"
        :y="Math.floor((i - 1) / 5) * 40"
      />
    </container>
  </assets>
</template>
