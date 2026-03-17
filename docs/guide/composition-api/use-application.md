# useApplication

Returns a `Ref<Application>` to the current PixiJS [Application](https://pixijs.download/release/docs/app.Application.html) instance.

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { useApplication } from 'vue3-pixi'

const app = useApplication()

onMounted(() => {
  // Access the application instance via .value
  app.value.renderer.background.color = 0x061639
})
</script>
```

::: warning
`app.value` may be `undefined` until the `<Application>` component has mounted. Always access it inside `onMounted` or use a watcher.
:::

## Type Signature

```ts
function useApplication<T = Application>(): Ref<T>
```
