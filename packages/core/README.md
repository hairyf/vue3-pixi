<h1 align="center">Vue 3 Pixi Renderer</h1>

<p align="center">
  <strong>Vue createRenderer for PixiJS</strong>
</p>

<br />

<p align="center">
  <img src="https://img.shields.io/github/forks/hairyf/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/github/stars/hairyf/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/pixi-v8+-ff69b4.svg?style=flat-square" alt="pixi version" />
</p>

###### Features

- Lightweight and flexible [Vue 3](https://vuejs.org/) library for creating [PixiJS](https://pixijs.com/) applications.
- Provides a [Custom Vue Renderer](https://vuejs.org/api/custom-renderer.html#custom-renderer-api) that creates PixiJS objects instead of HTML elements.
- Supports all PixiJS objects, such as `Filter`, `Container`, `Sprite`, `Graphics`, `Text`, etc.
- Support specifying `texture` paths in templates to load texture objects.
- All [events](https://pixijs.download/release/docs/scene.Sprite.html) emitted by PixiJS objects are supported.
- Offers [Assets](#assets) component for bundling assets and feature-rich [Composition Utilities](#composables).
- Create different transition effects in conjunction with [@vue-pixi/transition](https://github.com/hairyf/vue3-pixi/tree/main/packages/transition).

## Try it Online

[![StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vue-pixi-renderer)

## Install

```sh
# with pnpm
pnpm add vue3-pixi

# with yarn
yarn add vue3-pixi
```

## Usage

The `<Application>` component can be used to embed a pixi app into an existing vue app.

```html
<script setup lang="ts">
import { Rectangle } from "pixi.js";
import { Application } from "vue3-pixi";
import textureUrl from "@/assets/myTexture.png";

const hitArea = new Rectangle(0, 0, 64, 64);

function onClick() {
  console.log('sprite clicked!');
}
</script>

<template>
  <Application :width="640" :height="480">
    <container>
      <sprite :texture="textureUrl" :hit-area="hitArea" @click="onClick" />
    </container>
  </Application>
</template>
```

## Initialize vue plugin

Add Vue plugin configuration to support custom elements and prevent unknown element warnings.

```ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { compilerOptions } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // remove the unknown element warnings
        compilerOptions,
      },
    }),
  ],
})
```

### Texture paths in templates

The vue3-pixi renderer accepts string paths for texture props and resolves them to Texture objects at runtime via `Texture.from()`:

```html
<sprite texture="/assets/myTexture.png" />
```

## Elements

- [Container](https://pixijs.download/release/docs/scene.Container.html)
- [Sprite](https://pixijs.download/release/docs/scene.Sprite.html)
- [Graphics](https://pixijs.download/release/docs/scene.Graphics.html)
- [Text](https://pixijs.download/release/docs/scene.Text.html)
- [BitmapText](https://pixijs.download/release/docs/scene.BitmapText.html)
- [AnimatedSprite](https://pixijs.download/release/docs/scene.AnimatedSprite.html)
- [Mesh](https://pixijs.download/release/docs/scene.Mesh.html)
- [MeshPlane](https://pixijs.download/release/docs/scene.MeshPlane.html)
- [MeshSimple](https://pixijs.download/release/docs/scene.MeshSimple.html)
- [TilingSprite](https://pixijs.download/release/docs/scene.TilingSprite.html)
- [NineSliceSprite](https://pixijs.download/release/docs/scene.NineSliceSprite.html)
- [MeshRope](https://pixijs.download/release/docs/scene.MeshRope.html)

## Props

Most props will work just as the properties on the corresponding [PixiJS](https://pixijs.com/) objects. in addition, They can also be used with X/Y suffix

```html
<container :scale-x="10" :skew-y="0.5" />
```

## Events

All events emitted by pixi objects are supported. Some of vue's event modifiers will work, like `@click.left`.

> adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

### Graphics

When using `<graphics />` there is a special `@effect` event.

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the draw method have changed.

```html
<script setup lang="ts">
import { Graphics } from "pixi.js";

const props = defineProps<{
  x: number
  y: number
  width: number
  height: number
}>()

function draw(g: Graphics) {
  g.clear()

  const { x, y, width, height } = props
  g.roundRect(x, y, width, height, 5)
  g.stroke({ width: 3, color: 0xffffff })
}
</script>

<template>
  <graphics @effect="draw" />
</template>
```

## Filters

To use `filter`, you need to place the Filter tag under the `<Container>` that sets the filter. Currently, the following filters are supported by default:

- [BlurFilter](https://pixijs.download/release/docs/filters.BlurFilter.html)
- [AlphaFilter](https://pixijs.download/release/docs/filters.AlphaFilter.html)
- [DisplacementFilter](https://pixijs.download/release/docs/filters.DisplacementFilter.html)
- [ColorMatrixFilter](https://pixijs.download/release/docs/filters.ColorMatrixFilter.html)
- [NoiseFilter](https://pixijs.download/release/docs/filters.NoiseFilter.html)

Example of using `BlurFilter` with a Container:

```html
<script setup>
const showBlur = ref(true)
</script>

<container>
  <blur-filter :quality="3" :blur="5" v-if="showBlur" />
</container>
```

### Custom Filters

To use other filters, you can use the is attribute of `<Filter>`. For example, to use the `ShockwaveFilter` in [pixi-filters](https://github.com/pixijs/filters):

```html
<script setup>
import { ShockwaveFilter } from 'pixi-filters'
function renderShockwaveFilter(props: any) {
  return new ShockwaveFilter(
    props.center,
    {
      radius: props.radius,wavelength: props.wavelength,
      amplitude: props.amplitude, speed: props.speed,
    },
    props.time,
  )
}

const time = ref(0)
const center = ref([20, 30])
</script>

<sprite texture="@/assets/background.png">
  <filter :is="renderShockwaveFilter" :center="center" :time="time" />
</sprite>
```

## Namespaces

To avoid conflicts with other tags, such as `<filter>`, you can use the `pixi-` prefix or capitalize the first letter with `<Filter>`.

```html
<Filter /> <!-- or --> <pixi-filter />
```

> Other components also support the `pixi-` prefix, so you can choose according to you personal preference.

## Assets

`vue3-pixi` provides the `<assets>` component for loading resources using the PixiJS Assets API.

```html
<template>
  <assets
    :entry="[
      { alias: 'flowerTop', src: '/assets/flowerTop.png' },
      { alias: 'eggHead', src: '/assets/eggHead.png' },
    ]"
  >
    <template #default>
      <sprite texture="flowerTop" />
      <sprite texture="eggHead" />
    </template>
    <template #fallback="{ progress }">
      <text :style="{ fill: 'white' }">Loading... {{ progress }}</text>
    </template>
  </assets>
</template>
```

You can also load a single asset using the `alias` and `entry` props:

```html
<assets alias="bunny" entry="/assets/bunny.png">
  <sprite texture="bunny" />
</assets>
```

## Composables

`vue3-pixi` provides a set of composable hooks for operating a Pixi application.

### onTick

This composable hook adds a ticker to the PixiJS application during mounting and returns a remove function.

```html
<script setup lang="ts">
import { onTick } from "vue3-pixi";

onTick((ticker) => {
  // ticker.deltaTime, ticker.elapsedMS, etc.
})
</script>
```

### useApplication

This composable hook is used to obtain the current Pixi application instance.

```html
<script setup lang="ts">
import { Application, useApplication } from "vue3-pixi";
import { onMounted } from 'vue'

const app = useApplication()

onMounted(() => {
  app.value.ticker // { ... }
})
</script>

<template>
  <Application :width="640" :height="480">
    <!-- ... -->
  </Application>
</template>
```

### useScreen

Returns a reactive `Ref<Rectangle>` for the application's screen dimensions.

```html
<script setup lang="ts">
import { useScreen } from 'vue3-pixi'

const screen = useScreen()
</script>

<template>
  <sprite :x="screen.width / 2" :texture="textures.flowerTop" />
</template>
```

## Creating a PixiJS application manually

Using the custom renderer inside `vue3-pixi`:

```ts
import { Application } from 'pixi.js'
import { appInjectKey, createApp } from 'vue3-pixi'
import App from './App.vue'

const pixiApp = new Application()

await pixiApp.init({
  resizeTo: window,
  antialias: true,
})

document.body.appendChild(pixiApp.canvas)

const app = createApp(App)

app.provide(appInjectKey, pixiApp)
app.mount(pixiApp.stage)
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [hairyf](https://github.com/hairyf)
