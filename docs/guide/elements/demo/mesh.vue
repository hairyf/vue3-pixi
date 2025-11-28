<script lang="ts" setup>
import { Geometry, Shader, Texture } from 'pixi.js'
import { defineComponent, h, ref } from 'vue'
import { onTick } from 'vue3-pixi'

const MeshChild = defineComponent({
  setup() {
    const texture = Texture.from('bg_scene_rotate')

    const geometry = new Geometry({
      attributes: {
        aPosition: [-100, -100, 100, -100, 100, 100],
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

    const rotation = ref(0)

    onTick(() => rotation.value += 0.01)

    return () => h('mesh', {
      rotation: rotation.value,
      position: 150,
      geometry,
      shader,
    })
  },
})
</script>

<template>
  <assets alias="bg_scene_rotate" entry="https://pixijs.com/assets/bg_scene_rotate.jpg">
    <MeshChild />
  </assets>
</template>
