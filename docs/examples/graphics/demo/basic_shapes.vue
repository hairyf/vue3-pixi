<script lang="ts" setup>
import type { Graphics as GraphicsElement } from 'pixi.js'

function onDraw(graphics: GraphicsElement) {
  // Rectangle
  graphics.rect(50, 50, 100, 100)
  graphics.fill(0xDE3249)

  // Rectangle + line style 1
  graphics.rect(200, 50, 100, 100)
  graphics.fill(0x650A5A)
  graphics.stroke({ width: 2, color: 0xFEEB77 })

  // Rectangle + line style 2
  graphics.rect(350, 50, 100, 100)
  graphics.fill(0xC34288)
  graphics.stroke({ width: 10, color: 0xFFBD01 })

  // Rectangle 2
  graphics.rect(530, 50, 140, 100)
  graphics.fill(0xAA4F08)
  graphics.stroke({ width: 2, color: 0xFFFFFF })

  // Circle
  graphics.circle(100, 250, 50)
  graphics.fill({ color: 0xDE3249, alpha: 1 })

  // Circle + line style 1
  graphics.circle(250, 250, 50)
  graphics.fill({ color: 0x650A5A, alpha: 1 })
  graphics.stroke({ width: 2, color: 0xFEEB77 })

  // Circle + line style 2
  graphics.circle(400, 250, 50)
  graphics.fill({ color: 0xC34288, alpha: 1 })
  graphics.stroke({ width: 10, color: 0xFFBD01 })

  // Ellipse + line style 2
  graphics.ellipse(600, 250, 80, 50)
  graphics.fill({ color: 0xAA4F08, alpha: 1 })
  graphics.stroke({ width: 2, color: 0xFFFFFF })

  // Draw a shape
  graphics.moveTo(50, 350)
  graphics.lineTo(250, 350)
  graphics.lineTo(100, 400)
  graphics.lineTo(50, 350)
  graphics.fill(0xFF3300)
  graphics.stroke({ width: 4, color: 0xFFD900 })

  // Draw a rounded rectangle
  graphics.roundRect(50, 440, 100, 100, 16)
  graphics.fill({ color: 0x650A5A, alpha: 0.25 })
  graphics.stroke({ width: 2, color: 0xFF00FF })

  // Draw star
  graphics.star(360, 370, 5, 50)
  graphics.fill(0x35CC5A)
  graphics.stroke({ width: 2, color: 0xFFFFFF })

  // Draw star 2
  graphics.star(280, 510, 7, 50)
  graphics.fill(0xFFCC5A)
  graphics.stroke({ width: 2, color: 0xFFFFFD })

  // Draw star 3
  graphics.star(470, 450, 4, 50)
  graphics.fill(0x55335A)
  graphics.stroke({ width: 4, color: 0xFFFFFF })

  // Draw polygon
  const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520]

  graphics.poly(path)
  graphics.fill(0x3500FA)
}
</script>

<template>
  <graphics @effect="onDraw" />
</template>
