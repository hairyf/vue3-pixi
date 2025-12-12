<script lang="ts" setup>
import { ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
const entry = ref<'flowerTop' | 'eggHead'>('flowerTop')
</script>

<template>
  <assets
    :background="true"
    :autoload="false"
    :entry="[
      { alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' },
      { alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' },
    ]"
  >
    <assets v-slot="{ data }" :entry="entry">
      <sprite
        :texture="data"
        :x="screen.width / 2"
        :y="screen.height / 2"
        :anchor="0.5"
        @click="entry = entry === 'flowerTop'
          ? 'eggHead'
          : 'flowerTop'"
      />
    </assets>
  </assets>
</template>
