# Filters

Filters apply post-processing visual effects to any container or sprite. In vue3-pixi, filters are declared as child elements of the container they apply to.

## Built-in Filters

vue3-pixi provides dedicated elements for all built-in PixiJS v8 filters:

| Element | PixiJS Class | Description |
| --- | --- | --- |
| `<alpha-filter>` | `AlphaFilter` | Applies alpha (transparency) to the container |
| `<blur-filter>` | `BlurFilter` | Gaussian blur effect |
| `<color-matrix-filter>` | `ColorMatrixFilter` | Color transformation via a 5x4 matrix |
| `<displacement-filter>` | `DisplacementFilter` | Displacement mapping using a sprite texture |
| `<noise-filter>` | `NoiseFilter` | Random noise overlay |
| `<mask-filter>` | `MaskFilter` | Applies a mask as a filter |

## Usage

Add a filter element as a child of the container or sprite you want to affect:

```vue
<template>
  <sprite texture="myImage" :x="100" :y="100">
    <blur-filter :blur="8" />
  </sprite>
</template>
```

### BlurFilter

```vue
<template>
  <sprite texture="photo">
    <blur-filter :blur="4" :quality="4" />
  </sprite>
</template>
```

### AlphaFilter

```vue
<template>
  <container>
    <alpha-filter :alpha="0.5" />
    <sprite texture="a" />
    <sprite texture="b" :x="50" />
  </container>
</template>
```

### ColorMatrixFilter

Access the filter instance via a ref to call methods or manipulate the matrix directly:

```vue
<script setup>
import type { ColorMatrixFilter } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const filterRef = ref<ColorMatrixFilter>()
let count = 0

onTick(() => {
  if (!filterRef.value)
    return
  count += 0.1
  const { matrix } = filterRef.value
  matrix[1] = Math.sin(count) * 3
  matrix[2] = Math.cos(count)
})
</script>

<template>
  <container>
    <color-matrix-filter ref="filterRef" />
    <sprite texture="photo" />
  </container>
</template>
```

### DisplacementFilter

DisplacementFilter requires a sprite reference for the displacement map:

```vue
<script setup>
import { ref } from 'vue'

const displacementSprite = ref()
</script>

<template>
  <sprite texture="myImage">
    <displacement-filter
      v-if="displacementSprite"
      :sprite="displacementSprite"
      :scale="{ x: 60, y: 120 }"
    />
  </sprite>
  <sprite ref="displacementSprite" texture="displacementMap" />
</template>
```

### NoiseFilter

```vue
<template>
  <sprite texture="photo">
    <noise-filter :noise="0.5" :seed="Math.random()" />
  </sprite>
</template>
```

## Custom / External Filters

Use the generic `<filter>` element with the `:is` prop to apply any filter instance, including third-party filters from `pixi-filters`:

```vue
<script setup>
import { DropShadowFilter } from 'pixi-filters'

const shadow = new DropShadowFilter({
  offset: { x: 4, y: 4 },
  blur: 2,
  alpha: 0.6,
  color: 0x000000,
})
</script>

<template>
  <sprite texture="myImage">
    <filter :is="shadow" />
  </sprite>
</template>
```

You can also pass a factory function to `:is` for lazy construction:

```vue
<script setup>
import { GlowFilter } from 'pixi-filters'

const createGlow = () => new GlowFilter({ distance: 15, outerStrength: 2 })
</script>

<template>
  <text :style="{ fontSize: 48, fill: 'white' }">
    Glowing!
    <filter :is="createGlow" />
  </text>
</template>
```

## Advanced Blend Modes

PixiJS v8 supports advanced blend modes (e.g., `'color-burn'`, `'color-dodge'`, `'soft-light'`) when you import the extension:

```ts
import 'pixi.js/advanced-blend-modes'
```

After importing, set blend modes on any element:

```vue
<template>
  <sprite texture="overlay" blend-mode="color-burn" />
</template>
```

## API

### BlurFilter Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blur | ^[number] | `8` | The strength of the blur. |
| quality | ^[number] | `4` | The quality of the blur (number of passes). |

### AlphaFilter Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| alpha | ^[number] | `1` | The alpha value (0 to 1). |

### DisplacementFilter Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| sprite | ^[object]`Sprite` | required | The sprite used as the displacement map. |
| scale | ^[number] ^[object]`{ x, y }` | `20` | The scale of the displacement. |

### NoiseFilter Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| noise | ^[number] | `0.5` | The amount of noise (0 to 1). |
| seed | ^[number] | `Math.random()` | Random seed for the noise pattern. |

### Filter (generic) Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| is | ^[object]`Filter` ^[function]`(props) => Filter` | `undefined` | A filter instance or factory function. |
