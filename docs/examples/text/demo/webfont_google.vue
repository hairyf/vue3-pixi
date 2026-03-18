<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const fontLoaded = ref(false)

onMounted(() => {
  // Load Google font via WebFont loader
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Snippet&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  // Wait for the font to be ready
  document.fonts.ready.then(() => {
    fontLoaded.value = true
  })
})
</script>

<template>
  <text
    v-if="fontLoaded"
    :x="50"
    :y="200"
    :style="{
      fontFamily: 'Snippet',
      fontSize: 50,
      fill: 'white',
      align: 'left',
    }"
  >
    PixiJS text using the
    custom "Snippet" Webfont
  </text>
</template>
