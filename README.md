# vue3-pixi-renderer

Use Vue 3 to create PixiJS applications

- 💚 Lightweight and flexible Vue 3 library for creating PixiJS applications.
- ✏️ Provides a custom Vue renderer that creates PixiJS objects instead of HTML elements.
- 📦 Supports all PixiJS objects, such as Container, Sprite, Graphics, Text, etc
- 🧑‍💻 Support specifying texture paths in templates to load texture objects
- ✨ All events emitted by PixiJS objects are supported
- 🗃️ Offers a `Assets` component for bundling assets.

## Try it Online

[![StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vue-pixi-renderer)

## Install

```sh
# with pnpm
pnpm add @overlays/vue

# with yarn
yarn add @overlays/vue
```

## Usage

```html
<script setup lang="ts">
import { State } from "vue3-pixi-renderer";
import textureUrl from "@/assets/myTexture.png";

const hitArea = new Rectangle(0, 0, 64, 64);

function onClick() {
  console.log('sprite clicked!');
}
</script>

<template>
  <state :width="640" :height="480">
    <container>
      <sprite :texture="textureUrl" :hit-area="hitArea" @click="onClick" />
    </container>
  </state>
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

## Components

The following PixiJS objects are supported out of the box:

- Container
- Sprite
- Graphics
- Text
- BitmapText
- TilingSprite
- AnimatedSprite
- Mesh
- NineSlicePlane
- SimpleMesh
- SimplePlane
- SimpleRope

## Props

Most props will work just as the properties on the corresponding PixiJS objects. However, props that accept a `Point` are handeled a bit different. They can also be used with X/Y suffix (except for the `position` prop, which just uses the `x`/`y` props instead).

```html
<container :scale-x="10" :skew-y="0.5" />
```

## Events

All events emitted by pixi objects are supported. *Some* of vue's event modifiers will work, like `@click.left`, however more often than not using them will cause an error. Adding an event listener to an element will currently automatically set the element's `eventMode` to `static`.

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
import { State, Assets, AssetsResolvers } from "vue3-pixi-renderer";
import textureUrl from "@/assets/myTexture.png";

const resolves: AssetsResolvers = {
  flowerTop: import('./examples/assets/flowerTop.png'),
  eggHead: import('./examples/assets/eggHead.png'),
  bunny: 'https://pixijs.io/examples/examples/assets/bunny.png'
}
</script>

<template>
  <State :width="640" :height="480">
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
  </State>
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