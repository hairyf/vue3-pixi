<script lang="ts" setup>
import { Geometry, Shader } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const rotation = ref(0)

const vertex = `
in vec2 aPosition;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

void main() {
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}
`

const fragment = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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

@vertex
fn main(
    @location(0) aPosition : vec2<f32>,
) -> @builtin(position) vec4<f32> {
    var mvp = globalUniforms.projectionMatrix
        * globalUniforms.worldTransformMatrix
        * localUniforms.uTransformMatrix;
    return vec4<f32>(mvp * vec3<f32>(aPosition, 1.0), 1.0);
};

@fragment
fn main() -> @location(0) vec4<f32> {
    return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
`

const geometry = new Geometry({
  attributes: {
    aPosition: [-100, -50, 100, -50, 0, 100],
  },
})

const shader = Shader.from({
  gl: { vertex, fragment },
  gpu: {
    vertex: { entryPoint: 'main', source },
    fragment: { entryPoint: 'main', source },
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
