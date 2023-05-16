<!-- eslint-disable no-unused-expressions -->
<script lang="ts" setup>
import type { Ref } from 'vue'
import { inject, ref, watch } from 'vue'

import { Rectangle } from 'pixi.js'
import { useTilePosition } from '../composables/useTilePosition'
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

  // 当地面移动的时候, 且地面移动的距离大于一个管道的距离, 就生成一个管道
  if (x1 !== x2)
    spawnPipe(x1)

  // 当地面移动的时候, 第一个管道的 x 坐标小于地面的 x 坐标减去 100
  // 说明这个管道已经过去了, 就把这个管道移除
  if (pipes.value.length && pipes.value[0].x < x - 100) {
    pipes.value.shift()
    score.value++
  }
})

// 判断是否撞到管道
watch(groundX, (x) => {
  if (gameover.value)
    return
  const collisionPipeIndex = pipes.value.findIndex(it => it.x > x + 50)
  if (collisionPipeIndex === -1)
    return
  const pipe = pipes.value[collisionPipeIndex]
  const top = new Rectangle(pipe.x - 45, pipe.y - 65 - 1000, 90, 1000)
  const bottom = new Rectangle(pipe.x - 45, pipe.y + 65, 90, 1000)
  if (top.contains(x + birdX.value, birdY.value) || bottom.contains(x + birdX.value, birdY.value))
    gameover.value = true
})

// 判断是否游戏结束
watch(groundX, (x, prevX) => {
  if (!gameover.value)
    return
  // 当游戏结束时, 小鸟不在移动, 并且往后退
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
