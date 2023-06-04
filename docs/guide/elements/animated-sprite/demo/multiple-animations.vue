<script lang="ts" setup>
import type { Spritesheet, Texture } from 'pixi.js'
import { reactive } from 'vue'
import { Loader } from 'vue3-pixi'

const resource = reactive({
  spritesheet: undefined as undefined | Spritesheet,
  animation: undefined as undefined | Texture[],
})

function onResolved(sheet: Spritesheet) {
  resource.spritesheet = sheet
  resource.animation = sheet.animations['adventurer-attack1']
}

function onChangeAnimation() {
  const keys = Object.keys(resource.spritesheet!.animations)
  const randomIndex = Math.floor(Math.random() * keys.length)
  resource.animation = resource.spritesheet!.animations[keys[randomIndex]]
}
</script>

<template>
  <Loader
    :resources="{ spritesheet: '/assets/adventurer-spritesheet.json' }"
    @resolved="onResolved($event.spritesheet)"
  >
    <animated-sprite
      :textures="resource.animation"
      playing
      :animation-speed="0.1"
      :anchor="0.5"
      :x="120"
      :y="120"
      :scale="1.4"
      @loop="onChangeAnimation"
    />
  </Loader>
</template>

