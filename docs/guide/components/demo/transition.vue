<script lang="ts" setup>
import type { Graphics as GraphicsIns } from 'pixi.js'

import gsap from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import * as PIXI from 'pixi.js'
import { nextTick, ref } from 'vue'
import { External, PTransition } from 'vue3-pixi'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

function onBeforeEnter(el: GraphicsIns) {
  nextTick(() => {
    gsap.set(el, { pixi: { alpha: 1, scaleX: 0.25, scaleY: 0.25 } })
  })
}

function onEnter(el: GraphicsIns, done: () => void) {
  gsap.to(el, {
    duration: 1,
    ease: 'elastic.inOut(2.5, 1)',
    onComplete: done,
    delay: 0,
    pixi: { alpha: 1, scaleX: 1, scaleY: 1 },
  })
}
function onLeave(el: GraphicsIns, done: () => void) {
  gsap.to(el, {
    duration: 0.7,
    pixi: { scaleX: 1, scaleY: 1, x: 350 },
    ease: 'elastic.inOut(2.5, 1)',
  })
  gsap.to(el, {
    duration: 0.6,
    delay: 0.5,
    pixi: { alpha: 0 },
    onComplete: done,
  })
}
function onDrawRounded(e: GraphicsIns) {
  e.beginFill('#00a3af')
  e.drawRoundedRect(0, 0, 60, 60, 10)
}

const show = ref(true)
</script>

<template>
  <PTransition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
    <graphics v-if="show" :scale="1" :pivot="30" :x="120" :y="120" @render="onDrawRounded" />
  </PTransition>
  <External class="btn" tag="button" @click="show = !show">
    {{ show ? 'Hide' : 'Show' }}
  </External>
</template>
