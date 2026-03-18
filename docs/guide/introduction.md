<p align="center">
  <img class="h-150px" src="/logo.svg" />
</p>

<h1 align="center">Vue 3 Pixi</h1>

<p align="center">
  <strong>Vue createRenderer for PixiJS</strong>
</p>

<br />

<div class="flex justify-center gap-2">
  <img src="https://img.shields.io/github/forks/hairyf/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/github/stars/hairyf/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/dm/vue3-pixi.svg?style=flat-square" />
  <img src="https://img.shields.io/npm/v/vue3-pixi?color=a1b858&style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/pixi-v8+-ff69b4.svg?style=flat-square" alt="pixi version" />
</div>

::: tip PixiJS v8(RC)
This version of vue3-pixi targets **PixiJS v8**. If you are migrating from v7, see the [Migration Guide](/guide/migration).
:::

###### Features

- Lightweight and flexible [Vue 3](https://vuejs.org/) library for creating [PixiJS](https://pixijs.com/) applications.
- Provides a [Custom Vue Renderer](https://vuejs.org/api/custom-renderer.html#custom-renderer-api) that creates PixiJS objects instead of HTML elements.
- Supports all PixiJS objects: `Filter`, `Container`, `Sprite`, `Graphics`, `Text`, and more.
- Specify `texture` paths in templates to load texture objects automatically.
- All [events](https://pixijs.download/release/docs/scene.Sprite.html) emitted by PixiJS objects are supported.
- Includes an [assets](/guide/components/assets) component for bundling resources and [Composition Utilities](/guide/composition-api/on-tick) for common patterns.
- Create [transition effects](/guide/components/transition) for PixiJS objects.

> If you run into any problems, please [create an issue on GitHub](https://github.com/hairyf/vue3-pixi/issues).

## Install

::: code-group

```bash [pnpm]
pnpm add pixi.js vue3-pixi@rc
```

```bash [yarn]
yarn add pixi.js vue3-pixi@rc
```

```bash [npm]
npm install pixi.js vue3-pixi@rc
```

:::

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
        // support for custom elements and remove the unknown element warnings
        compilerOptions,
      },
    }),
  ],
})
```

## Try it Online

You can fork this template on [StackBlitz](https://stackblitz.com/edit/vue3-pixi?file=src/App.vue) and try it without installing anything locally.

<stack-blitz-embed id="vue3-pixi" />
