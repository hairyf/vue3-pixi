<script lang="ts" setup>
import { Assets, Geometry, Shader } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const rotation = ref(0)
const ready = ref(false)
let shader: Shader
let geometry: Geometry

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
  const texture = await Assets.load('https://pixijs.com/assets/bg_scene_rotate.jpg')

  geometry = new Geometry({
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
  rotation.value += 0.01 * ticker.deltaTime
})
</script>

<template>
  <mesh
    v-if="ready"
    :geometry="geometry"
    :shader="shader"
    :x="screen.width / 2"
    :y="screen.height / 2"
    :rotation="rotation"
  />
</template>
