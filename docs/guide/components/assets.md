# Assets

Preloads the assets (textures, audio, etc.) used by your components using the PixiJS [Assets](https://pixijs.download/release/docs/assets.Assets.html) API.
It contains two slots, `fallback` and the default. The default slot will not
render until the assets have finished loading.

You can show progress by using the `progress` prop from the `fallback` slot.

<demo src="./demo/assets.vue" background="#fff" />

## Default Slot

You can also access the loaded entry through the default slot, which is an object that you can iterate over.

<demo src="./demo/assets-slots.vue" />

## Alias

You can specify aliases for resources using the `alias` and `entry` props, or by passing an array of `UnresolvedAsset` objects:

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

You can also use the `alias` and `entry` props together for a single asset:

```vue
<template>
  <assets alias="mySprite" entry="/assets/mySprite.png" @loaded="onLoaded">
    <sprite texture="mySprite" />
  </assets>
</template>
```

## Bundles

Use `<assets-bundle>` to load asset bundles, either from a manifest or by defining bundles inline:

```vue
<template>
  <!-- Load from manifest -->
  <assets-bundle manifest="/assets/manifest.json" entry="game-screen">
    <template #fallback="{ progress }">
      <text :anchor="0.5" :x="120" :y="120">
        {{ `Loading ${progress}%` }}
      </text>
    </template>
    <template #default="{ data }">
      <sprite :texture="data.background" />
    </template>
  </assets-bundle>

  <!-- Define bundle inline -->
  <assets-bundle
    id="my-bundle"
    :entry="[
      { alias: 'bg', src: '/assets/bg.png' },
      { alias: 'hero', src: '/assets/hero.png' },
    ]"
  >
    <template #default="{ data }">
      <sprite :texture="data.bg" />
    </template>
  </assets-bundle>
</template>
```

## API

### Assets Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| alias | ^[string] ^[array]`string[]` | `undefined` | Alias name(s) for the asset being loaded. |
| entry | ^[string] ^[array]`string[]` ^[object]`ResolvedSrc \| UnresolvedAsset` | `undefined` | The asset entry to load. Can be a URL, array of URLs, or asset descriptor object(s). |
| autoload | ^[boolean] | `true` | Whether to automatically load assets via `Assets.load`. |
| autounload | ^[boolean] | `false` | Whether to unload assets when the component is unmounted. |
| background | ^[boolean] | `false` | Load assets in the background while the application is running. |
| basePath | ^[string] | `undefined` | Base path prepended to all asset URLs. |

### Assets Events

| Name | Type | Description |
| ---- | ---- | ---- |
| loaded | ^[function]`(data: any): void` | Emitted when all assets have finished loading. |
| progress | ^[function]`(progress: number): void` | Emitted when loading progress updates. |
| error | ^[function]`(error: Error): void` | Emitted when asset loading fails. |

### Assets Slots

| Name | Type | Description |
| ---- | ---- | ---- |
| default | `({ data }): void` | Rendered after loading completes. `data` contains the loaded assets. |
| fallback | `({ progress }): void` | Rendered while assets are loading. `progress` is a number from 0 to 1. |
| error | `({ error }): void` | Rendered when asset loading fails. |

### AssetsBundle Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| manifest | ^[object] ^[string]`AssetsManifest \| string` | `undefined` | Assets manifest containing bundle definitions. |
| entry | ^[string] ^[array]`string[]` ^[object]`AssetsBundle['assets']` | `undefined` | Bundle name(s) to load, or inline bundle assets when used with `id`. |
| id | ^[string] | `undefined` | Bundle ID for inline bundle definitions. |
| autoload | ^[boolean] | `true` | Whether to automatically load the bundle. |
| autounload | ^[boolean] | `false` | Whether to unload the bundle when the component is unmounted. |
| background | ^[boolean] | `false` | Load the bundle in the background. |

### AssetsBundle Events

| Name | Type | Description |
| ---- | ---- | ---- |
| loaded | ^[function]`(data: any): void` | Emitted when the bundle has finished loading. |
| progress | ^[function]`(progress: number): void` | Emitted when loading progress updates. |
