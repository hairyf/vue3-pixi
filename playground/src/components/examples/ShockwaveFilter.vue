<script lang="ts" setup>
import type { FederatedPointerEvent } from 'pixi.js'
import { Texture, WRAP_MODES } from 'pixi.js'

import { ShockwaveFilter } from 'pixi-filters'

import { computed, reactive, ref } from 'vue'
import type { SpriteInst } from 'vue3-pixi'
import { onMountedTicker, useApplication, useScreen } from 'vue3-pixi'

interface ShockwaveItem {
  radius: number
  wavelength: number
  amplitude: number
  speed: number
  time: number
  center: [number, number]
}

const screen = useScreen()
const app = useApplication()

const disTexture = Texture.from('/displacement.jpg')
const disSpriteRef = ref<SpriteInst>()

const spritePosition = reactive({ x: 0, y: 0 })
const centerPosition = computed(() => ({ x: screen.value.width / 2, y: screen.value.height / 2 }))

const waveOptions = ref<ShockwaveItem[]>([
  { radius: 160, wavelength: 65, amplitude: 105, speed: 200, time: 0, center: randomPointLike() },
  { radius: 160, wavelength: 65, amplitude: 105, speed: 200, time: 0, center: randomPointLike() },
  { radius: 100, wavelength: 50, amplitude: 80, speed: 300, time: 0, center: randomPointLike() },
])

function requestWaveAnimation(shockwave: ShockwaveItem, resetTime: number) {
  shockwave.time += 0.01
  if (shockwave.time > resetTime) {
    shockwave.time = 0
    shockwave.center = randomPointLike()
  }
}
function randomPointLike(): [number, number] {
  return [
    Math.random() * screen.value.width,
    Math.random() * screen.value.height,
  ]
}
function renderShockwaveFilter(props: any) {
  return new ShockwaveFilter(
    props.center,
    {
      radius: props.radius,
      wavelength: props.wavelength,
      amplitude: props.amplitude,
      speed: props.speed,
    },
    props.time,
  )
}
function onClickWaveTicker(event: FederatedPointerEvent) {
  const shockwave = reactive<ShockwaveItem>({
    radius: 90,
    wavelength: 50,
    amplitude: 100,
    speed: 250,
    time: 0,
    center: [event.global.x, event.global.y],
  })
  function requestAnimation() {
    if (shockwave.time >= 1) {
      app.value!.ticker.remove(requestAnimation)
      waveOptions.value.splice(waveOptions.value.indexOf(shockwave) >>> 0, 1)
    }
    else {
      shockwave.time += 0.01
    }
  }
  waveOptions.value.push(shockwave)
  app.value!.ticker.add(requestAnimation)
}

onMountedTicker(() => {
  requestWaveAnimation(waveOptions.value[0], 2)
  requestWaveAnimation(waveOptions.value[1], 1)
  requestWaveAnimation(waveOptions.value[2], 2.5)
  spritePosition.x++
  spritePosition.y++
})

disTexture.baseTexture.wrapMode = WRAP_MODES.REPEAT
</script>

<template>
  <container @click="onClickWaveTicker">
    <sprite
      texture="/psc.jpg"
      :anchor="0.5"
      :height="screen.height"
      :x="screen.width"
      :y="screen.height"
      :position="centerPosition"
    />
    <Text
      :position="centerPosition"
      :anchor="0.5"
      :style="{
        fontFamily: 'Arial',
        fontSize: 30 + Math.floor(screen.width * 0.1),
        fill: 0xFFFFFF,
        align: 'center',
        dropShadow: true,
        dropShadowColor: '#000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 2,
        dropShadowDistance: 2,
      }"
    >
      Hello PixiJS
    </Text>
    <sprite ref="disSpriteRef" :position="spritePosition" :scale="0.5" :texture="disTexture" />
    <displacement-filter v-if="disSpriteRef" :sprite="disSpriteRef" />
    <Filter
      :is="renderShockwaveFilter"
      v-for="(option, index) in waveOptions"
      :key="index"
      :center="option.center"
      :radius="option.radius"
      :wavelength="option.wavelength"
      :amplitude="option.amplitude"
      :time="option.time"
      :speed="option.speed"
    />
  </container>
</template>

