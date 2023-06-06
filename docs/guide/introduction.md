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
  <img src="https://img.shields.io/badge/pixi-v7+-ff69b4.svg?style=flat-square" alt="pixi version" />
</div>

###### Features

- 💚 Lightweight and flexible [Vue 3](https://vuejs.org/) library for creating [PixiJS](https://pixijs.com/) applications.
- ✏️ Provides a [Custom Vue Renderer](https://vuejs.org/api/custom-renderer.html#custom-renderer-api) that creates PixiJS objects instead of HTML elements.
- 📦 Supports all PixiJS objects, such as `Filter`, `Container`, `Sprite`, `Graphics`, `Text`, etc
- 🧑‍💻 Support specifying `texture` paths in templates to load texture objects
- ✨ All [events](https://pixijs.download/release/docs/PIXI.Sprite.html#onclick) emitted by PixiJS objects are supported
- 🗃️ Offers [Assets](#assets) component for bundling assets and Feature Rich [Composition Utilities](#composables).
- 💫 Create different transition effects in conjunction with [@vue3-pixi-transition](https://github.com/hairyf/vue3-pixi/tree/main/packages/transition).


> **It is still a work in progress** but it should be usable enough for real projects. If you run into any problems please don’t hesitate to [create an issue on GitHub](https://github.com/hairyf/vue3-pixi/issues).

## Install

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



## Try it Online

You can fork this template example on [StackBlitz](https://stackblitz.com/edit/vue3-pixi?file=src/App.vue) and play with it 😋 without installing anything locally.

<stack-blitz-embed id="vue3-pixi" />

