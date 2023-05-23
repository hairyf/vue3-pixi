<script lang="ts" setup>
import { Assets } from 'pixi.js'
import { useScreen } from 'vue3-pixi'
const texture = await Assets.load('https://beta.pixijs.com/assets/bunny.png')

const screen = useScreen()
</script>

<template>
  <sprite :texture="texture" :anchor="0.5" :x="screen.width / 2" :y="screen.height / 2" />
</template>
