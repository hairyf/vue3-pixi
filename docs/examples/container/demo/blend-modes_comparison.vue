<script lang="ts" setup>
import type { BLEND_MODES } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const allBlendModes: BLEND_MODES[] = [
  'normal',
  'add',
  'screen',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'linear-burn',
  'linear-dodge',
  'linear-light',
  'hard-light',
  'soft-light',
  'pin-light',
  'difference',
  'exclusion',
  'overlay',
  'saturation',
  'color',
  'luminosity',
  'add-npm',
  'subtract',
  'divide',
  'vivid-light',
  'hard-mix',
  'negation',
]

const pandas = ref<Array<{ rotation: number }>>([])

// Initialize pandas rotation state
for (let i = 0; i < allBlendModes.length; i++) {
  pandas.value.push({ rotation: 0 })
}

onTick(() => {
  pandas.value.forEach((panda, i) => {
    panda.rotation += 0.01 * (i % 2 ? 1 : -1)
  })
})
</script>

<template>
  <assets
    v-slot="{ data }"
    :entry="[
      { alias: 'panda', src: 'https://pixijs.com/assets/panda.png' },
      { alias: 'rainbowGradient', src: 'https://pixijs.com/assets/rainbow-gradient.png' },
    ]"
  >
    <container
      v-for="(blendMode, i) in allBlendModes"
      :key="i"
      :x="(i % 5) * 100"
      :y="Math.floor(i / 5) * 100"
    >
      <!-- 彩虹渐变（背景，正常显示，在底层，先渲染） -->
      <sprite
        :texture="data.rainbowGradient"
        :width="100"
        :height="100"
      />
      <!-- 熊猫精灵（前景，应用混合模式，在上层，后渲染） -->
      <sprite
        :texture="data.panda"
        :width="100"
        :height="100"
        :anchor="0.5"
        :x="100 / 2"
        :y="100 / 2"
        :rotation="pandas[i].rotation"
        :blend-mode="blendMode"
      />
      <!-- 文本标签 -->
      <text
        :x="100 / 2"
        :y="100 - 20"
        :anchor="{ x: 0.5, y: 0.5 }"
        :style="{
          fontSize: 16,
          fontFamily: 'short-stack',
        }"
      >
        {{ blendMode }}
      </text>
    </container>
  </assets>
</template>
