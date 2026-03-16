# RenderLayer

Creates a [RenderLayer](https://pixijs.download/release/docs/scene.RenderLayer.html)

RenderLayer decouples the render order from the scene graph hierarchy. This lets you control the visual layering of elements independently from their logical parent-child relationships.

A common use case is rendering UI elements on top of game content, even though the UI components may be nested deep within the scene graph.

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <!-- Create a layer that renders on top -->
  <render-layer ref="uiLayer" />

  <container>
    <!-- This sprite is a child of the container in the scene graph,
         but renders in the uiLayer visually -->
    <sprite
      :texture="texture"
      :parent-render-layer="uiLayer"
    />
  </container>
</template>
```

## Use Cases

- **HUD / UI layers** -- keep UI elements on top regardless of scene graph depth
- **Background layers** -- ensure backgrounds always render behind other content
- **Sorting** -- control draw order for elements that don't share a common parent

## API

### RenderLayer Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| sort-function | ^[function] | `undefined` | Custom sort function for children in this layer |

> more props in [Container Props](/guide/elements/container#container-props) and [PixiJS RenderLayer](https://pixijs.download/release/docs/scene.RenderLayer.html)

### RenderLayer Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: RenderLayer): void` | Custom effect function called each frame |

> more events in [Container Events](/guide/elements/container#container-events)

## Example

See the [Render Layer example](/examples/rendering/render_layer) for a full interactive demo.
