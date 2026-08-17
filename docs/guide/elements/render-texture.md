# Render Textures

Render textures allow you to render any display object to a texture, which can then be used as a sprite texture. This is useful for pre-rendering complex scenes, creating screenshot features, post-processing effects, and feedback/trail effects via double-buffering.

## Basic Usage

Create a `RenderTexture`, render a *detached* container into it each frame, and display the result in a sprite:

```vue
<script setup>
import { Container, RenderTexture, Sprite, Texture } from 'pixi.js'
import { onMounted, ref } from 'vue'
import { onTick, useApplication } from 'vue3-pixi'

const app = useApplication()
const outputRef = ref<Sprite>()

// The render source: a detached container created imperatively.
// It is never added to app.stage / the template tree, so rendering it
// into a texture every frame cannot disturb the on-stage scene.
const source = new Container()
let renderTexture: RenderTexture | null = null

onMounted(() => {
  renderTexture = RenderTexture.create({ width: 300, height: 300 })
  if (outputRef.value) {
    outputRef.value.texture = renderTexture
  }
})

// Called by <assets> once the bunny texture is loaded
function onBunnyLoaded(texture: Texture) {
  source.addChild(new Sprite(texture))
  const second = new Sprite(texture)
  second.position.set(30, 30)
  source.addChild(second)
}

onTick(() => {
  if (!renderTexture || !app.value)
    return
  app.value.renderer.render({
    container: source,
    target: renderTexture,
  })
})
</script>

<template>
  <assets
    alias="bunny"
    entry="https://pixijs.com/assets/bunny.png"
    @loaded="onBunnyLoaded"
  />
  <!-- Output: displays the render texture -->
  <Sprite ref="outputRef" :x="450" :y="60" />
</template>
```

> **Warning**: the container passed to `renderer.render()` must be **detached from the stage**. Every element of the template tree is mounted onto `app.stage`, so a template `Container` is already a live stage member. `renderer.render()` calls `container.enableRenderGroup()` on its source, which gives such a container two rendering identities — its regular spot in the stage's render group plus its own promoted render group — corrupting its normal on-stage presentation (solid black or flickering sprites) and triggering GL feedback-loop errors such as `GL_INVALID_OPERATION: glDrawElements: Feedback loop formed between Framebuffer and active Texture`. Always create the render source imperatively with `new Container()`, populate it in script, and never add it to `app.stage` or the template tree.

## Double-Buffering

For feedback or trail effects, swap between two render textures each frame. This creates an accumulating visual where previous frames bleed into the current one. **This is the one deliberate exception to the "detached source" rule above: the source is `app.stage` itself.**

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

  // Render the entire stage into the back buffer (without clearing).
  // The stage root is the deliberate exception: rendering the live scene
  // (which already contains the output sprite) creates the feedback trail.
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
