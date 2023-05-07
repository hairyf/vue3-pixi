<script lang="ts" setup>
import { ref } from 'vue'
import CursorSprite from './components/CursorSprite.vue'

const enabled = ref(true)
</script>

<template>
  <div>
    <p>
      <button @click="enabled = !enabled">
        Toggle
      </button>

      <span style="margin-left: 10px"> Sprite visible: {{ enabled }} </span>
    </p>
    <state :width="640" :height="480">
      <CursorSprite v-if="enabled" :x="100" :y="100" />
    </state>
  </div>
</template>
