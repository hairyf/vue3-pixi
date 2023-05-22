<script lang="ts" setup>
import { Assets, Rectangle, Texture, groupD8 } from 'pixi.js'
import { computed, reactive } from 'vue'
import { useScreen } from 'vue3-pixi'
import { LocalScope } from 'vue3-local-scope'

const screen = useScreen()
const textures = reactive<Texture[]>([])

const offset = computed(() => ({
  x: screen.value.width / 16 | 0,
  y: screen.value.height / 8 | 0,
}))
const grid = computed(() => ({
  w: screen.value.width / 4 | 0,
  h: screen.value.height / 5 | 0,
}))

function onAssetsLoaded(texture: Texture) {
  textures.push(texture)
  for (let rotate = 1; rotate < 16; rotate++) {
    const { frame } = texture
    const h = groupD8.isVertical(rotate) ? frame.width : frame.height
    const w = groupD8.isVertical(rotate) ? frame.height : frame.width

    const crop = new Rectangle(frame.x, frame.y, w, h)

    const rte
    = rotate % 2 === 0
      ? new Texture(texture.baseTexture, frame, crop, crop, rotate)
      : new Texture(texture.baseTexture, frame, crop, crop, rotate - 1)

    if (rotate % 2 !== 0)
      rte.rotate++

    textures.push(rte)
  }
}

Assets.load('https://beta.pixijs.com/assets/flowerTop.png').then(onAssetsLoaded)
</script>

<template>
  <container>
    <LocalScope
      v-for="(item, i) in textures"
      :key="i"
      v-slot="{ x, y }"
      :x="offset.x + grid.w * (i % 4)"
      :y="offset.y + grid.h * (i / 4 | 0)"
    >
      <sprite
        :texture="item"
        :scale="0.5"
        :x="x"
        :y="y"
      />
      <text :x="x" :y="y - 40" :style="{ fontFamily: 'Courier New', fontSize: '12px', fill: 'white' }">
        {{ `rotate = ${item.rotate}` }}
      </text>
    </LocalScope>
  </container>
</template>

<style lang="scss" scoped></style>
