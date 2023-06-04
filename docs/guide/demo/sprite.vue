<script setup>
import { Application } from 'vue3-pixi'
</script>

<template>
  <Application :width="240" :height="240">
    <sprite
      texture="/assets/food/lemonpie.png"
      :anchor="0.5"
      :x="120"
      :y="120"
    />
  </Application>
</template>
