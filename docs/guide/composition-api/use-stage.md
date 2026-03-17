# useStage

Returns a `Ref<Container>` for the parent application's [stage](https://pixijs.download/release/docs/app.Application.html#stage) Container.

```vue
<script setup lang="ts">
import { useStage } from 'vue3-pixi'

const stage = useStage()

// stage.value is the root Container of the application
</script>
```

## Type Signature

```ts
function useStage(app?: Ref<Application>): Ref<Stage>
```

You can optionally pass an existing `Ref<Application>` to derive the stage from it.
