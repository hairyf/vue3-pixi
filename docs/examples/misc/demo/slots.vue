<script lang="ts" setup>
import {
  Assets,
  BlurFilter,
  Color,
  Container,
  FillGradient,
  Graphics,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()
const containerRef = ref()

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150

interface Reel {
  container: Container
  symbols: Sprite[]
  position: number
  previousPosition: number
  blur: BlurFilter
}

interface Tween {
  object: any
  property: string
  propertyBeginValue: number
  target: number
  easing: (t: number) => number
  time: number
  change: ((t: Tween) => void) | null
  complete: ((t: Tween) => void) | null
  start: number
}

const slotTextures: Texture[] = []
const reels: Reel[] = []
const tweening: Tween[] = []
let running = false

function lerp(a1: number, a2: number, t: number) {
  return a1 * (1 - t) + a2 * t
}

function backout(amount: number) {
  return (t: number) => --t * t * ((amount + 1) * t + amount) + 1
}

function startPlay() {
  if (running)
    return
  running = true
  for (let i = 0; i < reels.length; i++) {
    const r = reels[i]
    const extra = Math.floor(Math.random() * 3)
    const target = r.position + 10 + i * 5 + extra
    const time = 2500 + i * 600 + extra * 600
    tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null)
  }
}

function reelsComplete() {
  running = false
}

function tweenTo(
  object: any,
  property: string,
  target: number,
  time: number,
  easing: (t: number) => number,
  onchange: ((t: Tween) => void) | null,
  oncomplete: ((t: Tween) => void) | null,
) {
  const tween: Tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now(),
  }
  tweening.push(tween)
  return tween
}

onMounted(async () => {
  const root = containerRef.value
  if (!root)
    return

  await Assets.load([
    'https://pixijs.com/assets/eggHead.png',
    'https://pixijs.com/assets/flowerTop.png',
    'https://pixijs.com/assets/helmlok.png',
    'https://pixijs.com/assets/skully.png',
  ])

  slotTextures.push(
    Texture.from('https://pixijs.com/assets/eggHead.png'),
    Texture.from('https://pixijs.com/assets/flowerTop.png'),
    Texture.from('https://pixijs.com/assets/helmlok.png'),
    Texture.from('https://pixijs.com/assets/skully.png'),
  )

  const reelContainer = new Container()
  for (let i = 0; i < 5; i++) {
    const rc = new Container()
    rc.x = i * REEL_WIDTH
    reelContainer.addChild(rc)
    const reel: Reel = {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter(),
    }
    reel.blur.blurX = 0
    reel.blur.blurY = 0
    rc.filters = [reel.blur]
    for (let j = 0; j < 4; j++) {
      const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)])
      symbol.y = j * SYMBOL_SIZE
      symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height)
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2)
      reel.symbols.push(symbol)
      rc.addChild(symbol)
    }
    reels.push(reel)
  }
  root.addChild(reelContainer)

  const sw = screen.value.width
  const sh = screen.value.height
  const margin = (sh - SYMBOL_SIZE * 3) / 2

  reelContainer.y = margin
  reelContainer.x = Math.round(sw - REEL_WIDTH * 5)

  const top = new Graphics().rect(0, 0, sw, margin).fill({ color: 0x0 })
  const bottom = new Graphics().rect(0, SYMBOL_SIZE * 3 + margin, sw, margin).fill({ color: 0x0 })

  const fill = new FillGradient(0, 0, 0, 2)
  const colors = [0xFFFFFF, 0x00FF99].map(color => Color.shared.setValue(color).toNumber())
  colors.forEach((number, index) => {
    fill.addColorStop(index / colors.length, number)
  })

  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: { fill },
    stroke: { color: 0x4A1850, width: 5 },
    dropShadow: {
      color: 0x000000,
      angle: Math.PI / 6,
      blur: 4,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
  })

  const playText = new Text({ text: 'Spin the wheels!', style })
  playText.x = Math.round((bottom.width - playText.width) / 2)
  playText.y = sh - margin + Math.round((margin - playText.height) / 2)
  bottom.addChild(playText)

  const headerText = new Text({ text: 'PIXI MONSTER SLOTS!', style })
  headerText.x = Math.round((top.width - headerText.width) / 2)
  headerText.y = Math.round((margin - headerText.height) / 2)
  top.addChild(headerText)

  root.addChild(top, bottom)

  bottom.eventMode = 'static'
  bottom.cursor = 'pointer'
  bottom.addListener('pointerdown', () => startPlay())
})

onTick(() => {
  // Update slots
  for (let i = 0; i < reels.length; i++) {
    const r = reels[i]
    r.blur.blurY = (r.position - r.previousPosition) * 8
    r.previousPosition = r.position
    for (let j = 0; j < r.symbols.length; j++) {
      const s = r.symbols[j]
      const prevy = s.y
      s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE
      if (s.y < 0 && prevy > SYMBOL_SIZE) {
        s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)]
        s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height)
        s.x = Math.round((SYMBOL_SIZE - s.width) / 2)
      }
    }
  }

  // Update tweens
  const now = Date.now()
  const remove: Tween[] = []
  for (let i = 0; i < tweening.length; i++) {
    const t = tweening[i]
    const phase = Math.min(1, (now - t.start) / t.time)
    t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase))
    if (t.change)
      t.change(t)
    if (phase === 1) {
      t.object[t.property] = t.target
      if (t.complete)
        t.complete(t)
      remove.push(t)
    }
  }
  for (let i = 0; i < remove.length; i++) {
    tweening.splice(tweening.indexOf(remove[i]), 1)
  }
})
</script>

<template>
  <Container ref="containerRef" />
</template>
