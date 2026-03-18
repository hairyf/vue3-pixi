# Migration from v7

::: tip PixiJS v8(RC)
This version of vue3-pixi targets **PixiJS v8**. All APIs, examples, and guides reflect the v8 API.
:::

Covers migrating from vue3-pixi v0.9.x (PixiJS v7) to vue3-pixi v1.0.0 (PixiJS v8).

## Backwards Compatibility

To ease migration, vue3-pixi provides **deprecation aliases** for renamed v7 elements. The old names still work but emit a console warning:

| Deprecated (v7) | Replacement (v8) |
|---|---|
| `<simple-plane>` | `<mesh-plane>` |
| `<simple-rope>` | `<mesh-rope>` |
| `<nine-slice-plane>` | `<nine-slice-sprite>` |

The `@render` event also still works as an alias for `@effect`, with a deprecation warning.

These aliases will be removed in a future major version. Update your templates to use the new names.

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

**v8 (single asset):**

```vue
<template>
  <assets alias="hero" entry="/hero.png" @loaded="onLoaded">
    <sprite texture="hero" />
  </assets>
</template>
```

**v8 (multiple assets):**

```vue
<template>
  <assets
    :entry="[
      { alias: 'hero', src: '/hero.png' },
      { alias: 'bg', src: '/background.jpg' },
    ]"
    @loaded="onLoaded"
  >
    <sprite texture="hero" />
    <sprite texture="bg" />
  </assets>
</template>
```

The `<assets>` component gates rendering of its default slot until loading completes. Use the `#fallback` slot for loading state and `#error` for error state:

```vue
<template>
  <assets alias="hero" entry="/hero.png">
    <template #default>
      <sprite texture="hero" />
    </template>
    <template #fallback="{ progress }">
      <text :style="{ fill: 'white' }">
        Loading... {{ progress }}
      </text>
    </template>
    <template #error="{ error }">
      <text :style="{ fill: 'red' }">
        {{ error.message }}
      </text>
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

The `properties` and `maxSize` options from v7 have been replaced:

```vue
<!-- v7 -->
<particle-container :max-size="10000" :properties="{ scale: true, position: true }">

<!-- v8 -->
<particle-container :dynamic-properties="{ position: true, rotation: true, vertex: true, uvs: true, color: true }">
```

Valid `dynamicProperties` keys in v8: `position`, `rotation`, `vertex`, `uvs`, `color`.

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

### Container.name to Container.label

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

### useApplication returns Ref

`useApplication()` returns a `Ref<Application>` directly, **not** an object with an `app` property:

```ts
// Correct
const app = useApplication()
app.value.renderer.render({ container: myContainer })
app.value.ticker.elapsedMS

// Wrong - will be undefined
const { app } = useApplication()
```

### Text constructor

The `Text` constructor now uses an options object instead of positional arguments:

```ts
// v7
const text = new Text('Hello', style)

// v8
const text = new Text({ text: 'Hello', style })
```

Note: `textureStyle` is a constructor-only option on `Text`. It cannot be set via the `<text>` element's props; use imperative creation if you need it.

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

### SCALE_MODES and BLEND_MODES

The `SCALE_MODES` and `BLEND_MODES` enums have been replaced with plain strings in v8:

```ts
// v7
import { BLEND_MODES, SCALE_MODES } from 'pixi.js'

texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
sprite.blendMode = BLEND_MODES.ADD

// v8
texture.source.scaleMode = 'nearest'
sprite.blendMode = 'add'
```

For advanced blend modes (`'color-dodge'`, `'color-burn'`, `'vivid-light'`, etc.), import the extension:

```ts
import 'pixi.js/advanced-blend-modes'
```

### Graphics API

The chainable `beginFill/endFill` pattern is replaced with a draw-then-fill API:

```ts
// v7
graphics
  .beginFill(0xFF0000)
  .drawRect(0, 0, 100, 100)
  .endFill()
  .beginFill(0x00FF00)
  .drawCircle(150, 50, 50)
  .endFill()

// v8
graphics
  .rect(0, 0, 100, 100)
  .fill(0xFF0000)
  .circle(150, 50, 50)
  .fill(0x00FF00)
```

## New Features

### RenderLayer

Decouples render order from the scene graph hierarchy. A child can belong to one parent in the scene graph but render in a different layer:

```vue
<script setup>
const uiLayer = ref()
</script>

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
<script setup>
const sharedCtx = ref()
</script>

<template>
  <graphics-context ref="sharedCtx" @effect="(ctx) => ctx.rect(0, 0, 50, 50).fill('red')" />
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
<assets alias="missing" entry="/missing.png" @error="handleError">
  <template #error="{ error }">
    <text :style="{ fill: 'red' }">Failed to load: {{ error.message }}</text>
  </template>
</assets>
```
