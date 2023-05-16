<script lang="ts" setup>
import { onKeyDown, useMagicKeys } from '@vueuse/core'
import type { Resource } from 'pixi.js'
import { BaseTexture, Rectangle, Texture } from 'pixi.js'
import { computed, ref } from 'vue'
import { tryMountTicker, useScreen } from 'vue3-pixi'
import image from './assets/game.png'

const screen = useScreen()

const textureMain = BaseTexture.from(image)
const textures = {
  dino: new Texture(textureMain, new Rectangle(75, 0, 88, 100)),
  dinoDeath: new Texture(textureMain, new Rectangle(2115, 0, 85, 100)),
  dinoJump: new Texture(textureMain, new Rectangle(1680, 0, 85, 100)),
  ground: new Texture(textureMain, new Rectangle(50, 100, 2300, 30)),
  cactus: new Texture(textureMain, new Rectangle(515, 0, 32, 60)),
}

const dinoRunFrames: Texture<Resource>[] = [
  resolveDinoTexture(1768, 88 * 1),
  resolveDinoTexture(1768, 88 * 2),
]

const dinoSpeedupFrames: Texture<Resource>[] = [
  resolveDinoTexture(2085, 120 * 1, 115),
  resolveDinoTexture(2080, 120 * 2, 115),
]

function resolveDinoTexture(offset: number, i: number, width = 86, height = 100) {
  return new Texture(textureMain, new Rectangle(offset + i, 0, width, height))
}

const CONSTANT = {
  GRAVITY: 1,
}

const gaming = ref(false)
const gameover = ref(false)
const jump = ref(false)
const jumpSpeed = ref(20)
const jumpY = ref(screen.value.height - 90)

const groundTileX = ref(0)
const cactusX = ref(screen.value.width / 2)
const score = ref(0)

const { speedup } = useMagicKeys({
  aliasMap: { speedup: 'arrowright' },
})
const speed = computed(() => speedup.value ? 2 : 1)
const dinoPosition = computed(() => [60, screen.value.height - 90] as [number, number])

function onStart() {
  onReset()
  gaming.value = true
}

function onEnd() {
  gaming.value = false
  gameover.value = true
  setTimeout(onReset, 3000)
}
function onReset() {
  if (gaming.value)
    return
  gameover.value = false
  groundTileX.value = 0
  cactusX.value = screen.value.width / 2
  score.value = 0
}
function jumpTick() {
  jumpSpeed.value -= CONSTANT.GRAVITY
  jumpY.value -= jumpSpeed.value
  if (jumpY.value >= screen.value.height - 90) {
    // reset all jump values
    jumpSpeed.value = 20
    jumpY.value = screen.value.height - 90
    jump.value = false
  }
}
function cactusTick() {
  cactusX.value -= 10 * speed.value
  if (cactusX.value < -30) {
    cactusX.value = screen.value.width
    score.value++
  }
  if (cactusX.value > 0 && cactusX.value < 60 && !jump.value)
    onEnd()
}

tryMountTicker(() => {
  if (!gaming.value)
    return

  groundTileX.value -= 10 * speed.value

  cactusTick()

  if (jump.value)
    jumpTick()
})

onKeyDown(' ', () => gaming.value && !jump.value && (jump.value = true))
</script>

<template>
  <Container>
    <Text
      v-if="!gaming"
      :position="[screen.width / 2, screen.height / 2]"
      :style="{ fontSize: 36, fontFamily: 'Arial', align: 'center' }"
      :anchor="0.5"
      @click="onStart"
    >
      {{ gameover ? `Game is over, your score is ${score} points` : 'Start Game' }}
    </Text>

    <Sprite
      v-if="!gameover"
      :texture="textures.cactus"
      :x="cactusX"
      :y="screen.height - 50 - 60"
    />

    <Sprite v-if="gameover" :position="dinoPosition" :anchor="0.5" :texture="textures.dinoDeath" />

    <template v-if="gaming">
      <Sprite :visible="jump" :position="[60, jumpY]" :anchor="0.5" :texture="textures.dinoJump" />
      <AnimatedSprite
        :visible="!jump && !speedup"
        :textures="dinoRunFrames"
        :position="dinoPosition"
        :play="true"
        :anchor="0.5"
        :animation-speed="0.1"
      />
      <AnimatedSprite
        :visible="!jump && speedup"
        :textures="dinoSpeedupFrames"
        :position="dinoPosition"
        :play="true"
        :anchor="0.5"
        :animation-speed="0.5"
      />
    </template>

    <TilingSprite
      :texture="textures.ground"
      :width="screen.width"
      :y="screen.height - 50"
      :tile-position-x="groundTileX"
      :height="30"
    />
  </Container>
</template>

<style lang="scss" scoped></style>
