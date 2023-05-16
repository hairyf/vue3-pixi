<script lang="ts" setup>
import { onKeyDown, useEventListener, whenever } from '@vueuse/core'
import { SCALE_MODES, Texture } from 'pixi.js'
import { computed, ref, useModel } from 'vue'
import { tryMountTicker } from 'vue3-pixi'
import downPNG from '../assets/sprites/redbird-downflap.png'
import midPNG from '../assets/sprites/redbird-midflap.png'
import upPNG from '../assets/sprites/redbird-upflap.png'

const props = defineProps<{
  x: number
  y: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (name: 'die'): void
  (name: 'update:x', x: number): void
  (name: 'update:y', y: number): void
}>()

const x = useModel(props, 'x')
const y = useModel(props, 'y')

const resolves = {
  down: Texture.from(downPNG, { scaleMode: SCALE_MODES.NEAREST }),
  mid: Texture.from(midPNG, { scaleMode: SCALE_MODES.NEAREST }),
  up: Texture.from(upPNG, { scaleMode: SCALE_MODES.NEAREST }),
}
const velocity = ref(-11)
const gravity = 0.6

const texture = computed(() => {
  return velocity.value < -2
    ? resolves.up
    : velocity.value < 2
      ? resolves.mid
      : resolves.down
})

const remove = tryMountTicker((dt) => {
  // 一点点往下掉
  y.value += velocity.value * dt

  // 重力加速度
  velocity.value += gravity * dt
})

function jump() {
  if (props.disabled)
    return
  // 点击一下往上跳, 负数表示往上
  velocity.value = -11
}

onKeyDown(' ', jump)
useEventListener('click', jump)

// 撞到地面就死了
whenever(
  () => y.value > 379,
  () => {
    y.value = 379
    velocity.value = 0
    emit('die')
    remove()
  },
)

// 撞到天花板就反弹
whenever(
  () => y.value < 10,
  () => {
    y.value = 10
    velocity.value = 0
  },
)
</script>

<template>
  <sprite :x="x" :y="y" :texture="texture" :anchor-x="0.5" :anchor-y="0.5" />
</template>

<style lang="scss" scoped></style>
