# MeshSimple

Creates a [MeshSimple](https://pixijs.download/release/docs/scene.MeshSimple.html)

A simplified mesh class that provides an easy way to create and manipulate textured meshes with direct vertex control. Perfect for creating custom shapes, deformable sprites, and simple 2D effects.

## API

### MeshSimple Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`Texture` | `undefined` | The texture to use on the MeshSimple. |
| vertices | ^[object]`Float32Array` | `undefined` | Array of vertex positions as x,y pairs. |
| uvs | ^[object]`Float32Array` | `undefined` | Array of UV coordinates for texture mapping. |
| indices | ^[object]`Uint32Array` | `undefined` | Array of indices defining triangles. |
| topology | ^[enum]`Topology` | `'triangle-list'` | How vertices are connected to form triangles. |
| auto-update | ^[boolean] | `true` | Whether the vertex buffer auto-updates each frame. |

> more props in [Container Attributes](/guide/elements/container#container-attributes) and [MeshSimple](https://pixijs.download/release/docs/scene.MeshSimple.html)

### MeshSimple Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: MeshSimple): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)
