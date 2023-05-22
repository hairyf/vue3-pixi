<script lang="ts" setup>
import { Assets } from 'pixi.js'
import { computed } from 'vue'
import { useScreen } from 'vue3-pixi'

// Add the assets to load
Assets.add('flowerTop', 'https://beta.pixijs.com/assets/flowerTop.png')
Assets.add('eggHead', 'https://beta.pixijs.com/assets/eggHead.png')

// Load the assets and get a resolved promise once both are loaded
const textures = await Assets.load(['flowerTop', 'eggHead'])

const screen = useScreen()

// some common props
const commonProps = computed(() => ({
  y: screen.value.height / 2,
  anchor: 0.5,
}))
</script>

<template>
  <sprite v-bind="commonProps" :texture="textures.flowerTop" :x="screen.width * 0.25" />
  <sprite v-bind="commonProps" :texture="textures.eggHead" :x="screen.width * 0.75" />
</template>

