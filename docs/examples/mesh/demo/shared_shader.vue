<script lang="ts" setup>
import { Assets, Geometry, Shader } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const quadRotation = ref(0)
const triRotation = ref(0)
const ready = ref(false)
let shader: Shader
let quadGeometry: Geometry
let triGeometry: Geometry

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
    gl_FragColor = texture2D(uTexture, vUV).bgra;
}
`

onMounted(async () => {
  const texture = await Assets.load('https://pixijs.com/assets/bg_rotate.jpg')

  quadGeometry = new Geometry({
    attributes: {
      aPosition: [-100, -100, 100, -100, 100, 100, -100, 100],
      aUV: [0, 0, 1, 0, 1, 1, 0, 1],
    },
    indexBuffer: [0, 1, 2, 0, 2, 3],
  })

  triGeometry = new Geometry({
    attributes: {
      aPosition: [-100, -100, 100, -100, 100, 100],
      aUV: [0, 0, 1, 0, 1, 1],
    },
  })

  shader = Shader.from({
    gl: { vertex, fragment },
    resources: {
      uTexture: texture.source,
    },
  })

  ready.value = true
})

onTick((ticker) => {
  triRotation.value += 0.01 * ticker.deltaTime
  quadRotation.value -= 0.01 * ticker.deltaTime
})
</script>

<template>
  <template v-if="ready">
    <mesh
      :geometry="quadGeometry"
      :shader="shader"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :rotation="quadRotation"
    />
    <mesh
      :geometry="triGeometry"
      :shader="shader"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :scale-x="2"
      :scale-y="2"
      :rotation="triRotation"
    />
  </template>
</template>
