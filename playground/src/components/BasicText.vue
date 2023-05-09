<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useScreen } from 'vue3-pixi-renderer'

const screen = useScreen()
</script>

<template>
  <Text :position="60" text="我这个人走得很慢，但是我从不后退。" :style="{ fill: '#fff' }" />
  <Text :x="60" :y="160" :style="{ fill: '#fff' }">
    意志命运往往背道而驰，决心到最后会全部推倒。——莎士比亚
  </Text>
  <Text :x="(screen.width || 0) / 2" :y="300" :style="{ fill: '#fff' }" :anchor="0.5">
    人生就是学校。在那里，与其说好的教师是幸福，不如说好的教师是不幸。
  </Text>
</template>
