<script lang="ts" setup>
import Async from './components/Assets/Async.vue'
import Background from './components/assets_/Background.vue'
import Bundle from './components/assets_/Bundle.vue'
import BitmapTextBase from './components/text/BitmapTextBase.vue'
import TextureRotate from './components/textures/TextureRotate.vue'
</script>

<template>
  <Suspense>
    <Bundle />
  </Suspense>
</template>

