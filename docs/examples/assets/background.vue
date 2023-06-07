<script lang="ts" setup>
import { computedAsync } from '@vueuse/core'
import type { Texture } from 'pixi.js'
import { Assets } from 'pixi.js'
import { computed, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

// Add the assets to load
Assets.add('flowerTop', 'https://beta.pixijs.com/assets/flowerTop.png')
Assets.add('eggHead', 'https://beta.pixijs.com/assets/eggHead.png')

// Allow the assets to load in the background
Assets.backgroundLoad(['flowerTop', 'eggHead'])

const screen = useScreen()

const current = ref('eggHead')
const changed = computed(() => current.value === 'eggHead' ? 'flowerTop' : 'eggHead')

// If the background load hasn't loaded this asset yet, calling load forces this asset to load now.
const texture = computedAsync<Texture>(() => Assets.load(current.value))
</script>

<template>
  <sprite
    :texture="texture" :anchor="0.5"
    :x="screen.width / 2" :y="screen.height / 2"
    cursor="pointer"
    @click="current = changed"
  />
</template>
