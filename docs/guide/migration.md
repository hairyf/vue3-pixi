# Migration from v7

Covers migrating from vue3-pixi v0.9.x (PixiJS v7) to vue3-pixi v1.0.0 (PixiJS v8).

## Installation

Update your dependencies:

```bash
# Remove old packages
npm uninstall pixi.js vue3-pixi

# Install new versions
npm install pixi.js@^8.0.0 vue3-pixi@^1.0.0
```

## Template Breaking Changes

### Loader to Assets

`<Loader>` has been replaced by `<assets>` and `<assets-bundle>`.

**v7:**

```vue
<template>
  <Loader :resources="resources" @loaded="onLoaded">
    <Sprite texture="hero" />
  </Loader>
</template>
```

**v8:**

```vue
<template>
  <assets :urls="['/hero.png']" @resolved="onLoaded">
    <template #default="{ textures }">
      <sprite :texture="textures['/hero.png']" />
    </template>
    <template #error="{ error }">
      <text :style="{ fill: 'red' }">{{ error.message }}</text>
    </template>
  </assets>
</template>
```

### Element Renames

| v7 Element | v8 Element | Notes |
|---|---|---|
| `<simple-rope>` | `<mesh-rope>` | Renamed |
| `<nine-slice-plane>` | `<nine-slice-sprite>` | Renamed |
| `<simple-plane>` | `<mesh-plane>` | Renamed (or use `<mesh>` with `PlaneGeometry`) |
| `<fxaa-filter>` | Removed | Not available in PixiJS v8 |

**SimplePlane migration:**

```vue
<!-- v7 -->
<simple-plane :texture="texture" :vertices-x="10" :vertices-y="10" />

<!-- v8 (recommended) -->
<mesh-plane :texture="texture" :vertices-x="10" :vertices-y="10" />

<!-- v8 (alternative: manual geometry) -->
<script setup>
import { PlaneGeometry } from 'pixi.js'
const geometry = new PlaneGeometry({ width: 100, height: 100, verticesX: 10, verticesY: 10 })
</script>
<mesh :geometry="geometry" :texture="texture" />
```

### ParticleContainer

In PixiJS v8, `ParticleContainer` uses lightweight `Particle` objects instead of `Sprite` children. Particles are **not** Containers and must be added via `addParticle()` (not `addChild()`). Declarative `<particle>` children inside `<particle-container>` are not supported; use the imperative approach instead.

### New Elements

- `<mesh-plane>`: texture mapped to a plane with configurable vertex density (replaces `<simple-plane>`)
- `<mesh-simple>`: simplified mesh with direct vertex control

### @render to @effect

The `@render` event has been renamed to `@effect`.

```vue
<!-- v7 -->
<sprite :texture="texture" @render="(el) => { el.rotation += 0.01 }" />

<!-- v8 -->
<sprite :texture="texture" @effect="(el) => { el.rotation += 0.01 }" />
```

### Event Mode

Interactive elements now need an explicit `event-mode` prop. In v7, some elements were interactive by default.

```vue
<sprite :texture="texture" event-mode="static" @pointerdown="onClick" />
```

### Pointer Move Events

In v8, `@pointermove` only fires when the pointer is **over** the element, not anywhere on the canvas. For canvas-wide tracking, use `@globalpointermove`:

```vue
<!-- v7: pointermove fired everywhere -->
<sprite :texture="texture" @pointermove="onMove" />

<!-- v8: use globalpointermove for canvas-wide tracking -->
<sprite :texture="texture" event-mode="static" @globalpointermove="onMove" />
```

### Container.name → Container.label

The `name` property has been renamed to `label` in v8:

```vue
<!-- v7 -->
<container name="myContainer" />

<!-- v8 -->
<container label="myContainer" />
```

## Script Breaking Changes

### onTick callback signature

`onTick` now receives a `Ticker` object instead of a plain delta number.

```ts
// v7
onTick((delta) => {
  sprite.rotation += 0.01 * delta
})

// v8
onTick(({ deltaTime }) => {
  sprite.rotation += 0.01 * deltaTime
})
```

### Texture changes

`baseTexture` has been replaced by `source`:

```ts
// v7
texture.baseTexture.width

// v8
texture.source.width
```

### Container property renames

```ts
// name -> label
container.label = 'mySprite'

// cacheAsBitmap -> cacheAsTexture()
container.cacheAsTexture(true)

// mask assignment -> setMask()
container.setMask({ mask: maskGraphics })
```

### Graphics API

The chainable `beginFill/endFill` pattern is replaced with a draw-then-fill API:

```ts
// v7
graphics
  .beginFill(0xff0000)
  .drawRect(0, 0, 100, 100)
  .endFill()
  .beginFill(0x00ff00)
  .drawCircle(150, 50, 50)
  .endFill()

// v8
graphics
  .rect(0, 0, 100, 100)
  .fill(0xff0000)
  .circle(150, 50, 50)
  .fill(0x00ff00)
```

## New Features

### RenderLayer

Decouples render order from the scene graph hierarchy. A child can belong to one parent in the scene graph but render in a different layer:

```vue
<template>
  <render-layer ref="uiLayer" />
  <container>
    <sprite :texture="texture" :parent-render-layer="uiLayer" />
  </container>
</template>
```

See the [RenderLayer guide](/guide/elements/render-layer) for details.

### GraphicsContext

Share drawing instructions across multiple Graphics instances:

```vue
<template>
  <graphics-context @effect="(ctx) => ctx.rect(0, 0, 50, 50).fill('red')" ref="sharedCtx" />
  <graphics :context="sharedCtx" :x="0" />
  <graphics :context="sharedCtx" :x="100" />
</template>
```

See the [GraphicsContext guide](/guide/elements/graphics-context) for details.

### WebGPU Renderer

PixiJS v8 supports WebGPU. Opt in via the `preference` prop on `<Application>`:

```vue
<Application :width="800" :height="600" preference="webgpu">
  <!-- your scene -->
</Application>
```

### Assets Error Handling

The `<assets>` component supports an `@error` event and an `#error` slot:

```vue
<assets :urls="['/missing.png']" @error="handleError">
  <template #error="{ error }">
    <text :style="{ fill: 'red' }">Failed to load: {{ error.message }}</text>
  </template>
</assets>
```
