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

## API

### Loader Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| resources | ^[array]`Array<string \| Promise<string> \| Import<string>>` ^[object]`{ [string]: Promise<string> \| Import<string> }` | `undefined` | The resources to load. |
| options | ^[object]`PIXI.IBaseTextureOptions` | `undefined` | The options to pass to the all resources. |
| bundleIds | ^[string] | `nanoid(5)` | The bundle ids to load. |

### Loader Events

| Name | Type | Description |
| ---- | ---- | ---- |
| resolved | ^[function]`(textures: any): void` | The resolved event is emitted when the loader has finished loading all resources. |
| progress | ^[function]`(progress: number): void` | The progress event is emitted when the loader has loaded a resource. |

### Loader Slots

| Name | Type | Description |
| default | `({ textures }): void` | The default slot is where you put all your Pixi elements. |
| fallback | `({ progress }): void` | The default slot is where you put all your Pixi elements. |
