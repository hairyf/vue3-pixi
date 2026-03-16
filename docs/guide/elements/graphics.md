# Graphics

Creates a [Graphics](https://pixijs.download/release/docs/scene.Graphics.html)

Graphics can be used for any kind of drawing. Use the `effect` event to interact with the Graphics API.

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

<demo src="./demo/graphics.vue" />

## API

### Graphics Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the sprite. |
| tint | <api-color /> | `undefined` | The tint applied to the graphic shape. |
| is-mask | ^[boolean] | `false` | Sets if this Graphics object is a mask. |

> more props in [Container Props](/guide/elements/container#container-props) and [Graphics](https://pixijs.download/release/docs/scene.Graphics.html)

### Graphics Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: Graphics): void` | Call your drawing functions on the Graphics instance here |

> more events in [Container Events](/guide/elements/container#container-events)

### Graphics Slots

| Name | Description |
| --- | --- |
| default | The default slot is used to render the children of the Graphics element. |
