<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import type { ResolverManifest } from 'pixi.js'
import { Assets } from 'pixi.js'
import { computed, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

// manifest example
const manifestExample: ResolverManifest = {
  bundles: [
    {
      name: 'load-screen',
      assets: [
        { name: 'flowerTop', srcs: 'https://beta.pixijs.com/assets/flowerTop.png' },
      ],
    },
    {
      name: 'game-screen',
      assets: [
        { name: 'eggHead', srcs: 'https://beta.pixijs.com/assets/eggHead.png' },
      ],
    },
  ],
}

await Assets.init({ manifest: manifestExample })

// bundles can be loaded in the background too!
Assets.backgroundLoadBundle(['load-screen', 'game-screen'])

// the current scene to be presented
const bundle = ref('load-screen')
const screen = useScreen()

Assets.loadBundle('game-screen')
// Wait here until you get the assets
// If the user spends enough time in the load screen by the time they reach the game screen
// the assets are completely loaded and the promise resolves instantly!
const textures = computedAsync(() => Assets.loadBundle(bundle.value))

// some common props
const center = computed(() => ({
  x: screen.value.width / 2,
  y: screen.value.height / 2,
  anchor: 0.5,
  cursor: 'pointer',
}))
</script>

<template>
  <!-- scenario 1 -->
  <template v-if="bundle === 'load-screen'">
    <sprite v-bind="center" :texture="textures?.flowerTop" @click="bundle = 'game-screen'" />
  </template>
  <!-- scenario 2 -->
  <template v-if="bundle === 'game-screen'">
    <sprite v-bind="center" :texture="textures?.eggHead" @click="bundle = 'load-screen'" />
  </template>
</template>

