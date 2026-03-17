# useScreen

Returns a reactive `Ref<Rectangle>` for the application's `screen` property. It automatically updates when the canvas is resized.

```vue
<script setup lang="ts">
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

// In script, access via .value
// screen.value.width, screen.value.height
</script>

<template>
  <!-- In template, auto-unwrapped -->
  <sprite :x="screen.width / 2" :texture="textures.flowerTop" />
</template>
```

## Type Signature

```ts
function useScreen(app?: Ref<Application>): Ref<Rectangle>
```

You can optionally pass an existing `Ref<Application>` to derive the screen from it. If the application is not yet available, `useScreen` returns a default empty `Rectangle` so screen-related calculations won't throw errors.
