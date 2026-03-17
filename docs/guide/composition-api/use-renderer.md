# useRenderer

Returns a `Ref<Renderer>` for the parent application's [Renderer](https://pixijs.download/release/docs/rendering.Renderer.html).

```vue
<script setup lang="ts">
import { useRenderer } from 'vue3-pixi'

const renderer = useRenderer()

// Access in onMounted or a watcher
// renderer.value.background.color = 0x061639
</script>
```

## Type Signature

```ts
function useRenderer(app?: Ref<Application>): Ref<Renderer>
```

You can optionally pass an existing `Ref<Application>` (e.g. from `useApplication()`) to derive the renderer from it.
