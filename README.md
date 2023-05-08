<h1 align="center">Vue 3 Pixi Renderer</h1>

<p align="center">
  <strong>Vue createRenderer for PixiJS</strong>
</p>

<br />

<p align="center">
  <img src="https://img.shields.io/github/forks/hairyf/vue3-pixi-renderer.svg?style=flat-square" />
  <img src="https://img.shields.io/github/stars/hairyf/vue3-pixi-renderer.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/vue3-pixi-renderer.svg?style=flat-square" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/pixi-v7+-ff69b4.svg?style=flat-square" alt="pixi version" />
</p>


###### Features

- 💚 Lightweight and flexible [Vue 3](https://vuejs.org/) library for creating [PixiJS](https://pixijs.com/) applications.
- ✏️ Provides a [Custom Vue Renderer](https://vuejs.org/api/custom-renderer.html#custom-renderer-api) that creates PixiJS objects instead of HTML elements.
- 📦 Supports all PixiJS objects, such as `Container`, `Sprite`, `Graphics`, `Text`, etc
- 🧑‍💻 Support specifying `texture` paths in templates to load texture objects
- ✨ All [events](https://pixijs.download/release/docs/PIXI.Sprite.html#onclick) emitted by PixiJS objects are supported
- 🗃️ Offers a [Assets](#assets) component for bundling assets.

## Try it Online

[![StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vue-pixi-renderer)

## Install

```sh
# with pnpm
pnpm add vue3-pixi-renderer

# with yarn
yarn add vue3-pixi-renderer
```

## Usage

The `<Stage>` component can be used to embed a pixi app into an existing vue app.

```html
<script setup lang="ts">
import { Stage } from "vue3-pixi-renderer";
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
import { compilerOptions, transformAssetUrls } from 'vue3-pixi-renderer/compiler'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // remove the unknown element warnings
        compilerOptions,
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

Most props will work just as the properties on the corresponding [PixiJS](https://pixijs.com/) objects. in addition, They can also be used with X/Y suffix (except for the `position` prop, which just uses the `x`/`y` props instead).

```html
<container :scale-x="10" :skew-y="0.5" />
```

## Events

All events emitted by pixi objects are supported. Some of vue's event modifiers will work, like `@click.left`.

> adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

### Graphics

When using `<grahpics />` there is a special `@draw` event.

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
  g.lineStyle(3, 0xffffff)

  const { x, y, width, height } = props
  g.drawRoundedRect(x, y, width, height, 5)
}
</script>

<template>
  <graphics @draw="draw" />
</template>
```

## Assets

`vue3-pixi-renderer` provides a special component for bundling resources and obtaining resources from plugins.

```html
<script setup lang="ts">
import { Stage, Assets, AssetsResolvers } from "vue3-pixi-renderer";
import textureUrl from "@/assets/myTexture.png";

const resolves: AssetsResolvers = {
  flowerTop: import('./examples/assets/flowerTop.png'),
  eggHead: import('./examples/assets/eggHead.png'),
  bunny: 'https://pixijs.io/examples/examples/assets/bunny.png'
}
</script>

<template>
  <Stage :width="640" :height="480">
    <Assets :resolves="resolves">
      <template #default={ textures }>
        <container>
          <sprite :texture="textures.flowerTop" />
        </container>
      </template>
      <template #fallback={ progress }>
        <!-- Loading... -->
      </template>
    </Assets>
  </Stage>
</template>
```

## Composables

`vue3-pixi-renderer` provides a set of composable hooks for operating a Pixi application.

### tryMountTicker

This composable hook adds a ticker to the Pixi application during mounting and returns a stop function.

```html
<script setup lang="ts">
import { StageInst, Stage, tryMountTicker } from "vue3-pixi-renderer";

const stageRef = ref<StageInst>()

const removeTicker = tryMountTicker(stageRef, (delta) => {
  // ...
})
</script>

<template>
  <Stage ref="stageRef" :width="640" :height="480">
    <!-- ... -->
  </Stage>
</template>
```

### useApplication

This composable hook is used to obtain the current Pixi application instance.

```html
<script setup lang="ts">
import { StageInst, Stage, useApplication } from "vue3-pixi-renderer";
import { onMounted } from 'vue'

const stageRef = ref<StageInst>()
const pixiApp = useApplication(stageRef)

onMounted(() => {
  pixiApp.value.screen // { ... }
})
</script>

<template>
  <Stage ref="stageRef" :width="640" :height="480">
    <!-- ... -->
  </Stage>
</template>
```


## Creating an pixi application manually

Using the custom renderer inside `vue3-pixi-renderer`

```ts
import { createApp } from 'vue3-pixi-renderer'
import App from './App.vue'

const pixiApp = new PIXI.Application()

document.body.appendChild(pixiApp.view)

const app = createApp(App)

app.mount(pixiApp.stage)
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [hairyf](https://github.com/hairyf)
