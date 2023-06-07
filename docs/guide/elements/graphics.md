# Graphics

Creates a [Graphics](https://pixijs.download/release/docs/PIXI.Graphics.html)

Graphics can be used for any kind of drawing. Use the `draw` prop to interact with the PIXI.Graphics API.

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

<demo src="./demo/graphics.vue" />

## API

### Graphics Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |
| plugin-name | ^[string] | `undefined` | The name of the plugin that is responsible for rendering this element. |
| tint | <api-color /> | `undefined` | The tint applied to the graphic shape. |
| is-mask | ^[boolean] | `false` | Sets if this Graphics object is a mask. |

> more props in [Container Props](/guide/elements/container/#container-props) and [PIXI.Graphics](https://pixijs.download/release/docs/PIXI.Graphics.html)

### Graphics Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: Graphics): void` | Call your drawing functions on the PIXI.Graphics instance here |

> more events in [Container Events](/guide/elements/container/#container-events)

### Graphics Slots

| Name | Description |
| --- | --- |
| default | The default slot is used to render the children of the Graphics element. |