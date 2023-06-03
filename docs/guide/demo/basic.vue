<script setup>
import { Application } from 'vue3-pixi'
</script>

<template>
  <Application :width="300" :height="300">
    <text :anchor="0.5" :x="150" :y="150" :style="{ fill: 'white' }">
      Hello World
    </text>
  </Application>
</template>
