<script lang="ts" setup>
import { ref } from 'vue'
import Main from './layout/Main.vue'
import Background from './components/Background.vue'
import Ground from './components/Ground.vue'

const blur = ref(false)
</script>

<template>
  <Main @click="blur = !blur">
    <Background :blur="blur" />
    <Ground />
  </Main>
</template>
