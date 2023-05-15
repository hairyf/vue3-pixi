<script lang="ts" setup>
import type { Text as TextInst, TextStyle } from 'pixi.js'
import { reactive, ref } from 'vue'
import { useScreen } from 'vue3-pixi-renderer'

const spriteRef = ref<TextInst>()

const screen = useScreen()
const style = reactive({ fill: '#fff' })
const weightStyle = reactive<Partial<TextStyle>>({
  fill: 0xFFFFFF,
  fontSize: 60,
  fontWeight: 'bold',
})
</script>

<template>
  <Text :position="80" text="我这个人走得很慢，但是我从不后退。" :style="style" />
  <Text :x="60" :y="160" :style="style">
    意志命运往往背道而驰，决心到最后会全部推倒。
  </Text>
  <Text :x="screen.width / 2" :y="270" :style="style" :anchor="0.5">
    人生就是学校。在那里，与其说好的教师是幸福，不如说好的教师是不幸。
  </Text>

  <Text :mask="spriteRef" :x="screen.width / 2" :y="400" :style="weightStyle" :anchor="0.5">
    人生处处是美梦
  </Text>

  <sprite ref="spriteRef" :width="screen.width" :height="screen.height" texture="/bg.jpg" />
</template>
