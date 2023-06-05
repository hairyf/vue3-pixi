# useApplication

Returns the context of the parent [Application](https://svelte-pixi.com/docs/components/application) component

```ts
import { useApplication } from 'vue3-pixi'

const app = useApplication()
```

## Type Declarations

```ts
import type { Ref } from 'vue'
export function useApplication(): Ref<Application>
```