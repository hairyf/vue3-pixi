# Quick Start

::: tip PixiJS v8(RC)
This version of vue3-pixi targets **PixiJS v8**. If you are migrating from v7, see the [Migration Guide](/guide/migration).
:::

If you have an existing project, you just need to install the following dependencies:

::: code-group

```bash [npm]
npm install pixi.js vue3-pixi@rc
```

```bash [yarn]
yarn add pixi.js vue3-pixi@rc
```

```bash [pnpm]
pnpm add pixi.js vue3-pixi@rc
```

:::

## Basic Usage

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
import { compilerOptions } from 'vue3-pixi/compiler'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
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
