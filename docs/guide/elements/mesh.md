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

> more props in [Container Attributes](/guide/elements/container#container-attributes) and [Mesh](https://pixijs.download/release/docs/scene.Mesh.html)

### Mesh Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: Mesh): void` | Call your drawing functions on the Mesh instance here |

> more events in [Container Events](/guide/elements/container#container-events)

## Custom Shaders

PixiJS v8 supports both GLSL (WebGL) and WGSL (WebGPU) shaders. Create shaders imperatively in `<script setup>` and pass them to `<mesh>`:

```vue
<script setup>
import { Geometry, Shader } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const rotation = ref(0)

const geometry = new Geometry({
  attributes: {
    aPosition: [-100, -50, 100, -50, 0, 100],
  },
})

const shader = Shader.from({
  gl: {
    vertex: `
      in vec2 aPosition;
      uniform mat3 uProjectionMatrix;
      uniform mat3 uWorldTransformMatrix;
      uniform mat3 uTransformMatrix;
      void main() {
        mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
        gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
      }
    `,
    fragment: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `,
  },
})

onTick(({ deltaTime }) => {
  rotation.value += 0.01 * deltaTime
})
</script>

<template>
  <mesh :geometry="geometry" :shader="shader" :x="400" :y="300" :rotation="rotation" />
</template>
```

### Dual GLSL + WGSL Support

Provide both `gl` and `gpu` properties in `Shader.from()` to support both WebGL and WebGPU renderers:

```ts
const shader = Shader.from({
  gl: { vertex: glslVertex, fragment: glslFragment },
  gpu: {
    vertex: { entryPoint: 'main', source: wgslSource },
    fragment: { entryPoint: 'main', source: wgslSource },
  },
})
```

### Texture Sampling

When a shader needs textures, load them before creating the shader (v8 requires resources to be bound at creation time):

```ts
import { Assets, Shader } from 'pixi.js'

const texture = await Assets.load('https://example.com/image.png')

const shader = Shader.from({
  gl: { vertex, fragment },
  resources: {
    uTexture: texture.source,
  },
})
```

### Uniform Groups

Pass uniforms via the `resources` property:

```ts
const shader = Shader.from({
  gl: { vertex, fragment },
  resources: {
    myUniforms: {
      uTime: { value: 0, type: 'f32' },
      uResolution: { value: [800, 600, 1], type: 'vec3<f32>' },
    },
  },
})

// Update uniforms in onTick:
onTick(() => {
  shader.resources.myUniforms.uniforms.uTime += 0.016
})
```

### ShaderToy Pattern

You can port ShaderToy shaders by creating a fullscreen quad mesh with the standard ShaderToy uniforms (`iResolution`, `iTime`, `iMouse`):

```vue
<script setup>
import { Geometry, Shader } from 'pixi.js'
import { onTick, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()

const geometry = new Geometry({
  attributes: {
    aPosition: [-1, -1, 1, -1, 1, 1, -1, 1],
    aUV: [0, 0, 1, 0, 1, 1, 0, 1],
  },
  indexBuffer: [0, 1, 2, 0, 2, 3],
})

const shader = Shader.from({
  gl: {
    vertex: `#version 300 es
      in vec2 aPosition;
      uniform mat3 uProjectionMatrix;
      uniform mat3 uWorldTransformMatrix;
      uniform mat3 uTransformMatrix;
      void main() {
        mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
        gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
      }
    `,
    fragment: `#version 300 es
      precision highp float;
      uniform vec3 iResolution;
      uniform float iTime;
      out vec4 fragColor;

      void mainImage(out vec4 c, in vec2 fc) {
        vec2 uv = fc / iResolution.xy;
        c = vec4(uv, 0.5 + 0.5 * sin(iTime), 1.0);
      }

      void main() {
        mainImage(fragColor, gl_FragCoord.xy);
      }
    `,
  },
  resources: {
    shaderToyUniforms: {
      iResolution: { value: [800, 600, 1], type: 'vec3<f32>' },
      iTime: { value: 0, type: 'f32' },
    },
  },
})

onTick(() => {
  shader.resources.shaderToyUniforms.uniforms.iTime += app.value.ticker.elapsedMS / 1000
})
</script>

<template>
  <mesh
    :geometry="geometry"
    :shader="shader"
    :width="screen.width"
    :height="screen.height"
    :x="screen.width / 2"
    :y="screen.height / 2"
  />
</template>
```

See the [Shader Toy example](/examples/mesh/shader_toy) for a full raymarching demo.
