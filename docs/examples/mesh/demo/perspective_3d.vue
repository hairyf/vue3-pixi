<script lang="ts" setup>
import type { Texture } from 'pixi.js'
import { ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const meshRef = ref()
const texture = ref<Texture>()

let angleX = 0
let angleY = 0

const points = ref<{ x: number; y: number }[]>([])
const outPoints = ref<{ x: number; y: number }[]>([])

function onLoaded(tex: any) {
  texture.value = tex

  points.value = [
    { x: 0, y: 0 },
    { x: tex.width, y: 0 },
    { x: tex.width, y: tex.height },
    { x: 0, y: tex.height },
  ]
  outPoints.value = points.value.map((p: any) => ({ ...p }))
}

function rotate3D(pts: any[], out: any[], aX: number, aY: number, perspective: number) {
  if (!texture.value) return
  const tw = texture.value.width
  const th = texture.value.height
  const radX = (aX * Math.PI) / 180
  const radY = (aY * Math.PI) / 180
  const cosX = Math.cos(radX)
  const sinX = Math.sin(radX)
  const cosY = Math.cos(radY)
  const sinY = Math.sin(radY)

  for (let i = 0; i < pts.length; i++) {
    const src = pts[i]
    const o = out[i]
    const x = src.x - tw / 2
    const y = src.y - th / 2
    let z = 0

    const xY = cosY * x - sinY * z
    z = sinY * x + cosY * z

    const yX = cosX * y - sinX * z
    z = sinX * y + cosX * z

    const scale = perspective / (perspective - z)
    o.x = xY * scale + tw / 2
    o.y = yX * scale + th / 2
  }
}

function onPointerMove(e: any) {
  if (!meshRef.value) return
  const mx = e.global?.x ?? e.x
  const my = e.global?.y ?? e.y
  angleY = -(mx - meshRef.value.x) / 10
  angleX = -(my - meshRef.value.y) / 10
}

onTick(() => {
  if (!meshRef.value || !points.value.length) return

  rotate3D(points.value, outPoints.value, angleX, angleY, 300)
  const o = outPoints.value
  meshRef.value.setCorners(
    o[0].x, o[0].y,
    o[1].x, o[1].y,
    o[2].x, o[2].y,
    o[3].x, o[3].y,
  )
})
</script>

<template>
  <assets
    alias="eggHead"
    entry="https://pixijs.com/assets/eggHead.png"
    @loaded="onLoaded"
  >
    <container
      :event-mode="'static'"
      :hit-area="{ x: 0, y: 0, width: screen.width, height: screen.height, contains: () => true }"
      @pointermove="onPointerMove"
    >
      <perspective-mesh
        v-if="texture"
        ref="meshRef"
        :texture="texture"
        :x="screen.width / 2"
        :y="screen.height / 2"
        :pivot-x="texture.width / 2"
        :pivot-y="texture.height / 2"
        :scale="2"
      />
    </container>
  </assets>
</template>
