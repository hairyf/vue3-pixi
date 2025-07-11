<script setup>
import { Application, Assets } from 'vue3-pixi'
</script>

<template>
  <Application :width="240" :height="240">
    <Assets entry="/assets/food/lemonpie.png" #="{data}">
      <sprite
        :texture="data"
        :anchor="0.5"
        :x="120"
        :y="120"
      />
    </Assets>
  </Application>
</template>
