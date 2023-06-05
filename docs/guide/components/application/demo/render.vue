<script setup>
import { Application } from 'vue3-pixi'
</script>

<template>
  <Application :width="240" :height="240">
    <draggable-circle />
  </Application>
</template>
