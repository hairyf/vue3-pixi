<script lang="ts" setup>
import { Graphics, Point, RenderTexture, Sprite } from 'pixi.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onReady, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()

const imageToRevealRef = ref<Sprite>()
const rtSpriteRef = ref<Sprite>()

let renderTexture: RenderTexture | null = null
const brush = new Graphics().circle(0, 0, 50).fill({ color: 0xFFFFFF })
const line = new Graphics()

let dragging = false
let lastDrawnPoint: Point | null = null

onMounted(() => {
  renderTexture = RenderTexture.create({
    width: screen.value.width,
    height: screen.value.height,
  })
  if (rtSpriteRef.value) {
    rtSpriteRef.value.texture = renderTexture
  }
  if (imageToRevealRef.value && rtSpriteRef.value) {
    imageToRevealRef.value.mask = rtSpriteRef.value
  }
})

onReady((pixi) => {
  pixi.stage.eventMode = 'static'
  pixi.stage.hitArea = pixi.screen
  pixi.stage
    .on('pointerdown', pointerDown)
    .on('pointerup', pointerUp)
    .on('pointerupoutside', pointerUp)
    .on('pointermove', pointerMove)
})

onBeforeUnmount(() => {
  if (!app.value)
    return
  app.value.stage
    .off('pointerdown', pointerDown)
    .off('pointerup', pointerUp)
    .off('pointerupoutside', pointerUp)
    .off('pointermove', pointerMove)
})

function pointerMove({ global: { x, y } }: any) {
  if (!dragging || !renderTexture || !app.value)
    return

  brush.position.set(x, y)
  app.value.renderer.render({
    container: brush,
    target: renderTexture,
    clear: false,
    skipUpdateTransform: false,
  })

  if (lastDrawnPoint) {
    line.clear()
      .moveTo(lastDrawnPoint.x, lastDrawnPoint.y)
      .lineTo(x, y)
      .stroke({ width: 100, color: 0xFFFFFF })
    app.value.renderer.render({
      container: line,
      target: renderTexture,
      clear: false,
      skipUpdateTransform: false,
    })
  }
  lastDrawnPoint = lastDrawnPoint || new Point()
  lastDrawnPoint.set(x, y)
}

function pointerDown(event: any) {
  dragging = true
  pointerMove(event)
}

function pointerUp() {
  dragging = false
  lastDrawnPoint = null
}
</script>

<template>
  <assets
    :entry="[
      { alias: 'bg_grass', src: 'https://pixijs.com/assets/bg_grass.jpg' },
      { alias: 'bg_rotate', src: 'https://pixijs.com/assets/bg_rotate.jpg' },
    ]"
  >
    <Sprite
      texture="bg_grass"
      :width="screen.width"
      :height="screen.height"
    />
    <Sprite
      ref="imageToRevealRef"
      texture="bg_rotate"
      :width="screen.width"
      :height="screen.height"
    />
    <Sprite ref="rtSpriteRef" />
  </assets>
</template>
