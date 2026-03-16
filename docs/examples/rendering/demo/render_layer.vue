<script lang="ts" setup>
import {
  Assets,
  Container,
  DisplacementFilter,
  Graphics,
  RenderLayer,
  Sprite,
  Text,
  TilingSprite,
} from 'pixi.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()

const pondContainerRef = ref<Container>()
const displacementSpriteRef = ref<Sprite>()

let waterOverlay: TilingSprite | null = null
let displacementSprite: Sprite | null = null
let uiLayer: RenderLayer | null = null

interface FishData {
  container: Container
  fishView: Sprite
  ui: Container
  speed: number
  direction: number
}

const fishes: FishData[] = []

const names = ['Alice', 'Bob', 'Caroline', 'David', 'Ellie', 'Frank', 'Gloria', 'Henry', 'Isabel', 'Jack']

onMounted(async () => {
  if (!app.value || !pondContainerRef.value)
    return

  await Assets.load([
    'https://pixijs.com/assets/pond/displacement_BG.jpg',
    'https://pixijs.com/assets/pond/overlay.png',
    'https://pixijs.com/assets/pond/displacement_map.png',
    'https://pixijs.com/assets/pond/displacement_fish1.png',
    'https://pixijs.com/assets/pond/displacement_fish2.png',
  ])

  const pondContainer = pondContainerRef.value

  const background = Sprite.from('https://pixijs.com/assets/pond/displacement_BG.jpg')
  pondContainer.addChild(background)

  const displacementMap = Assets.get('https://pixijs.com/assets/pond/displacement_map.png')
  displacementMap.source.wrapMode = 'repeat'

  displacementSprite = Sprite.from(displacementMap)
  const displacementFilter = new DisplacementFilter(displacementSprite, 40)

  pondContainer.addChild(displacementSprite)
  pondContainer.filters = [displacementFilter]

  uiLayer = new RenderLayer()

  const textures = [
    Assets.get('https://pixijs.com/assets/pond/displacement_fish1.png'),
    Assets.get('https://pixijs.com/assets/pond/displacement_fish2.png'),
  ]

  for (let i = 0; i < 10; i++) {
    const fishContainer = new Container()
    const fishView = new Sprite(textures[i % textures.length])
    fishView.anchor.set(0.5)
    fishContainer.addChild(fishView)

    // Create UI label
    const name = names[i % names.length]
    const label = new Text({
      text: name,
      resolution: 2,
      style: { fontSize: 16, fill: 0x000000 },
      anchor: 0.5,
    })
    const padding = 10
    const bg = new Graphics()
      .roundRect(
        -label.width / 2 - padding,
        -label.height / 2 - padding,
        label.width + padding * 2,
        label.height + padding * 2,
        20,
      )
      .fill({ color: 0xFFFF00, alpha: 1 })

    const ui = new Container()
    ui.addChild(bg, label)
    fishContainer.addChild(ui)

    fishContainer.x = Math.random() * 630
    fishContainer.y = Math.random() * 410

    pondContainer.addChild(fishContainer)
    uiLayer.attach(ui)

    fishes.push({
      container: fishContainer,
      fishView,
      ui,
      speed: 1 + Math.random(),
      direction: Math.random() * Math.PI * 2,
    })
  }

  waterOverlay = TilingSprite.from(Assets.get('https://pixijs.com/assets/pond/overlay.png'))
  waterOverlay.width = 630
  waterOverlay.height = 410
  pondContainer.addChild(waterOverlay)

  app.value.stage.addChild(uiLayer)
})

onTick(() => {
  if (waterOverlay) {
    waterOverlay.tilePosition.x += 0.5
    waterOverlay.tilePosition.y += 0.5
  }
  if (displacementSprite) {
    displacementSprite.x += 0.5
    displacementSprite.y += 0.5
  }

  const padding = 100
  const width = 630
  const height = 410

  for (const fish of fishes) {
    fish.direction += 0.001
    fish.fishView.rotation = Math.PI - fish.direction
    fish.container.x += fish.speed * Math.cos(-fish.direction)
    fish.container.y += fish.speed * Math.sin(-fish.direction)

    if (fish.container.x > width + padding)
      fish.container.x -= width + padding * 2
    if (fish.container.x < -padding)
      fish.container.x += width + padding * 2
    if (fish.container.y > height + padding)
      fish.container.y -= height + padding * 2
    if (fish.container.y < -padding)
      fish.container.y += height + padding * 2
  }
})

onUnmounted(() => {
  if (pondContainerRef.value) {
    pondContainerRef.value.destroy({ children: true })
  }
  if (uiLayer) {
    uiLayer.destroy()
  }
})
</script>

<template>
  <container ref="pondContainerRef" />
</template>
