<script lang="ts" setup>
import { computed } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
}))
</script>

<template>
  <!-- Application :background-alpha="0" -->
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <sprite
      texture="bunny"
      :position="center"
      :anchor="0.5"
      @render="sprite => sprite.rotation += 0.01"
    />
  </assets>
</template>
