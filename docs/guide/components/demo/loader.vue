<script lang="ts" setup>
import { Loader, useScreen } from 'vue3-pixi'
const screen = useScreen()
</script>

<template>
  <Loader :resources="['/assets/metal_slug.png']">
    <template #fallback="{ progress }">
      <text :x="120" :y="120" :anchor="0.5">
        {{ `Loading... ${progress}` }}
      </text>
    </template>
    <sprite
      texture="/assets/metal_slug.png"
      :x="screen.width / 2"
      :y="screen.height / 2"
      :anchor="0.5"
      :scale="0.8"
    />
  </Loader>
</template>
