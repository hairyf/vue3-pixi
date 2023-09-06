<h1 align="center">Vue 3 Pixi Projection</h1>

<p align="center">
  <strong>Vue for PixiJS Projection based on <a href="https://github.com/hairyf/vue3-pixi">vue3-pixi</a> </strong>
</p>

<br />

## Try it Online

> TODO

## Install

```sh
pnpm install vue3-pixi-projection
```

## Usage

using `vue3-pixi-projection` requires loading the module before using `vue3-pixi`

```ts
import { renderer } from 'vue3-pixi'
import ProjectionRenderer from 'vue3-pixi-projection'

renderer.use(ProjectionRenderer)
```

in template use `camera-3d` and `sprite-3d` components:

```vue
<template>
  <camera-3d
    :focus="400"
    :near="10"
    :far="10000"
    :orthographic="false"
  >
    <sprite-3d
      texture="https://pixijs.io/examples/examples/assets/bunny.png"
      :anchor="0.5"
      :width="100"
      :position-3d-z="100"
      :height="140"
    />
  </camera-3d>
</template>
```

## Elements

- Camera3d
- Container2d
- Container3d
- Sprite2d
- Sprite2s
- Sprite3d
- Text2d
- Text2s
- Text3d
- TilingSprite2d
- SimpleMesh2d
- SimpleMesh3d2d
- Mesh2d
- Mesh3d2d

## converts

conversion will cause unstable behavior of the renderer and is not recommended. Please use elements with specific suffixes

## License

[MIT](LICENSE) License © 2022-PRESENT [hairyf](https://github.com/hairyf)
