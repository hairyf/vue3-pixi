<script lang="ts" setup>
import { Geometry, Shader } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const rotation = ref(0)

const vertex = `
in vec2 aPosition;
in vec3 aColor;

out vec3 vColor;
uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

void main() {
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
    vColor = aColor;
}
`

const fragment = `
in vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.0);
}
`

const source = `
struct GlobalUniforms {
    projectionMatrix:mat3x3<f32>,
    worldTransformMatrix:mat3x3<f32>,
    worldColorAlpha: vec4<f32>,
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
    @builtin(position) position : vec4<f32>,
    @location(0) vColor : vec3<f32>,
}

@vertex
fn mainVert(
    @location(0) aPosition : vec2<f32>,
    @location(1) aColor : vec3<f32>,
) -> VertexOutput {
    var mvp = globalUniforms.projectionMatrix
        * globalUniforms.worldTransformMatrix
        * localUniforms.uTransformMatrix;

    return VertexOutput(
        vec4<f32>(mvp * vec3<f32>(aPosition, 1.0), 1.0),
        aColor,
    );
};

@fragment
fn mainFrag(input: VertexOutput) -> @location(0) vec4<f32>{
    return vec4<f32>(input.vColor, 1.0);
}
`

const geometry = new Geometry({
  attributes: {
    aPosition: [-100, -50, 100, -50, 0, 100],
    aColor: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  },
})

const shader = Shader.from({
  gl: { vertex, fragment },
  gpu: {
    vertex: { entryPoint: 'mainVert', source },
    fragment: { entryPoint: 'mainFrag', source },
  },
})

onTick((ticker) => {
  rotation.value += 0.01 * ticker.deltaTime
})
</script>

<template>
  <mesh
    :geometry="geometry"
    :shader="shader"
    :x="400"
    :y="300"
    :rotation="rotation"
  />
</template>
