<script setup>
import { Loader } from 'vue3-pixi'
</script>

<template>
  <Loader :resources="[['desyrel', '/assets/desyrel.xml']]">
    <bitmap-text
      :x="220"
      :y="120"
      :anchor="0.5"
      :style="{ fontName: 'Desyrel', fontSize: 48, align: 'center' }"
    >
      the fox jumps over\nthe lazy dog
    </bitmap-text>
  </Loader>
</template>
