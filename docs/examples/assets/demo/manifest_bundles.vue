<script lang="ts" setup>
import type { AssetsManifest } from 'pixi.js'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const manifest: AssetsManifest = {
  bundles: [
    {
      name: 'load-screen',
      assets: [
        {
          alias: 'flowerTop',
          src: 'https://pixijs.com/assets/flowerTop.png',
        },
      ],
    },
    {
      name: 'game-screen',
      assets: [
        {
          alias: 'eggHead',
          src: 'https://pixijs.com/assets/eggHead.png',
        },
      ],
    },
  ],
}
</script>

<template>
  <assets-bundle
    :manifest="manifest"
    :background="true"
    :autoload="false"
    :entry="[
      'load-screen',
      'game-screen',
    ]"
  >
    <!-- OR use <assets entry="flowerTop"> -->
    <assets-bundle v-slot="{ data }" entry="load-screen">
      <sprite
        :texture="data.flowerTop"
        :x="screen.width / 2"
        :y="screen.height / 2"
        :anchor="0.5"
      />
    </assets-bundle>
  </assets-bundle>
</template>
