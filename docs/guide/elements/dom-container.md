# DOMContainer

Creates a [DOMContainer](https://pixijs.download/release/docs/scene.DOMContainer.html)

Embeds real HTML DOM elements (textarea, input, video, etc.) into the PixiJS scene graph. The DOM element is positioned and transformed to match the container's world transform, so it moves, rotates, and scales with the rest of the scene.

<demo src="../../../examples/dom-container/demo/html_text-area.vue" />

## Usage

Create the DOM element imperatively and pass it via the `element` prop:

```vue
<script setup>
import { onMounted, ref } from 'vue'

const element = ref<HTMLElement>()

onMounted(() => {
  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Type here...'
  input.style.fontSize = '16px'
  input.style.padding = '8px'
  input.style.borderRadius = '4px'
  element.value = input
})
</script>

<template>
  <dom-container
    v-if="element"
    :element="element"
    :x="100"
    :y="100"
  />
</template>
```

### Rotation and Anchor

DOMContainer supports standard container transforms including rotation and anchor:

```vue
<template>
  <dom-container
    v-if="element"
    :element="element"
    :anchor="0.5"
    :rotation="0.2"
    :x="200"
    :y="200"
  />
</template>
```

## API

### DOMContainer Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| element | ^[object]`HTMLElement` | `undefined` | The HTML DOM element to embed in the scene. |

> more props in [Container Attributes](/guide/elements/container#container-attributes) and [DOMContainer](https://pixijs.download/release/docs/scene.DOMContainer.html)

### DOMContainer Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: DOMContainer): void` | Custom render function |

> more events in [Container Events](/guide/elements/container#container-events)

## Notes

- The DOM element is overlaid on top of the canvas using CSS transforms. It is not rendered into the WebGL/WebGPU context.
- Interactive HTML elements (inputs, textareas, buttons) work natively since they remain real DOM nodes.
- Useful for forms, text inputs, or embedded HTML content that needs to track a position in the scene.
