# A guide to common problems and how to solve them

This guide is intended to help you solve the most common issues that you might encounter when using vue3-pixi.

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
import { useApplication, useRenderer, useStage } from 'vue3-pixi'

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
import { useApplication, useScreen } from 'vue3-pixi'

const app = useApplication()
const screen = useScreen(app)
screen.value // defaultRectangle
// ...
```

## PixiJS v8 migration notes

If you are migrating from vue3-pixi with PixiJS v7, here are the key changes:

### onTick callback signature

The `onTick` callback now receives a `Ticker` instance instead of a plain delta number:

```ts
// v7
onTick((delta) => {
  x.value += delta
})

// v8
onTick(({ deltaTime }) => {
  x.value += deltaTime
})
```

### Text constructor

PixiJS v8 uses an options object for the Text constructor:

```ts
// v7
const oldText = new Text('Hello', { fill: 'white' })

// v8
const newText = new Text({ text: 'Hello', style: { fill: 'white' } })
```

### Graphics API

PixiJS v8 uses a chainable API instead of `beginFill`/`endFill`:

```ts
// v7
graphics.beginFill(0xFF0000)
graphics.drawRect(0, 0, 100, 100)
graphics.endFill()

// v8
graphics.rect(0, 0, 100, 100)
graphics.fill(0xFF0000)
```

### @render renamed to @effect

The `@render` event on elements has been renamed to `@effect`:

```html
<!-- v7 -->
<graphics @render="draw" />

<!-- v8 -->
<graphics @effect="draw" />
```

### Application initialization

In v8, the Application is initialized asynchronously via `app.init()`. The `<Application>` component handles this automatically. If creating an application manually:

```ts
const pixiApp = new Application()
await pixiApp.init({ width: 800, height: 600 })
```

### Assets API

The old Loader API has been replaced by the Assets API. Use the `<assets>` component with `alias`/`entry` props:

```html
<assets alias="mySprite" entry="/assets/sprite.png" @loaded="onLoaded">
  <sprite texture="mySprite" />
</assets>
```
