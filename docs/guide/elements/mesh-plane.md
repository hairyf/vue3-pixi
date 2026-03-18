# MeshPlane

Creates a [MeshPlane](https://pixijs.download/release/docs/scene.MeshPlane.html)

A mesh that renders a texture mapped to a plane with configurable vertex density. Useful for creating distortion effects, bent surfaces, and animated deformations.

## API

### MeshPlane Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`Texture` | `undefined` | The texture to use on the MeshPlane. |
| vertices-x | ^[number] | `10` | Number of vertices along the X axis. |
| vertices-y | ^[number] | `10` | Number of vertices along the Y axis. |
| auto-resize | ^[boolean] | `true` | Whether geometry auto-resizes when texture dimensions change. |

> more props in [Container Attributes](/guide/elements/container#container-attributes) and [MeshPlane](https://pixijs.download/release/docs/scene.MeshPlane.html)

### MeshPlane Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: MeshPlane): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)
