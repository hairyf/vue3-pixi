<script lang="ts" setup>
import type { Container as ContainerElement } from 'pixi.js'
import { whenever } from '@vueuse/core'
import { gsap } from 'gsap'
import { DropShadowFilter } from 'pixi-filters'
import { Graphics, Text } from 'pixi.js'
import { onUnmounted, ref } from 'vue'
import { useScreen } from 'vue3-pixi'

const screen = useScreen()

const dropShadowFilter = new DropShadowFilter({
  color: 'black',
  alpha: 0.25,
  blur: 4,
  offset: { x: 0, y: 10 },
})

const words = ['PixiJS', '&', 'GSAP', '💚']
const wrapper = ref<ContainerElement>()
const wordContainers = ref<ContainerElement[]>()
let animation: gsap.core.Tween | null = null

function initial(wrapper: ContainerElement, wordContainers: ContainerElement[]) {
  // Calculate spacing
  let spacing = 0
  wordContainers.forEach((container) => {
    const text = container.children.find(child => child instanceof Text) as Text
    if (text) {
      container.pivot.set(text.width / 2, text.height / 2)
      container.x = spacing + text.width / 2
      spacing += container.width + 10
    }
  })

  wrapper.pivot.x = spacing / 2

  // Start animation
  animation = gsap.from(wordContainers, {
    y: -100,
    alpha: 0,
    angle: 'random(-80, 80)',
    stagger: 0.1,
    duration: 1,
    ease: 'back',
    yoyo: true,
    repeat: -1,
    repeatDelay: 1,
  })
}

whenever(
  () => wordContainers.value && wrapper.value,
  () => initial(wrapper.value!, wordContainers.value!),
  { immediate: true }
)

onUnmounted(() => animation?.kill())
</script>

<template>
  <assets entry="https://pixijs.com/assets/webfont-loader/Grandstander-ExtraBold.ttf">
    <container ref="wrapper" :x="screen.width / 2" :y="screen.height / 2">
      <container
        v-for="(word, i) in words"
        :key="i" 
        ref="wordContainers"
        @effect="container => {
          const padding = 20
          // Create text
          const text = new Text({
            text: word,
            style: {
              fontFamily: 'Grandstander ExtraBold',
              fontSize: 36,
              fill: 0xFFFFFF,
            },
          })

          // Create rounded rectangle
          const box = new Graphics()
            .roundRect(
              -padding / 2,
              -padding / 2,
              text.width + padding,
              text.height + padding,
              8,
            )
            .fill({ color: 0xED427C })
            .stroke({ color: 'white', width: 2 })

          box.filters = [dropShadowFilter]

          container.pivot.set(text.width / 2, text.height / 2)
          // Add box and text to container
          container.addChild(box, text)
      }"
      />
    </container>
  </assets>
</template>
