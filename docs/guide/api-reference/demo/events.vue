<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

const eventName = ref('none')

function eventHandler(name: string, evt: any) {
  eventName.value = name
  console.log(name, evt)
}
</script>

<template>
  <sprite
    :x="120"
    :y="120"
    :anchor="0.5"
    texture="/assets/mushroom.png"
    @click="evt => eventHandler('click', evt)"
    @pointerenter="evt => eventHandler('pointerenter', evt)"
    @pointermove="evt => eventHandler('pointermove', evt)"
    @pointerleave="evt => eventHandler('pointerleave', evt)"
  />
  <text :x="120" :y="180" :style="{ fill: 'white' }" :anchor="0.5">
    {{ eventName }}
  </text>
</template>
