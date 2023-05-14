<script lang="ts" setup>
import { ref } from 'vue'
import { PTransition } from 'vue3-pixi-transition'
import Main from './layout/Main.vue'
import Background from './components/Background.vue'
import Ground from './components/Ground.vue'
import Score from './components/Score.vue'
import Gameover from './components/Gameover.vue'

const gaming = ref(false)
const gameover = ref(false)

function wwww() {
}
</script>

<template>
  <Main @click="gaming = true">
    <Background :blur="!gaming" />
    <Ground />
    <PTransition
      :duration="300"
      :before-enter="{ alpha: 0 }"
      :enter="{ alpha: 1 }"
      :leave="{ alpha: 0 }"
    >
      <Gameover v-if="gaming" @restart="wwww" />
    </PTransition>
  </Main>
</template>
