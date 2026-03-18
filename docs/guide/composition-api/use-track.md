# useTrack

Returns a reactive, writable ref that tracks a property on a PixiJS instance. Useful for observing properties that are updated outside of Vue (e.g. by a physics engine).

```vue
<script lang="ts" setup>
import { ref } from 'vue'
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

## Type Signature

```ts
function useTrack<T, K extends keyof T>(
  target: MaybeRefOrGetter<T>,
  key: K,
  defaultValue?: T[K]
): Ref<T[K]>
```

The first argument can be a ref, a reactive object, or a getter function. The second argument is the property name to track. The optional third argument is a default value used before the target is available.
