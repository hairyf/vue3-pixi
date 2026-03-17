# HTMLText

Creates an [HTMLText](https://pixijs.download/release/docs/scene.HTMLText.html)

Renders text using HTML and CSS within a PixiJS scene. This allows rich formatting including custom fonts, colors, links, and other CSS styles that are not available with the standard `<text>` element.

## Usage

```vue
<script setup>
const style = {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: '#336699',
  wordWrap: true,
  wordWrapWidth: 400,
}
</script>

<template>
  <html-text
    text="Hello <b>World</b>!"
    :style="style"
    :x="50"
    :y="50"
  />
</template>
```

### Rich HTML Content

HTMLText supports inline HTML tags for formatting:

```vue
<template>
  <html-text
    text="<h2>Title</h2><p>Styled with <em>CSS</em> and <span style='color:red'>HTML</span></p>"
    :style="{ fontSize: 16, wordWrap: true, wordWrapWidth: 300 }"
  />
</template>
```

## API

### HTMLText Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text | ^[string] | `''` | The HTML string to render. Supports inline HTML tags. |
| style | ^[object]`TextStyle \| HTMLTextStyle` | `undefined` | Text style options including font, fill, wordWrap, and CSS properties. |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |

> more props in [Container Props](/guide/elements/container#container-props) and [HTMLText](https://pixijs.download/release/docs/scene.HTMLText.html)

### HTMLText Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: HTMLText): void` | Custom render function |

> more events in [Container Events](/guide/elements/container#container-events)

## Notes

- HTMLText renders via a foreign object in SVG, then rasterizes to a texture. This makes it slower than `<text>` or `<bitmap-text>` for frequently changing content.
- Best suited for static or infrequently updated rich text where CSS styling is needed.
- For high-performance text, prefer `<text>` or `<bitmap-text>`.
