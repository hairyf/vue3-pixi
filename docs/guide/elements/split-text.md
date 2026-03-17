# SplitText / SplitBitmapText

Creates a [SplitText](https://pixijs.download/release/docs/scene.SplitText.html) or [SplitBitmapText](https://pixijs.download/release/docs/scene.SplitBitmapText.html)

These elements break text into individual character containers, allowing per-character animation (wave effects, typewriter reveals, scattered entrances, etc.).

- `<split-text>` splits standard canvas-rendered text
- `<split-bitmap-text>` splits bitmap font text

## Usage

SplitText and SplitBitmapText expose a `.chars` array that gives you direct access to each character as a display object. Use a ref and animate each character individually.

```vue
<script setup>
import { SplitText } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const splitRef = ref<SplitText>()
let frame = 0

onTick(() => {
  if (!splitRef.value)
    return
  frame++
  const chars = splitRef.value.chars
  for (let i = 0; i < chars.length; i++) {
    chars[i].y = Math.sin((frame + i * 4) * 0.05) * 5
  }
})
</script>

<template>
  <SplitText
    ref="splitRef"
    text="Wave animation!"
    :style="{ fontFamily: 'Arial', fontSize: 32, fill: 'white' }"
    :x="50"
    :y="100"
  />
</template>
```

### SplitBitmapText

For bitmap fonts, load the font first using `<assets>`, then use `<split-bitmap-text>`:

```vue
<script setup>
import { SplitBitmapText } from 'pixi.js'
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const splitRef = ref<SplitBitmapText>()
let frame = 0

onTick(() => {
  if (!splitRef.value)
    return
  frame++
  for (const [i, char] of splitRef.value.chars.entries()) {
    char.y = Math.sin((frame + i * 4) * 0.05) * 5
  }
})
</script>

<template>
  <assets alias="desyrel" entry="https://pixijs.com/assets/bitmap-font/desyrel.xml">
    <SplitBitmapText
      ref="splitRef"
      text="Bitmap wave!"
      :style="{ fontFamily: 'Desyrel', fontSize: 60, fill: 'white' }"
      :x="50"
      :y="100"
    />
  </assets>
</template>
```

## API

### SplitText Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text | ^[string] | `''` | The text string to split into characters. |
| style | ^[object]`TextStyle` | `undefined` | Text style options (font, fill, wordWrap, etc.). Set at creation time. |
| round-pixels | ^[boolean] | `false` | Whether to round pixel positions for sharper rendering. |

> more props in [Container Props](/guide/elements/container#container-props) and [SplitText](https://pixijs.download/release/docs/scene.SplitText.html)

### SplitBitmapText Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text | ^[string] | `''` | The text string to split into characters. |
| style | ^[object]`TextStyle` | `undefined` | Bitmap text style (fontFamily, fontSize, fill, etc.). Set at creation time. |
| round-pixels | ^[boolean] | `false` | Whether to round pixel positions for sharper rendering. |

> more props in [Container Props](/guide/elements/container#container-props) and [SplitBitmapText](https://pixijs.download/release/docs/scene.SplitBitmapText.html)

### Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: SplitText \| SplitBitmapText): void` | Custom render function |

> more events in [Container Events](/guide/elements/container#container-events)

### Instance Properties

| Name | Type | Description |
| --- | --- | --- |
| chars | ^[array]`Container[]` | Array of individual character display objects. Animate these for per-character effects. |
