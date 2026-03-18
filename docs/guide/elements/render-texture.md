# Render Textures

Render textures allow you to render any display object to a texture, which can then be used as a sprite texture. This is useful for pre-rendering complex scenes, creating screenshot features, post-processing effects, and feedback/trail effects via double-buffering.

## Basic Usage

Create a `RenderTexture`, render a container into it each frame, and display the result in a sprite:

```vue
<script setup>
import { Container, RenderTexture, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()
const containerRef = ref<Container>()
const outputRef = ref<Sprite>()
let renderTexture: RenderTexture | null = null

onMounted(() => {
  renderTexture = RenderTexture.create({ width: 300, height: 300 })
  if (outputRef.value) {
    outputRef.value.texture = renderTexture
  }
})

onTick(() => {
  if (!containerRef.value || !renderTexture || !app.value)
    return
  app.value.renderer.render({
    container: containerRef.value,
    target: renderTexture,
  })
})
</script>

<template>
  <assets alias="bunny" entry="https://pixijs.com/assets/bunny.png">
    <!-- Source: rendered to texture -->
    <Container ref="containerRef" :x="100" :y="60">
      <Sprite texture="bunny" :x="0" :y="0" />
      <Sprite texture="bunny" :x="30" :y="30" />
    </Container>
    <!-- Output: displays the render texture -->
    <Sprite ref="outputRef" :x="450" :y="60" />
  </assets>
</template>
```

## Double-Buffering

For feedback or trail effects, swap between two render textures each frame. This creates an accumulating visual where previous frames bleed into the current one:

```vue
<script setup>
import { RenderTexture, Sprite } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication, useScreen } from 'vue3-pixi'

const screen = useScreen()
const app = useApplication()
const outputRef = ref<Sprite>()

let rtA: RenderTexture | null = null
let rtB: RenderTexture | null = null

onMounted(() => {
  const size = { width: screen.value.width, height: screen.value.height }
  rtA = RenderTexture.create(size)
  rtB = RenderTexture.create(size)
  if (outputRef.value) {
    outputRef.value.texture = rtA
  }
})

onTick(() => {
  if (!outputRef.value || !rtA || !rtB || !app.value)
    return

  // Swap buffers
  const temp = rtA
  rtA = rtB
  rtB = temp

  outputRef.value.texture = rtA

  // Render the entire stage into the back buffer (without clearing)
  app.value.renderer.render({
    container: app.value.stage,
    target: rtB,
    clear: false,
  })
})
</script>

<template>
  <Sprite ref="outputRef" :x="screen.width / 2" :y="screen.height / 2" :anchor="0.5" />
  <!-- Other scene content here -->
</template>
```

## Key API

| Method / Constructor | Description |
| --- | --- |
| `RenderTexture.create({ width, height, resolution? })` | Creates a new render texture with the given dimensions. |
| `renderer.render({ container, target, clear? })` | Renders the container into the target RenderTexture. Set `clear: false` to preserve previous content. |

## Related Examples

- [Render Texture / Basic](/examples/rendering/render_texture_basic)
- [Render Texture / Buffer](/examples/rendering/render_texture_buffer)
- [Render Texture / Scratch Card](/examples/rendering/render_texture_scratch_card)
