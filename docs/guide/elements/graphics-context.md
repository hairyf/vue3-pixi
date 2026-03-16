# GraphicsContext

Creates a [GraphicsContext](https://pixijs.download/release/docs/scene.GraphicsContext.html)

GraphicsContext holds shareable drawing instructions that can be reused across multiple Graphics instances. This is useful when you want several Graphics objects to render the same shape without duplicating the drawing commands.

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <!-- Define shared drawing instructions -->
  <graphics-context
    ref="sharedCtx"
    @effect="(ctx) => ctx.rect(0, 0, 50, 50).fill('red')"
  />

  <!-- Reuse the context across multiple Graphics instances -->
  <graphics :context="sharedCtx" :x="0" :y="0" />
  <graphics :context="sharedCtx" :x="100" :y="0" />
  <graphics :context="sharedCtx" :x="200" :y="0" />
</template>
```

## Use Cases

- **Repeated shapes**: draw the same shape in multiple places without duplicating draw calls
- **Texture fills**: define a context with texture-based fills and share it
- **Performance**: reduce GPU overhead by sharing geometry data between instances

## API

### GraphicsContext Attributes

GraphicsContext has no unique props beyond the standard container props.

> See [PixiJS GraphicsContext](https://pixijs.download/release/docs/scene.GraphicsContext.html) for inherited properties.

### GraphicsContext Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: GraphicsContext): void` | Custom effect function for defining draw commands |

## Example

See the [Texture Fill example](/examples/graphics/texture-fill) for a demo using GraphicsContext with texture-based fills.
