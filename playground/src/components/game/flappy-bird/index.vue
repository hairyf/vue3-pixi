<script lang="ts" setup>
import { provide, ref } from 'vue'
import Main from './layout/Main.vue'
import Background from './components/Background.vue'
import Ground from './components/Ground.vue'
import Score from './components/Score.vue'
import GameOver from './components/GameOver.vue'
import GameMenu from './components/GameMenu.vue'
import GameStar from './components/GameStar.vue'
import AlphaTransition from './components/AlphaTransition.vue'

const gaming = ref(false)
const gameover = ref(false)

const score = ref(0)

function onStart() {
  gaming.value = true
  setTimeout(() => {
    gaming.value = false
    gameover.value = true
  }, 1000)
}

provide('score', score)
</script>

<template>
  <Main>
    <Background :blur="!gaming" />
    <Ground />
    <AlphaTransition>
      <GameMenu v-if="!gaming && !gameover" @start="onStart" />
      <GameStar v-else-if="gaming" />
      <GameOver v-else-if="gameover" />
    </AlphaTransition>
  </Main>
</template>
