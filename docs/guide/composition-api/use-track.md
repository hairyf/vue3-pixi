# useTrack

Return a responsive writable store updated during low-priority, which is useful for observing properties on PixiJS instances that are updated outside of the component, such as physical systems.

```vue
<script lang="ts" setup>
import { useTrack } from 'vue3-pixi'
const containerRef = ref()

const x = useTrack(containerRef, 'x', 0)
const y = useTrack(containerRef, 'y', 0)

const scaleX = useTrack(() => containerRef.value?.scale, 'x', 0)
const scaleY = useTrack(() => containerRef.value?.scale, 'y', 0)
</script>

<template>
  <container ref="containerRef" :x="x" :y="y">
    <!-- ... -->
  </container>
</template>

```