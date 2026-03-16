# NineSliceSprite

Creates a [NineSliceSprite](https://pixijs.download/release/docs/scene.NineSliceSprite.html)

Allows you to stretch a texture using 9-slice scaling. The corners remain unscaled (useful for buttons with rounded corners, for example) and the other areas scale horizontally and/or vertically.

<demo src="./demo/nine-slice-plane.vue" />

## API

### NineSliceSprite Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`Texture` | `undefined` | The texture to use on the NineSliceSprite. |
| left-width | ^[number] | `undefined` | The width of the left column |
| right-width | ^[number] | `undefined` | The width of the right column |
| top-height | ^[number] | `undefined` | The height of the top row |
| bottom-height | ^[number] | `undefined` | The height of the bottom row |

> more props in [Container Props](/guide/elements/container#container-props) and [PixiJS NineSliceSprite](https://pixijs.download/release/docs/scene.NineSliceSprite.html)

### NineSliceSprite Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: NineSliceSprite): void` | Custom effect function called each frame |

> more events in [Container Events](/guide/elements/container#container-events)
