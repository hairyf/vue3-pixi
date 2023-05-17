<script lang="ts" setup>
import { provide, ref } from 'vue'
import Main from './layout/Main.vue'
import Background from './components/Background.vue'
import Ground from './components/Ground.vue'
import GameOver from './components/GameOver.vue'
import GameMenu from './components/GameMenu.vue'
import Game from './components/Game.vue'
import AlphaTransition from './components/AlphaTransition.vue'
import './config'

const start = ref(false)
const gaming = ref(false)
const gameover = ref(false)

const score = ref(0)

function onStart() {
  score.value = 0
  start.value = true
  gaming.value = true
  gameover.value = false
}

function onOver() {
  gaming.value = false
  setTimeout(() => gameover.value = true, 500)
}

provide('score', score)
</script>

<template>
  <Main>
    <Background :blur="!gaming" />
    <AlphaTransition>
      <GameMenu v-if="!start" @start="onStart" />
      <Game v-if="gaming" @over="onOver" />
      <GameOver v-if="gameover" @restart="onStart" />
    </AlphaTransition>
    <Ground />
  </Main>
</template>
