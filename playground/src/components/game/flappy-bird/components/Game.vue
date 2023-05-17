<!-- eslint-disable no-unused-expressions -->
<script lang="ts" setup>
import type { Ref } from 'vue'
import { inject, ref, watch } from 'vue'

import { Rectangle } from 'pixi.js'
import { useTilePosition } from '../composables/useTilePosition'
import { audios } from '../config'
import Score from './Score.vue'
import Pipes from './Pipes.vue'
import Bird from './Bird.vue'

const emit = defineEmits<{
  (name: 'over'): void
}>()

const score = inject<Ref<number>>('score')!

const distance = 300

const groundX = useTilePosition()
const pipes = ref<{ x: number; y: number }[]>([])
const birdX = ref(200)
const birdY = ref(150)
const gameover = ref(false)

function spawnPipe(x: number) {
  pipes.value.push({ x, y: Math.random() * 175 + 100 })
}

spawnPipe(800)

// 管道添加到场景中
watch(groundX, (x, oldX) => {
  const x1 = Math.floor(x / distance) * distance + 800
  const x2 = Math.floor(oldX / distance) * distance + 800

  // When the ground is moving and the distance covered by the ground is greater than the distance of one pipe, generate a new pipe.
  if (x1 !== x2)
    spawnPipe(x1)

  // when the ground is moving, the x-coordinate of the first pipe is less than the x-coordinate of the ground minus 100.
  // Remove this pipe once it has passed, indicating that it has gone by.
  if (pipes.value.length && pipes.value[0].x < x - 100)
    pipes.value.shift()
})

// determine if it hits the pipe.
watch(groundX, (x, prevX) => {
  if (gameover.value)
    return

  const pipeIndex = pipes.value.findIndex(it => it.x > x + 150)
  const lastPipeIndex = pipes.value.findIndex(it => it.x > prevX + 150)

  if (pipeIndex !== lastPipeIndex) {
    audios.point.play()
    score.value++
  }

  const collisionPipeIndex = pipes.value.findIndex(it => it.x > x + 50)
  if (collisionPipeIndex === -1)
    return
  const pipe = pipes.value[collisionPipeIndex]
  const top = new Rectangle(pipe.x - 45, pipe.y - 65 - 1000, 90, 1000)
  const bottom = new Rectangle(pipe.x - 45, pipe.y + 65, 90, 1000)
  if (top.contains(x + birdX.value, birdY.value) || bottom.contains(x + birdX.value, birdY.value)) {
    audios.hit.play()
    setTimeout(() => audios.die.play(), 100)
    gameover.value = true
  }
})

// Determine if the game is over.
watch(groundX, (x, prevX) => {
  if (!gameover.value)
    return
  // When the game is over, the bird stops moving and moves backward.
  birdX.value += prevX - x
  if (birdX.value < -100)
    emit('over')
})
</script>

<template>
  <container>
    <Pipes :pipes="pipes" :offset="groundX" />
    <Score :x="600" :y="30" :score="score" />
    <Bird v-model:x="birdX" v-model:y="birdY" @die="gameover = true" />
  </container>
</template>

<style lang="scss" scoped></style>
