# PerspectiveMesh

Creates a [PerspectiveMesh](https://pixijs.download/release/docs/scene.PerspectiveMesh.html)

A mesh variant that supports 3D-like perspective distortion by mapping a texture onto four arbitrary corner points. This is useful for simulating rotations in 3D space, card flips, or any transformation that requires projecting a flat image onto a non-rectangular quad.

<demo src="../../../examples/mesh/demo/perspective_3d.vue" />

## Usage

The key method is `setCorners()`, which takes the x/y positions of all four corners (top-left, top-right, bottom-right, bottom-left). Call it each frame to animate the perspective transformation.

```vue
<script setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const meshRef = ref()

onTick(() => {
  if (!meshRef.value)
    return
  // setCorners(x0, y0, x1, y1, x2, y2, x3, y3)
  meshRef.value.setCorners(
    10,
    10, // top-left
    200,
    20, // top-right
    190,
    180, // bottom-right
    0,
    170, // bottom-left
  )
})
</script>

<template>
  <perspective-mesh
    ref="meshRef"
    texture="myTexture"
    :x="100"
    :y="100"
  />
</template>
```

## API

### PerspectiveMesh Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`Texture` | `undefined` | The texture to render on the mesh. |
| anchor | <api-point /> | `0` | The origin point of the mesh. |
| anchor-x | ^[number] | `0` | The x-axis origin point. |
| anchor-y | ^[number] | `0` | The y-axis origin point. |

> more props in [Container Attributes](/guide/elements/container#container-attributes) and [PerspectiveMesh](https://pixijs.download/release/docs/scene.PerspectiveMesh.html)

### PerspectiveMesh Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: PerspectiveMesh): void` | Custom render function |

> more events in [Container Events](/guide/elements/container#container-events)

### Instance Methods

| Name | Signature | Description |
| --- | --- | --- |
| setCorners | `(x0, y0, x1, y1, x2, y2, x3, y3): void` | Set the four corner positions (top-left, top-right, bottom-right, bottom-left) to apply perspective distortion. |
