# SimplePlane (Removed)

::: warning Deprecated
`<simple-plane>` has been removed in vue3-pixi v1.0.0 (PixiJS v8). Use [`<mesh-plane>`](/guide/elements/mesh-plane) instead, or `<mesh>` with a `PlaneGeometry` for advanced use cases.
:::

## Migration

```vue
<script setup>
import { PlaneGeometry } from 'pixi.js'

const geometry = new PlaneGeometry({
  width: 100,
  height: 100,
  verticesX: 10,
  verticesY: 10,
})
</script>

<template>
  <mesh :geometry="geometry" :texture="texture" />
</template>
```

See the [Migration Guide](/guide/migration) for all v7 to v8 changes.
