# BitmapText

Creates a [BitmapText](https://pixijs.download/release/docs/PIXI.BitmapText.html)

Renders a line or multiple lines of text using bitmap font.

The primary advantage of this class over Text is that all of your textures are pre-generated and loading, meaning that rendering is fast, and changing text has no performance implications.

> Supporting character sets other than latin, such as CJK languages, may be impractical due to the number of characters.

To split a line you can use `\n`, `\r` or `\r\n` in your string.

PixiJS can auto-generate fonts on-the-fly using BitmapFont or use fnt files provided by: [angelcode.com/products/bmfont/](http://www.angelcode.com/products/bmfont/) for Windows or [bmglyph.com](http://www.bmglyph.com/) for Mac.

You can also use SDF, MSDF and MTSDF BitmapFonts for vector-like scaling appearance provided by: [github.com/soimy/msdf-bmfont-xml](https://github.com/soimy/msdf-bmfont-xml) for SDF and MSDF fnt files or [github.com/Chlumsky/msdf-atlas-gen](https://github.com/Chlumsky/msdf-atlas-gen) for SDF, MSDF and MTSDF json files

A BitmapText can only be created when the font is loaded.

<demo src="./demo/basic.vue" width="440" />

## API

### BitmapText Attributes

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |
| style | ^[object]`BitmapTextStyle` | `object` | The style parameters. |
| text | ^[string] | `''` | The text to display. |
| align | ^[enum]`'left'\|'center'\|'right'\|'justify'` | `left` | The alignment of the BitmapText. |
| font-name | ^[string] | `undefined` | The name of the font to use. |
| font-size | ^[number] | `undefined` | The size of the font. |
| letter-spacing | ^[number] | `undefined` | The amount of spacing between letters. |
| max-width | ^[number] | `undefined` | The maximum width of the text before it wraps. |
| max-line-height | ^[number] | `undefined` | The maximum line height. |
| resolution | ^[number] | `undefined` | The resolution of the BitmapText. |
| dirty | ^[boolean] | `false` | Whether or not the text has changed. |

> more attributes in [Container Props](/guide/elements/container/#container-props) and [PIXI.BitmapText](https://pixijs.download/release/docs/PIXI.BitmapText.html)

### BitmapText Events

| Name | Type | Description |
| ---- | ---- | ---- |
| render | ^[function]`(el: BitmapText): void` | custom rendering listener |

> more events in [Container Events](/guide/elements/container/#container-events)

## BitmapText Slots

| Name | Description |
| ---- | ---- |
| default | The text to display. |