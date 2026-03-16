<script lang="ts" setup>
import { Container, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()
const innerContainerRef = ref()
const screenshotUrl = ref('')
const rotation = ref(0)

onTick((ticker) => {
  rotation.value -= 0.01 * ticker.deltaTime
})

function onContainerEffect(el: Container) {
  innerContainerRef.value = el
}

async function takeScreenshot() {
  if (!app.value?.renderer || !innerContainerRef.value) return
  app.value.stop()
  const url = await app.value.renderer.extract.base64(innerContainerRef.value.parent)
  screenshotUrl.value = url
  app.value.start()
  // Open screenshot in new window
  const w = window.open('')
  if (w) {
    w.document.body.innerHTML = `<img src="${url}" />`
  }
}
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <container
      event-mode="static"
      :hit-area="screen"
      @pointerdown="takeScreenshot"
    >
      <text
        :x="Math.round((screen.width - 200) / 2)"
        :y="20"
        :style="{ fontFamily: 'Roboto', fill: '#999' }"
        text="Click To Take Screenshot"
      />
      <container :x="screen.width / 2" :y="screen.height / 2">
        <container
          :rotation="rotation"
          :pivot-x="80"
          :pivot-y="80"
          @effect="onContainerEffect"
        >
          <sprite
            v-for="i in 25"
            :key="i"
            texture="bunny"
            :x="((i - 1) % 5) * 40"
            :y="Math.floor((i - 1) / 5) * 40"
          />
        </container>
      </container>
    </container>
  </assets>
</template>
