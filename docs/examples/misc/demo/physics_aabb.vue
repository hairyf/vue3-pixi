<script lang="ts" setup>
import { Point, Texture } from 'pixi.js'
import { reactive } from 'vue'
import { onReady, onTick, useScreen } from 'vue3-pixi'

const screen = useScreen()

const movementSpeed = 0.05
const impulsePower = 5

const greenSquare = reactive({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  acceleration: new Point(0),
  mass: 3,
})

const redSquare = reactive({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  acceleration: new Point(0),
  mass: 1,
})

const mouseCoords = reactive({ x: 0, y: 0 })
const whiteTexture = Texture.WHITE

function testForAABB(obj1: typeof greenSquare, obj2: typeof redSquare) {
  return (
    obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y
  )
}

function collisionResponse(obj1: typeof greenSquare, obj2: typeof redSquare) {
  const vCollision = new Point(obj2.x - obj1.x, obj2.y - obj1.y)
  const distance = Math.sqrt(
    (obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y),
  )
  const vCollisionNorm = new Point(vCollision.x / distance, vCollision.y / distance)
  const vRelativeVelocity = new Point(
    obj1.acceleration.x - obj2.acceleration.x,
    obj1.acceleration.y - obj2.acceleration.y,
  )
  const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y
  const impulse = (impulsePower * speed) / (obj1.mass + obj2.mass)
  return new Point(impulse * vCollisionNorm.x, impulse * vCollisionNorm.y)
}

function distanceBetweenTwoPoints(p1: { x: number, y: number }, p2: { x: number, y: number }) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function onMouseMove(event: any) {
  mouseCoords.x = event.global.x
  mouseCoords.y = event.global.y
}

onReady((app) => {
  greenSquare.x = (app.screen.width - 100) / 2
  greenSquare.y = (app.screen.height - 100) / 2
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen
})

onTick((ticker) => {
  const delta = ticker.deltaTime
  const sw = screen.value.width
  const sh = screen.value.height

  redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99)
  greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99)

  if (greenSquare.x < 0 || greenSquare.x > sw - 100) {
    greenSquare.acceleration.x = -greenSquare.acceleration.x
  }
  if (greenSquare.y < 0 || greenSquare.y > sh - 100) {
    greenSquare.acceleration.y = -greenSquare.acceleration.y
  }
  if (
    greenSquare.x < -30 || greenSquare.x > sw + 30
    || greenSquare.y < -30 || greenSquare.y > sh + 30
  ) {
    greenSquare.x = (sw - 100) / 2
    greenSquare.y = (sh - 100) / 2
  }

  if (sw > mouseCoords.x || mouseCoords.x > 0 || sh > mouseCoords.y || mouseCoords.y > 0) {
    const redCenterX = redSquare.x + redSquare.width * 0.5
    const redCenterY = redSquare.y + redSquare.height * 0.5
    const toMouseX = mouseCoords.x - redCenterX
    const toMouseY = mouseCoords.y - redCenterY
    const angleToMouse = Math.atan2(toMouseY, toMouseX)
    const distMouseRed = distanceBetweenTwoPoints(mouseCoords, { x: redCenterX, y: redCenterY })
    const redSpeed = distMouseRed * movementSpeed
    redSquare.acceleration.set(Math.cos(angleToMouse) * redSpeed, Math.sin(angleToMouse) * redSpeed)
  }

  if (testForAABB(greenSquare, redSquare)) {
    const collisionPush = collisionResponse(greenSquare, redSquare)
    redSquare.acceleration.set(collisionPush.x * greenSquare.mass, collisionPush.y * greenSquare.mass)
    greenSquare.acceleration.set(-(collisionPush.x * redSquare.mass), -(collisionPush.y * redSquare.mass))
  }

  greenSquare.x += greenSquare.acceleration.x * delta
  greenSquare.y += greenSquare.acceleration.y * delta
  redSquare.x += redSquare.acceleration.x * delta
  redSquare.y += redSquare.acceleration.y * delta
})
</script>

<template>
  <container
    event-mode="static"
    :hit-area="screen"
    @mousemove="onMouseMove"
  >
    <sprite
      :texture="whiteTexture"
      :x="redSquare.x"
      :y="redSquare.y"
      :width="100"
      :height="100"
      :tint="0xFF0000"
    />
    <sprite
      :texture="whiteTexture"
      :x="greenSquare.x"
      :y="greenSquare.y"
      :width="100"
      :height="100"
      :tint="0x00FF00"
    />
  </container>
</template>
