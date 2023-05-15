<script lang="ts" setup>
import { PTransition } from 'vue3-pixi-transition'
</script>

<template>
  <PTransition
    :duration="300"
    :before-enter="{ alpha: 0 }"
    :enter="{ alpha: 1 }"
    :leave="{ alpha: 0 }"
  >
    <slot />
  </PTransition>
</template>
