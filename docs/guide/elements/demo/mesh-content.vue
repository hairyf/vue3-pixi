<script lang="ts" setup>
import { Geometry,Texture } from 'pixi.js'
import { Shader } from 'pixi.js'
import { ref } from 'vue';
import { onTick } from 'vue3-pixi';

const texture = Texture.from('https://pixijs.com/assets/bg_scene_rotate.jpg');

const rotation =ref(0)

const geometry = new Geometry({
  attributes: {
    aPosition: [
      -100,
      -100, // x, y
      100,
      -100, // x, y
      100,
      100,
    ], // x, y,,
    aColor: [1, 0, 0, 0, 1, 0, 0, 0, 1],
    aUV: [0, 0, 1, 0, 1, 1],
  },
})

const shader = Shader.from({
  gl: {
    vertex: `
        in vec2 aPosition;
        in vec3 aColor;
        in vec2 aUV;

        out vec3 vColor;
        out vec2 vUV;

        uniform mat3 uProjectionMatrix;
        uniform mat3 uWorldTransformMatrix;

        uniform mat3 uTransformMatrix;


        void main() {

            mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
            gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

            vColor = aColor;
            vUV = aUV;
        }
      `,
    fragment: `
        in vec3 vColor;
        in vec2 vUV;

        uniform sampler2D uTexture;

        void main() {
            gl_FragColor = texture2D(uTexture, vUV) * vec4(vColor, 1.0);
        }
      `,
  },
  resources: {
    uTexture: texture.source,
  },
})

onTick(() =>rotation.value += 0.01)
</script>

<template>
  <Mesh :rotation="rotation" :position="150" :geometry="geometry" :shader="shader" />
</template>
