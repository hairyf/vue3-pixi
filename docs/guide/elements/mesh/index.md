# Mesh

Creates a [Mesh](https://pixijs.download/release/docs/PIXI.Mesh.html)

This component empowers you to have maximum flexibility to render any kind of WebGL visuals you can think of. This component assumes a certain level of WebGL knowledge.

Pretty much all WebGL can be broken down into the following:

- Geometry - The structure and data for the mesh. This can include anything from positions, uvs, normals, colors etc.
- Shader - This is the shader that PixiJS will render the geometry with (attributes in the shader must match the geometry)
- State - This is the state of WebGL required to render the mesh.

<demo src="./demo/basic.vue" :width="300" :height="300" />