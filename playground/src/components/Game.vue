<script lang="ts" setup>
import type { Resource } from 'pixi.js'
import { BaseTexture, Rectangle, Texture } from 'pixi.js'

const textureMain = BaseTexture.from('/game.png')
const textures = {
  dino: new Texture(textureMain, new Rectangle(75, 0, 88, 100)),
}

const dinoFrames: Texture<Resource>[] = [
]
for (let i = 0; i < 2; i++)
  dinoFrames.push(new Texture(textureMain, new Rectangle(1680 + (2 * i) * 88, 0, 86, 100)))
</script>

<template>
  <Container>
    <AnimatedSprite :play="true" :textures="dinoFrames" :x="60" :y="60" :anchor="0.5" :animation-speed="0.1" />
  </Container>
</template>

<style lang="scss" scoped></style>
