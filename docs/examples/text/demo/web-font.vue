<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { ref } from 'vue'

// Load them google fonts before starting...

const isLoaded = ref(false)

// @ts-expect-error
window.WebFontConfig = {
  google: { families: ['Snippet'] },
  active: () => {
    isLoaded.value = true
  },
}

const leapis = `${location.protocol}//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`
useScriptTag(leapis).load()
</script>

<template>
  <pixi-text
    v-if="isLoaded"
    :x="50" :y="100"
    :style="{
      fontFamily: 'Snippet',
      fontSize: 34,
      align: 'left',
    }"
  >
    PixiJS text using the\ncustom "Snippet" Webfont
  </pixi-text>
</template>

