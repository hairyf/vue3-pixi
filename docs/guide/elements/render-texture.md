# Render Textures

Render textures allow you to render any display object to a texture, which can then be used as a sprite texture. This is useful for pre-rendering complex scenes, creating screenshot features, post-processing effects, and feedback/trail effects via double-buffering.

## Basic Usage

Create a `RenderTexture`, render a container into it each frame, and display the result in a sprite.

::: warning Keep the render source off-stage
`renderer.render({ container, ... })` promotes `container` into its own render group as a side effect. Doing that to a container that's *also* a normal member of the visible tree (e.g. mounted under `<Container>`/`app.stage` via a template) can corrupt both the on-stage presentation and the render-texture output — PixiJS doesn't expect a render-to-texture source to also live on-stage. Build the source with plain PixiJS calls and never add it to the template/stage; only the *output* sprite needs to be a template element.
:::

```vue
<script setup>
import { Container, Graphics, RenderTexture, Sprite } from 'pixi.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()
const outputRef = ref<Sprite>()
let renderTexture: RenderTexture | null = null
let source: Container | null = null

onMounted(() => {
  // Plain PixiJS container — deliberately never added to app.stage or any
  // mounted <Container>, so it only ever plays the "render source" role.
  source = new Container()
  source.addChild(new Graphics().rect(0, 0, 60, 60).fill(0xFFFFFF))
  source.addChild(new Graphics().rect(70, 0, 60, 60).fill(0xFFFFFF))
  source.x = 100
  source.y = 60

  renderTexture = RenderTexture.create({ width: 300, height: 300 })
  if (outputRef.value) {
    outputRef.value.texture = renderTexture
  }
})

onUnmounted(() => {
  source?.destroy({ children: true })
  renderTexture?.destroy(true)
})

onTick(() => {
  if (!source || !renderTexture || !app.value)
    return
  app.value.renderer.render({
    container: source,
    target: renderTexture,
  })
})
</script>

<template>
  <!-- Output: displays the render texture. No on-stage copy of the source. -->
  <Sprite ref="outputRef" :x="450" :y="60" />
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
