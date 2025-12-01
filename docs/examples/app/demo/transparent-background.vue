<script lang="ts" setup>
import { ref } from 'vue'
import { Application, onTick, useApplication, useScreen } from 'vue3-pixi'

const app = useApplication()
const screen = useScreen(app)
const rotation = ref(0)

onTick(() => rotation.value += 0.01)
</script>

<template>
  <Application ref="app" :background-alpha="0" :width="100" :height="100">
    <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
      <sprite
        texture="bunny"
        :x="screen.width / 2"
        :y="screen.height / 2"
        :rotation="rotation"
        :anchor="0.5"
      />
    </assets>
  </Application>
</template>
