# Loader

Preloads the assets (textures, audio, etc.) used by your components.
It contains two slots, `fallback` and the default. The default slot will not
render until the Loader has finished.

You can show progress by using the `progress` prop from the `fallback` slot.

<demo src="./demo/basic.vue" background="#fff" />

## Alias

You can specify aliases for resources using `{ [key]: Asset }` or an array `[key, Asset]`.

```vue
<template>
  <Loader
    :resources="{
      flowerTop: '/assets/flowerTop.png',
      eggHead: '/assets/eggHead.png',
    }"
  >
    <sprite texture="flowerTop" />
    <sprite texture="eggHead" />
  </Loader>
</template>
```

or 

```vue
<template>
  <Loader
    :resources="[
      ['flowerTop', '/assets/flowerTop.png'],
      ['eggHead', '/assets/eggHead.png'],
    ]"
  >
    <sprite texture="flowerTop" />
    <sprite texture="eggHead" />
  </Loader>
</template>
```

## Import

In a Vite project, you may sometimes need to use the import function to import resources. No worries! vue3-pixi will handle the parsing for you 😉.

```vue
<Loader
  :resources="[
    import('./assets/adventurer-spritesheet.json'),
    ['flowerTop', import('./assets/flowerTop.png')],
    ['eggHead', import('./assets/eggHead.png')],
  ]"
>
  <!-- ... -->
</Loader>
```