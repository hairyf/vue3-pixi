<script lang="ts" setup>
import { Assets, Geometry, GlProgram, Shader } from 'pixi.js'
import { onTick, useScreen } from 'vue3-pixi'
import { onMounted, ref } from 'vue'

const screen = useScreen()
const rot1 = ref(0)
const rot2 = ref(0)
const rot3 = ref(0)
const ready = ref(false)
let geometry: Geometry
let shader1: Shader
let shader2: Shader
let shader3: Shader

const vertex = `
in vec2 aPosition;
in vec2 aUV;

out vec2 vUV;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

void main() {
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
    vUV = aUV;
}
`

const fragment = `
in vec2 vUV;

uniform sampler2D uTexture;

void main() {
    gl_FragColor = texture2D(uTexture, vUV);
}
`

onMounted(async () => {
  const [tex1, tex2, tex3] = await Promise.all([
    Assets.load('https://pixijs.com/assets/bg_scene_rotate.jpg'),
    Assets.load('https://pixijs.com/assets/bg_rotate.jpg'),
    Assets.load('https://pixijs.com/assets/bg_displacement.jpg'),
  ])

  geometry = new Geometry({
    attributes: {
      aPosition: [-100, -100, 100, -100, 100, 100],
      aUV: [0, 0, 1, 0, 1, 1],
    },
  })

  const glProgram = GlProgram.from({ vertex, fragment })

  shader1 = new Shader({ glProgram, resources: { uTexture: tex1.source } })
  shader2 = new Shader({ glProgram, resources: { uTexture: tex2.source } })
  shader3 = new Shader({ glProgram, resources: { uTexture: tex3.source } })

  ready.value = true
})

onTick((ticker) => {
  rot1.value += 0.01 * ticker.deltaTime
  rot2.value -= 0.01 * ticker.deltaTime
  rot3.value -= 0.005 * ticker.deltaTime
})
</script>

<template>
  <template v-if="ready">
    <mesh
      :geometry="geometry"
      :shader="shader3"
      :x="screen.width * 0.75"
      :y="screen.height * 0.67"
      :scale-x="3"
      :scale-y="3"
      :rotation="rot3"
    />
    <mesh
      :geometry="geometry"
      :shader="shader2"
      :x="screen.width * 0.3"
      :y="screen.height * 0.2"
      :rotation="rot2"
    />
    <mesh
      :geometry="geometry"
      :shader="shader1"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :scale-x="2"
      :scale-y="2"
      :rotation="rot1"
    />
  </template>
</template>
