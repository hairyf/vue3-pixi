<script setup>
import { Geometry, Shader, Texture } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const geometry = new Geometry()
  .addAttribute('aVertexPosition', // the attribute name
    [
      -100, -100, // x, y
      100, -100, // x, y
      100, 100,
      -100, 100, // x, y
    ],
    2, // the size of the attribute
  )
  .addAttribute('aUvs', // the attribute name
    [
      0, 0, // u, v
      1, 0, // u, v
      1, 1,
      0, 1, // u, v
    ],
    2, // the size of the attribute
  )
  .addIndex([0, 1, 2, 0, 2, 3])

const vertexSrc = `
  precision mediump float;

  attribute vec2 aVertexPosition;
  attribute vec2 aUvs;

  uniform mat3 translationMatrix;
  uniform mat3 projectionMatrix;

  varying vec2 vUvs;

  void main() {
    vUvs = aUvs;
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
  }
`
const fragmentSrc = `
  precision mediump float;

  varying vec2 vUvs;

  uniform sampler2D uSampler2;
  uniform float time;

  void main() {

    gl_FragColor = texture2D(uSampler2, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
  }
`

const uniforms = {
  uSampler2: Texture.from('/assets/bg_mesh.jpg'),
  time: 0,
}

const shader = Shader.from(vertexSrc, fragmentSrc, uniforms)

const rotation = ref(0)

onTick((delta) => {
  rotation.value += 0.01 * delta
  shader.uniforms.time += 0.1 * delta
})
</script>

<template>
  <mesh
    :position="150"
    :geometry="geometry"
    :shader="shader"
    :rotation="rotation"
  />
</template>
