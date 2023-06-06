# Quick Start

If you have an existing project, you just need to install the following dependencies:

::: code-group

```bash [npm]
npm install pixi.js vue3-pixi
```

```bash [yarn]
yarn add pixi.js vue3-pixi
```

```bash [pnpm]
pnpm add pixi.js vue3-pixi
```

:::

## Basic Usage

The `<Application>` component can be used to embed a pixi app into an existing vue app.

```html
<script setup lang="ts">
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

add Vue plugin configuration to support custom elements, prevent parsing exceptions, and support parsing the texture attribute, just like the src attribute of an img.

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { compilerOptions, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
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
