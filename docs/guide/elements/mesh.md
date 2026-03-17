# Mesh

Creates a [Mesh](https://pixijs.download/release/docs/scene.Mesh.html)

Renders arbitrary WebGL/WebGPU visuals with full control over geometry, shaders, and state.

Pretty much all rendering can be broken down into the following:

- Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc.
- Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
- State - This is the state required to render the mesh.

<demo src="./demo/mesh.vue" :width="300" :height="300" />

## API

### Mesh Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the sprite. |
| geometry | ^[object]`Geometry` | `undefined` | The geometry the mesh will use. |
| shader | ^[object]`Shader` | `undefined` | The shader the mesh will use. |

> more props in [Container Props](/guide/elements/container#container-props) and [Mesh](https://pixijs.download/release/docs/scene.Mesh.html)

### Mesh Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: Mesh): void` | Call your drawing functions on the Mesh instance here |

> more events in [Container Events](/guide/elements/container#container-events)
