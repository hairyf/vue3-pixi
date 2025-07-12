# Assets

Preloads the assets (textures, audio, etc.) used by your components.
It contains two slots, `fallback` and the default. The default slot will not
render until the Loader has finished.

You can show progress by using the `progress` prop from the `fallback` slot.

<demo src="./demo/assets.vue" background="#fff" />

## Default Slot

You can also access the loaded entry through the default slot, which is an object that you can iterate over.

<demo src="./demo/assets-slots.vue" />

## Alias

You can specify aliases for resources using `Asset[]`

```vue
<template>
  <assets
    :entry="[
      { alias: 'flowerTop', src: '/assets/flowerTop.png' },
      { alias: 'eggHead', src: '/assets/eggHead.png' },
    ]"
  >
    <sprite texture="flowerTop" />
    <sprite texture="eggHead" />
  </assets>
</template>
```

## API

### Assets Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| entry | ^[array]`Array<string \| Promise<string> \| Import<string>>` ^[object]`{ [string]: Promise<string> \| Import<string> }` | `undefined` | The entry to load. |
| options | ^[object]`PIXI.IBaseTextureOptions` | `undefined` | The options to pass to the all entry. |
| bundleIds | ^[string] | `nanoid(5)` | The bundle ids to load. |

### Assets Events

| Name | Type | Description |
| ---- | ---- | ---- |
| resolved | ^[function]`(textures: any): void` | The resolved event is emitted when the assets has finished loading all entry. |
| progress | ^[function]`(progress: number): void` | The progress event is emitted when the assets has loaded a resource. |

### Assets Slots

| Name | Type | Description |
| ---- | ---- | ---- |
| default | `({ textures }): void` | The default slot is where you put all your Pixi elements. |
| fallback | `({ progress }): void` | The default slot is where you put all your Pixi elements. |
