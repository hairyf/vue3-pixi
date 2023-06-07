<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import { createDeferred } from '../../utils'
const deferred = createDeferred()

// Load them google fonts before starting...
window.WebFontConfig = {
  google: { families: ['Snippet'] },
  active: deferred.resolve,
}

const leapis = `${location.protocol}//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`
useScriptTag(leapis).load()

await deferred.then()
</script>

<template>
  <text
    :x="50" :y="100"
    :style="{
      fontFamily: 'Snippet',
      fontSize: 50,
      align: 'left',
    }"
  >
    PixiJS text using the\ncustom "Snippet" Webfont
  </text>
</template>

