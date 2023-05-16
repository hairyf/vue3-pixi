<script setup lang="ts">
import Pipe from './Pipe.vue'

defineProps<{
  pipes: { x: number; y: number }[]
  offset: number
}>()
</script>

<template>
  <container>
    <Pipe
      v-for="pipe in pipes"
      :key="pipe.x"
      :x="pipe.x - offset"
      :y="pipe.y"
    />
  </container>
</template>
