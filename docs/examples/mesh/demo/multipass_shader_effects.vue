<script lang="ts" setup>
import type { Mesh } from 'pixi.js'
import { Geometry, RenderTexture, Shader } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()

const vertex = `
precision mediump float;

attribute vec2 aPosition;
attribute vec2 aUV;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

varying vec2 vUvs;

void main() {
    vUvs = aUV;
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}
`

const gridFragment = `
precision mediump float;
varying vec2 vUvs;
uniform float zoom;

void main() {
    vec2 uv = (vUvs - vec2(0.5)) * 2.0;
    vec2 gUv = floor(uv * zoom);
    vec4 color1 = vec4(0.8, 0.8, 0.8, 1.0);
    vec4 color2 = vec4(0.4, 0.4, 0.4, 1.0);
    vec4 outColor = mod(gUv.x + gUv.y, 2.0) < 0.5 ? color1 : color2;
    gl_FragColor = outColor;
}
`

const rippleFragment = `
precision mediump float;
varying vec2 vUvs;
uniform float amount;
uniform float phase;
uniform sampler2D texIn;

void main() {
    vec2 uv = vUvs;
    float distance = length(uv - vec2(0.5));
    vec4 color = texture2D(texIn, uv);
    color.rgb *= sin(distance * 25.0 + phase) * amount + 1.0;
    gl_FragColor = color;
}
`

const noiseFragment = `
precision mediump float;
varying vec2 vUvs;
uniform float limit;
uniform sampler2D noise;

void main() {
    float color = texture2D(noise, vUvs).r;
    color = step(limit, color);
    gl_FragColor = vec4(color);
}
`

const waveFragment = `
precision mediump float;
varying vec2 vUvs;
uniform float amplitude;
uniform float time;

void main() {
    vec2 uv = (vUvs - vec2(0.5)) * 2.0;
    vec3 outColor = vec3(0.0);
    outColor += 5.0 / length(uv.y * 200.0 - 50.0 * sin(uv.x * 0.25 + time * 0.25) * amplitude);
    outColor += 4.0 / length(uv.y * 300.0 - 100.0 * sin(uv.x * 0.5 + time * 0.5) * amplitude * 1.2);
    outColor += 3.0 / length(uv.y * 400.0 - 150.0 * sin(uv.x * 0.75 + time * 0.75) * amplitude * 1.4);
    outColor += 2.0 / length(uv.y * 500.0 - 200.0 * sin(uv.x + time) * amplitude * 1.6);
    gl_FragColor = vec4(outColor, 1.0);
}
`

const combineFragment = `
precision mediump float;
varying vec2 vUvs;

uniform sampler2D texRipple;
uniform sampler2D texNoise;
uniform sampler2D texWave;

void main() {
    vec4 ripple = texture2D(texRipple, vUvs);
    vec4 noise = texture2D(texNoise, vUvs);
    vec4 wave = texture2D(texWave, vUvs);
    gl_FragColor = mix(ripple, wave, noise.r);
}
`

const geometry = new Geometry({
  attributes: {
    aPosition: [0, 0, 200, 0, 200, 200, 0, 200],
    aUV: [0, 0, 1, 0, 1, 1, 0, 1],
  },
  indexBuffer: [0, 1, 2, 0, 2, 3],
})

const gridTexture = RenderTexture.create({ width: 200, height: 200 })
const rippleTexture = RenderTexture.create({ width: 200, height: 200 })
const noiseTexture = RenderTexture.create({ width: 200, height: 200 })
const waveTexture = RenderTexture.create({ width: 200, height: 200 })

const gridShader = Shader.from({
  gl: { vertex, fragment: gridFragment },
  resources: {
    gridUniforms: {
      zoom: { type: 'f32', value: 10 },
    },
  },
})

const rippleShader = Shader.from({
  gl: { vertex, fragment: rippleFragment },
  resources: {
    rippleUniforms: {
      amount: { type: 'f32', value: 0.5 },
      phase: { type: 'f32', value: 0 },
    },
    texIn: gridTexture.source,
  },
})

const noiseShader = ref<Shader>()
const noiseQuadRef = ref<Mesh>()

const waveShader = Shader.from({
  gl: { vertex, fragment: waveFragment },
  resources: {
    waveUniforms: {
      amplitude: { type: 'f32', value: 0.75 },
      time: { type: 'f32', value: 0 },
    },
  },
})

const combineShader = ref<Shader>()

const gridQuadRef = ref<Mesh>()
const rippleQuadRef = ref<Mesh>()
const waveQuadRef = ref<Mesh>()

let time = 0

onTick(() => {
  const renderer = app.value?.renderer
  if (!renderer)
    return

  // Initialize noise shader lazily (needs perlin texture loaded)
  if (!noiseShader.value)
    return
  if (!combineShader.value)
    return

  time += 1 / 60

  gridShader.resources.gridUniforms.uniforms.zoom = Math.sin(time) * 5 + 10
  rippleShader.resources.rippleUniforms.uniforms.phase = -time
  waveShader.resources.waveUniforms.uniforms.time = time
  noiseShader.value.resources.noiseUniforms.uniforms.limit = Math.sin(time * 0.5) * 0.35 + 0.5

  if (gridQuadRef.value) {
    renderer.render({ container: gridQuadRef.value, target: gridTexture })
  }
  if (rippleQuadRef.value) {
    renderer.render({ container: rippleQuadRef.value, target: rippleTexture })
  }
  if (noiseQuadRef.value) {
    renderer.render({ container: noiseQuadRef.value, target: noiseTexture })
  }
  if (waveQuadRef.value) {
    renderer.render({ container: waveQuadRef.value, target: waveTexture })
  }
})
</script>

<template>
  <assets
    alias="perlin"
    entry="https://pixijs.com/assets/perlin.jpg"
    @loaded="(textures: any) => {
      const perlinTexture = textures
      noiseShader = Shader.from({
        gl: { vertex, fragment: noiseFragment },
        resources: {
          noiseUniforms: {
            limit: { type: 'f32', value: 0.5 },
          },
          noise: perlinTexture.source,
        },
      })
      combineShader = Shader.from({
        gl: { vertex, fragment: combineFragment },
        resources: {
          texRipple: rippleTexture.source,
          texNoise: noiseTexture.source,
          texWave: waveTexture.source,
        },
      })
    }"
  >
    <container :x="10" :y="10">
      <Mesh ref="gridQuadRef" :geometry="geometry" :shader="gridShader" />
    </container>
    <container :x="220" :y="10">
      <Mesh ref="rippleQuadRef" :geometry="geometry" :shader="rippleShader" />
    </container>
    <container :x="10" :y="220">
      <Mesh v-if="noiseShader" ref="noiseQuadRef" :geometry="geometry" :shader="noiseShader" />
    </container>
    <container :x="10" :y="430">
      <Mesh ref="waveQuadRef" :geometry="geometry" :shader="waveShader" />
    </container>
    <Mesh
      v-if="combineShader"
      :geometry="geometry"
      :shader="combineShader"
      :x="430"
      :y="220"
    />
  </assets>
</template>
