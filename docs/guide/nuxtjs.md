# Using in Nuxtjs

Repository is [here](https://github.com/hairyf/vue3-pixi/tree/main/packages/vue3-pixi-nuxt)

If you want to use it in Nuxtjs, install the following modules:


## Install

::: code-group

```bash [npm]
npm install vue3-pixi vue3-pixi-nuxt
```

```bash [yarn]
yarn add vue3-pixi vue3-pixi-nuxt
```

```bash [pnpm]
pnpm add vue3-pixi vue3-pixi-nuxt
```

:::

## Features

- Auto-import components and composable from the vue3-pixi
- `<Application>` client only, you don't need to add `<ClientOnly />`
- Automatically configures `isCustomElement` for vue compiler

## Usage

Add `vue3-pixi-nuxt` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['vue3-pixi-nuxt'],
})
```

now, you can use `vue3-pixi` in your Nuxt app

```vue
<script setup>
</script>

<template>
  <Application :width="240" :height="240">
    <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
      Hello NuxtJS World
    </text>
  </Application>
</template>
```