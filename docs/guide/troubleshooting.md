# A guide to common problems and how to solve them

This guide is intended to help you solve the most common issues that you might encounter when using Vue3 PIXI.

## Composition API failure

The Composition API of vue3-pixi is based on dependency injection. If you use the Composition API in a component at the same level as `<Application />`, you will receive the following warning:

![](https://pic.imgdb.cn/item/6592ba28c458853aefc26d55.jpg)

You can resolve this by binding a ref at the same level and providing it to the Composition API you are using in the component at the same level:

```vue
<script lang="ts" setup>
import { Application, useApplication, useRenderer, useScreen, useStage } from 'vue3-pixi'

const app = useApplication()
const screen = useScreen(app)
const renderer = useRenderer(app)
const stage = useStage(app)
</script>

<template>
  <Application ref="app">
    <!-- ... -->
  </Application>
</template>
```

Note that if you use this approach, you cannot immediately access `app`. You need to use it within `onMounted`, similar to the characteristics of ref:

```ts
import { Application, useApplication } from 'vue3-pixi'
const app = useApplication()
const renderer = useRenderer(app)
const stage = useStage(app)

console.log(app.value) // undefined
console.log(stage.value) // undefined
console.log(renderer.value) // undefined
// ...
```

While `useScreen` will create a default empty rectangle if Application is not obtained, so you don't need to worry about screen-related calculations when using ref:

```ts
import { useScreen } from 'vue3-pixi'
const screen = useScreen(app)
screen.value // defaultRectangle
// ...
```
