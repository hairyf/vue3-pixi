<script setup>
import { Application } from 'vue3-pixi'
</script>

<template>
  <Application :width="240" :height="240">
    <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
      Hello World
    </text>
  </Application>
</template>
