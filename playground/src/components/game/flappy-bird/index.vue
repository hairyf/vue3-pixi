<script lang="ts" setup>
import { provide, ref } from 'vue'
import Main from './layout/Main.vue'
import Background from './components/Background.vue'
import Ground from './components/Ground.vue'
import GameOver from './components/GameOver.vue'
import GameMenu from './components/GameMenu.vue'
import Game from './components/Game.vue'
import AlphaTransition from './components/AlphaTransition.vue'

const isStart = ref(false)
const isGaming = ref(false)
const isOver = ref(false)

const score = ref(0)

function start() {
  score.value = 0
  isStart.value = true
  isGaming.value = true
  isOver.value = false
}

function over() {
  isGaming.value = false
  setTimeout(() => isGaming.value = true, 500)
}

provide('score', score)
</script>

<template>
  <Main>
    <Background :blur="!isGaming" />
    <AlphaTransition>
      <GameMenu v-if="!isStart" @start="start" />
      <Game v-if="isGaming" @over="over" />
      <GameOver v-if="isOver" @restart="start" />
    </AlphaTransition>
    <Ground />
  </Main>
</template>
