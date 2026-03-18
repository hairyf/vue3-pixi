<script lang="ts" setup>
import { BufferUsage, Geometry, Buffer as PixiBuffer, Shader } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const vertex = `
in vec2 aPosition;
in vec2 aUV;
in vec2 aPositionOffset;

out vec2 vUV;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

void main() {
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition + aPositionOffset, 1.0)).xy, 0.0, 1.0);
    vUV = aUV;
}
`

const fragment = `
in vec2 vUV;
uniform sampler2D uTexture;
uniform float time;

void main() {
    gl_FragColor = texture(uTexture, vUV + sin((time + (vUV.x) * 14.0)) * 0.1);
}
`

const source = `
struct GlobalUniforms {
    uProjectionMatrix:mat3x3<f32>,
    uWorldTransformMatrix:mat3x3<f32>,
    uWorldColorAlpha: vec4<f32>,
    uResolution: vec2<f32>,
}

struct LocalUniforms {
    uTransformMatrix:mat3x3<f32>,
    uColor:vec4<f32>,
    uRound:f32,
}

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
@group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) vUV: vec2<f32>,
};

@vertex
fn mainVert(
    @location(0) aPosition : vec2<f32>,
    @location(1) aUV : vec2<f32>,
    @location(2) aPositionOffset : vec2<f32>,
) -> VertexOutput {
    var mvp = globalUniforms.uProjectionMatrix
        * globalUniforms.uWorldTransformMatrix
        * localUniforms.uTransformMatrix;

    var output: VertexOutput;
    output.position = vec4<f32>(mvp * vec3<f32>(aPosition + aPositionOffset, 1.0), 1.0);
    output.vUV = aUV;
    return output;
};

struct WaveUniforms {
    time:f32,
}

@group(2) @binding(1) var uTexture : texture_2d<f32>;
@group(2) @binding(2) var uSampler : sampler;
@group(2) @binding(3) var<uniform> waveUniforms : WaveUniforms;

@fragment
fn mainFrag(
    @location(0) vUV: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, vUV + sin((waveUniforms.time + (vUV.x) * 14.0)) * 0.1);
};
`

const totalTriangles = 1000

const instancePositionBuffer = new PixiBuffer({
  data: new Float32Array(totalTriangles * 2),
  usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
})

const triangles: { x: number, y: number, speed: number }[] = []

for (let i = 0; i < totalTriangles; i++) {
  triangles.push({
    x: 800 * Math.random(),
    y: 600 * Math.random(),
    speed: 1 + Math.random() * 2,
  })
}

const geometry = new Geometry({
  attributes: {
    aPosition: [-10, -10, 10, -20, 10, 10],
    aUV: [0, 0, 1, 0, 1, 1, 0, 1],
    aPositionOffset: {
      buffer: instancePositionBuffer,
      instance: true,
    },
  },
  instanceCount: totalTriangles,
})

const shader = ref<Shader>()

onTick(() => {
  const data = instancePositionBuffer.data as Float32Array
  let count = 0

  for (let i = 0; i < totalTriangles; i++) {
    const triangle = triangles[i]

    triangle.x += triangle.speed
    triangle.x %= 800

    data[count++] = triangle.x
    data[count++] = triangle.y
  }

  instancePositionBuffer.update()
})
</script>

<template>
  <assets
    alias="spinnyBG"
    entry="https://pixijs.com/assets/bg_scene_rotate.jpg"
    @loaded="(textures: any) => {
      const tex = textures
      shader = Shader.from({
        gl: { vertex, fragment },
        gpu: {
          vertex: { entryPoint: 'mainVert', source },
          fragment: { entryPoint: 'mainFrag', source },
        },
        resources: {
          uTexture: tex.source,
          uSampler: tex.source.style,
          waveUniforms: {
            time: { value: 1, type: 'f32' },
          },
        },
      })
    }"
  >
    <mesh v-if="shader" :geometry="geometry" :shader="shader" />
  </assets>
</template>
