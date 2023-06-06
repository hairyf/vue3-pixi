# Text

Creates a [Text](https://pixijs.download/release/docs/PIXI.Text.html)

Renders a line or multiple lines of text to the canvas.

The primary advantage of this class over BitmapText is that you have great control over the style of the text, which you can change at runtime.

The primary disadvantages is that each piece of text has it’s own texture, which can use more memory. When text changes, this texture has to be re-generated and re-uploaded to the GPU, taking up time.

To split a line you can use `\n` in your text string, or, on the style prop, change its `wordWrap` property to true and and give the `wordWrapWidth` property a value.

<demo src="./demo/basic.vue" />

## API

### Text Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| text | ^[string] | `undefined` | The text to display. |
| style | ^[object]`PIXI.TextStyle` | `undefined` | The style parameters. |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |

> more props in [Container Props](/guide/elements/container/#container-props) and [PIXI.Text](https://pixijs.download/release/docs/PIXI.Text.html)

### Text Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: Text): void` | custom render function |

> more events in [Container Events](/guide/elements/container/#container-events)