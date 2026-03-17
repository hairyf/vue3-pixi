<script lang="ts" setup>
import { Assets, Container, Graphics, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick } from 'vue3-pixi'

const containerRef = ref()
const tickHandlers: Array<(delta: number) => void> = []

function intersect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
): { x: number, y: number } | false {
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4))
    return false
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
  if (denominator === 0)
    return false
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1)
    return false
  return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) }
}

function generateSpinner1(parent: Container, posX: number, posY: number) {
  const container = new Container()
  container.position.set(posX, posY)
  parent.addChild(container)

  const base = Sprite.from('https://pixijs.com/assets/bg_scene_rotate.jpg')
  const size = 100
  base.width = size
  base.height = size

  const bottom = Sprite.from('https://pixijs.com/assets/bg_rotate.jpg')
  bottom.width = size
  bottom.height = size

  const mask = new Graphics()
  mask.position.set(size / 2, size / 2)
  base.mask = mask

  container.addChild(bottom, base, mask)

  let phase = 0
  return (delta: number) => {
    phase += delta / 60
    phase %= Math.PI * 2
    const x = Math.cos(phase - Math.PI / 2) * size
    const y = Math.sin(phase - Math.PI / 2) * size
    const segments = [
      [-size / 2, -size / 2, size / 2, -size / 2],
      [size / 2, -size / 2, size / 2, size / 2],
      [-size / 2, size / 2, size / 2, size / 2],
      [-size / 2, -size / 2, -size / 2, size / 2],
    ]
    let intersection: { x: number, y: number } | false = false
    let winding = 0
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i]
      const hit = intersect(0, 0, x, y, s[0], s[1], s[2], s[3])
      if (hit) {
        intersection = hit
        if (i === 0)
          winding = hit.x > 0 ? 0 : 4
        else winding = i
        break
      }
    }
    if (!intersection)
      return
    const corners = [
      size / 2,
      -size / 2,
      size / 2,
      size / 2,
      -size / 2,
      size / 2,
      -size / 2,
      -size / 2,
      0,
      -size / 2,
    ]
    mask.clear().moveTo(0, -size / 2).lineTo(0, 0).lineTo(intersection.x, intersection.y)
    for (let i = winding; i < corners.length / 2; i++) {
      mask.lineTo(corners[i * 2], corners[i * 2 + 1])
    }
    mask.fill({ color: 0xFF0000 })
  }
}

function generateSpinner2(parent: Container, posX: number, posY: number) {
  const container = new Container()
  container.position.set(posX, posY)
  parent.addChild(container)
  const size = 100
  const ballAmount = 7
  const balls: Sprite[] = []
  for (let i = 0; i < ballAmount; i++) {
    const ball = Sprite.from('https://pixijs.com/assets/circle.png')
    ball.anchor.set(0.5)
    container.addChild(ball)
    ball.position.set(
      size / 2 + (Math.cos((i / ballAmount) * Math.PI * 2) * size) / 3,
      size / 2 + (Math.sin((i / ballAmount) * Math.PI * 2) * size) / 3,
    )
    balls.push(ball)
  }
  let phase = 0
  return (delta: number) => {
    phase += delta / 60
    phase %= Math.PI * 2
    balls.forEach((b, i) => {
      const sin = Math.sin((i / ballAmount) * Math.PI - phase)
      b.scale.set(Math.abs(sin * sin * sin * 0.5) + 0.5)
    })
  }
}

function generateSpinner3(parent: Container, posX: number, posY: number) {
  const container = new Container()
  container.position.set(posX, posY)
  parent.addChild(container)
  const base = Sprite.from('https://pixijs.com/assets/bg_scene_rotate.jpg')
  const size = 100
  base.width = size
  base.height = size
  const mask = new Graphics()
  mask.position.set(size / 2, size / 2)
  base.mask = mask
  container.addChild(base, mask)
  let phase = 0
  return (delta: number) => {
    phase += delta / 60
    phase %= Math.PI * 2
    const angleStart = 0 - Math.PI / 2
    const angle = phase + angleStart
    const radius = 50
    const x1 = Math.cos(angleStart) * radius
    const y1 = Math.sin(angleStart) * radius
    mask.clear().moveTo(0, 0).lineTo(x1, y1).arc(0, 0, radius, angleStart, angle, false).lineTo(0, 0).fill({ color: 0xFF0000 })
  }
}

function generateSpinner4(parent: Container, posX: number, posY: number) {
  const container = new Container()
  container.position.set(posX, posY)
  parent.addChild(container)
  const size = 100
  const arcRadius = 15
  const base = Sprite.from('https://pixijs.com/assets/bg_scene_rotate.jpg')
  base.width = size
  base.height = size
  const roundingMask = new Graphics()
  roundingMask.roundRect(0, 0, size, size, arcRadius).fill({ color: 0x0 })
  base.mask = roundingMask
  const lineSize = 5
  const edge = new Graphics()
  edge.roundRect(0, 0, size, size, arcRadius).stroke({ width: lineSize, color: 0xFF0000 })
  const mask = new Graphics()
  mask.position.set(size / 2, size / 2)
  edge.mask = mask
  container.addChild(base, roundingMask, edge, mask)
  let phase = 0
  return (delta: number) => {
    phase += delta / 160
    phase %= Math.PI * 2
    const x = Math.cos(phase - Math.PI / 2) * size
    const y = Math.sin(phase - Math.PI / 2) * size
    const segments = [
      [-size / 2 + lineSize, -size / 2 + lineSize, size / 2 - lineSize, -size / 2 + lineSize],
      [size / 2 - lineSize, -size / 2 + lineSize, size / 2 - lineSize, size / 2 - lineSize],
      [-size / 2 + lineSize, size / 2 - lineSize, size / 2 - lineSize, size / 2 - lineSize],
      [-size / 2 + lineSize, -size / 2 + lineSize, -size / 2 + lineSize, size / 2 - lineSize],
    ]
    const outDir = [[0, -1], [1, 0], [0, 1], [-1, 0]]
    let intersection: { x: number, y: number } | false = false
    let winding = 0
    let selectedDir = [0, -1]
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i]
      const hit = intersect(0, 0, x, y, s[0], s[1], s[2], s[3])
      if (hit) {
        intersection = hit
        if (i === 0)
          winding = hit.x < 0 ? 0 : 4
        else winding = 4 - i
        selectedDir = outDir[i]
        break
      }
    }
    if (!intersection)
      return
    const corners = [
      -size / 2 - lineSize,
      -size / 2 - lineSize,
      -size / 2 - lineSize,
      size / 2 + lineSize,
      size / 2 + lineSize,
      size / 2 + lineSize,
      size / 2 + lineSize,
      -size / 2 - lineSize,
    ]
    mask.clear().moveTo(0, 0).moveTo(0, -size / 2 - lineSize)
    for (let i = 0; i < winding; i++) {
      mask.lineTo(corners[i * 2], corners[i * 2 + 1])
    }
    mask
      .lineTo(intersection.x + selectedDir[0] * lineSize * 2, intersection.y + selectedDir[1] * lineSize * 2)
      .lineTo(intersection.x, intersection.y)
      .lineTo(0, 0)
      .fill({ color: 0xFF0000 })
  }
}

function generateSpinner5(parent: Container, posX: number, posY: number) {
  const container = new Container()
  container.position.set(posX, posY)
  parent.addChild(container)
  const halfCircle = new Graphics().arc(0, 0, 100, 0, Math.PI).fill({ color: 0xFF0000 })
  halfCircle.position.set(50, 50)
  const rectangle = new Graphics().roundRect(0, 0, 100, 100, 16).stroke({ width: 2, color: 0xFFFFFF })
  rectangle.mask = halfCircle
  container.addChild(rectangle, halfCircle)
  let phase = 0
  return (delta: number) => {
    phase += delta / 6
    phase %= Math.PI * 2
    halfCircle.rotation = phase
  }
}

onMounted(async () => {
  const root = containerRef.value
  if (!root)
    return

  await Assets.load([
    'https://pixijs.com/assets/bg_scene_rotate.jpg',
    'https://pixijs.com/assets/bg_rotate.jpg',
    'https://pixijs.com/assets/circle.png',
  ])

  tickHandlers.push(
    generateSpinner1(root, 50, 50),
    generateSpinner2(root, 160, 50),
    generateSpinner3(root, 270, 50),
    generateSpinner4(root, 380, 50),
    generateSpinner5(root, 490, 50),
  )
})

onTick((ticker) => {
  tickHandlers.forEach(cb => cb(ticker.deltaTime))
})
</script>

<template>
  <Container ref="containerRef" />
</template>
