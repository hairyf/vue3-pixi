<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core';

// Load them google fonts before starting...
(window as any).WebFontConfig = {
  google: { families: ['Snippet'] },
}
const protocol = location.protocol === 'https:'
  ? 'https'
  : 'http'

const script = useScriptTag(`${protocol}://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`, undefined, { async: true })
await script.load()
</script>

<template>
  <text
    :x="50" :y="100"
    :style="{
      fontFamily: 'Snippet',
      fontSize: 50,
      fill: 'white',
      align: 'left',
    }"
  >
    PixiJS text using the\ncustom "Snippet" Webfont
  </text>
</template>

