# onTick

Use `onTick` to add a callback to the application's ticker. It will automatically remove itself on unmount.

<demo src="./demo/on-tick.vue" :width="300" />

## Usage

In PixiJS v8, the ticker callback receives a [Ticker](https://pixijs.download/release/docs/ticker.Ticker.html) instance. Use `ticker.deltaTime` to get the frame delta:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const x = ref(0)

onTick((ticker) => {
  x.value += ticker.deltaTime
})
</script>
```

You can also destructure `deltaTime` directly:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const x = ref(0)

onTick(({ deltaTime }) => {
  x.value += deltaTime
})
</script>
```

## Cleanup

`onTick` returns a `remove` function you can call to manually stop the ticker callback before the component unmounts:

```ts
const remove = onTick(({ deltaTime }) => {
  // ...
})

// Later, stop the ticker callback manually
remove()
```
