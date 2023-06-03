<h1 align="center">Vue 3 Pixi</h1>

<p align="center">
  <strong>Vue createRenderer for PixiJS</strong>
</p>

<br />

<p align="center">
  <!-- <img src="https://img.shields.io/github/forks/hairyf/vue3-pixi.svg?style=flat-square" /> -->
  <!-- <img src="https://img.shields.io/github/stars/hairyf/vue3-pixi.svg?style=flat-square" /> -->
  <!-- <img src="https://img.shields.io/npm/dm/vue3-pixi.svg?style=flat-square" /> -->
  <img src="https://img.shields.io/npm/v/vue3-pixi?color=a1b858&style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/pixi-v7+-ff69b4.svg?style=flat-square" alt="pixi version" />
</p>

###### Features

- 💚 Lightweight and flexible [Vue 3](https://vuejs.org/) library for creating [PixiJS](https://pixijs.com/) applications.
- ✏️ Provides a [Custom Vue Renderer](https://vuejs.org/api/custom-renderer.html#custom-renderer-api) that creates PixiJS objects instead of HTML elements.
- 📦 Supports all PixiJS objects, such as `Filter`, `Container`, `Sprite`, `Graphics`, `Text`, etc
- 🧑‍💻 Support specifying `texture` paths in templates to load texture objects
- ✨ All [events](https://pixijs.download/release/docs/PIXI.Sprite.html#onclick) emitted by PixiJS objects are supported
- 🗃️ Offers [Assets](#assets) component for bundling assets and Feature Rich [Composition Utilities](#composables).
- 💫 Create different transition effects in conjunction with [@vue3-pixi-transition](https://github.com/hairyf/vue3-pixi/tree/main/packages/transition).

## Try it Online

[![StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vue3-pixi)

## Demos

- https://github.com/hairyf/vue3-pixi-flappy-bird
- https://github.com/hairyf/vue3-pixi-dino

## Install


```sh
# with pnpm
pnpm add vue3-pixi

# with yarn
yarn add vue3-pixi
```

## Usage

The `<Stage>` component can be used to embed a pixi app into an existing vue app.

```html
<script setup lang="ts">
import { Stage } from "vue3-pixi";
import textureUrl from "@/assets/myTexture.png";

const hitArea = new Rectangle(0, 0, 64, 64);

function onClick() {
  console.log('sprite clicked!');
}
</script>

<template>
  <Stage :width="640" :height="480">
    <container>
      <sprite :texture="textureUrl" :hit-area="hitArea" @click="onClick" />
    </container>
  </Stage>
</template>
```

## Initialize vue plugin

The vite plugin adds the ability to specify texture paths on sprites & other components that use textures, the same way as the `src` attribute on an image.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for asset url conversion
        transformAssetUrls,
      },
    }),
  ],
})
```

### Usage in template

The Vue Plugin detects any texture props containing the path to an image and replaces it with a reference to a texture object:

```html
<sprite texture="@/assets/myTexture.png" />
```

## Elements

- [Container](http://pixijs.download/release/docs/PIXI.Container.html)
- [Sprite](http://pixijs.download/release/docs/PIXI.Sprite.html)
- [Graphics](http://pixijs.download/release/docs/PIXI.Graphics.html)
- [Text](http://pixijs.download/release/docs/PIXI.Text.html)
- [BitmapText](http://pixijs.download/release/docs/PIXI.BitmapText.html)
- [AnimatedSprite](http://pixijs.download/release/docs/PIXI.AnimatedSprite.html)
- [SimpleMesh](http://pixijs.download/release/docs/PIXI.SimpleMesh.html)
- [SimplePlane](http://pixijs.download/release/docs/PIXI.SimplePlane.html)
- [TilingSprite](http://pixijs.download/release/docs/PIXI.TilingSprite.html)
- [NineSlicePlane](http://pixijs.download/release/docs/PIXI.NineSlicePlane.html)
- [SimpleRope](http://pixijs.download/release/docs/PIXI.SimpleRope.html)
- [Mesh](http://pixijs.download/release/docs/PIXI.AnimatedSprite.html)

## Props

Most props will work just as the properties on the corresponding [PixiJS](https://pixijs.com/) objects. in addition, They can also be used with X/Y suffix

```html
<container :scale-x="10" :skew-y="0.5" />
```

## Events

All events emitted by pixi objects are supported. Some of vue's event modifiers will work, like `@click.left`.

> adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

### Render Events

all elements support @render event, which allows for flexible manipulation of elements, For example, using on `<grahpics/>`

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

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
  g.lineStyle(3, 0xffffff)
  const { x, y, width, height } = props
  g.drawRoundedRect(x, y, width, height, 5)
}
</script>

<template>
  <graphics @render="draw" />
</template>
```

> In `@render`, it will not be included in the update of Vue, so no additional updates will be triggered, which can effectively reduce performance loss

## Filters

To use `filter`, you need to place the Filter tag under the `<Container>` that sets the filter. Currently, the following filters are supported by default:

- [BlurFilter](https://pixijs.download/release/docs/PIXI.BlurFilter.html)
- [AlphaFilter](https://pixijs.download/release/docs/PIXI.AlphaFilter.html)
- [DisplacementFilter](https://pixijs.download/release/docs/PIXI.DisplacementFilter.html)
- [ColorMatrixFilter](https://pixijs.download/release/docs/PIXI.ColorMatrixFilter.html)
- [NoiseFilter](https://pixijs.download/release/docs/PIXI.NoiseFilter.html)
- [FXAAFilter](https://pixijs.download/release/docs/PIXI.FXAAFilter.html)

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

`vue3-pixi` provides a special component for bundling resources and obtaining resources from plugins.

```html
<script setup lang="ts">
import { Assets, AssetsResolvers } from "vue3-pixi";

const resolves: AssetsResolvers = {
  flowerTop: import('./examples/assets/flowerTop.png'),
  eggHead: import('./examples/assets/eggHead.png'),
  bunny: 'https://pixijs.io/examples/examples/assets/bunny.png'
}
</script>

<template>
  <Assets :resolves="resolves" #default="{ textures, progress }">
    <container v-if="textures">
      <sprite :texture="textures.flowerTop" />
    </container>
    <text v-else>
      Loading...
    </text>
  </Assets>
</template>
```

You can also use the `resolved` and `fallback` slots separately to handle successful and loaded content independently:

```html
<Assets :resolves="resolves">
  <template #resolved="{ textures }"><!-- ... --></template>
  <template #fallback="{ progress }"><!-- ... --></template>
</Assets>
```

## Composables

`vue3-pixi` provides a set of composable hooks for operating a Pixi application.

### onTick

This composable hook adds a ticker to the Pixi application during mounting and returns a stop function.

```html
<script setup lang="ts">
import { StageInst, Stage, onTick } from "vue3-pixi";

onTick((delta) => {
  // ...
})
</script>

<template>
  <Stage :width="640" :height="480">
    <!-- ... -->
  </Stage>
</template>
```

### useApplication

This composable hook is used to obtain the current Pixi application instance.

```html
<script setup lang="ts">
import { StageInst, Stage, useApplication } from "vue3-pixi";
import { onMounted } from 'vue'

const pixiApp = useApplication()

onMounted(() => {
  pixiApp.value.ticker // { ... }
})
</script>

<template>
  <Stage :width="640" :height="480">
    <!-- ... -->
  </Stage>
</template>
```

You can pass a `ref` to specify a PIXI application. By default, it will automatically look for the nearest PIXI application in the current hierarchy.

```html
<script setup lang="ts">
const stageRef = ref()
const pixiApp = useApplication(stageRef)
</script>

<template>
  <Stage ref="stageRef" :width="640" :height="480">
    <!-- ... -->
  </Stage>
</template>
```

## useScreen

obtain responsive `screen` information of `pixiApp.screen`

```html
<script setup lang="ts">
const screen = useScreen()
</script>

<template>
  <sprite :x="screen.width / 2" :texture="textures.flowerTop" />
</template>
```

## Creating an pixi application manually

Using the custom renderer inside `vue3-pixi`

```ts
import { appInjectKey, createApp } from 'vue3-pixi'
import { Application } from 'pixi.js'
import App from './App.vue'

const pixiApp = new Application({
  resizeTo: window,
  antialias: true,
})

document.body.appendChild(pixiApp.view as HTMLCanvasElement)

const app = createApp(App)

app.provide(appInjectKey, pixiApp)
app.mount(pixiApp.stage)
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [hairyf](https://github.com/hairyf)
