<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Application } from 'vue3-pixi'

const appRef = ref<Application>()

onMounted(() => {
  appRef.value?.app.start()
})
</script>

<template>
  <Application ref="appRef" :width="240" :height="240" :auto-start="false">
    <text :x="120" :y="200" :style="{ fill: 'white' }" :anchor="0.5">
      Click and drag
    </text>
    <draggable-circle />
  </Application>
</template>
