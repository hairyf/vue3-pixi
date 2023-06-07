# Sprite

Creates a [Sprite](https://svelte-pixi.com/docs/components/sprite)

Sprites are the base for all textured objects that are rendered to the screen

<demo src="./demo/sprite.vue" />

## API

### Sprite Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the Sprite. |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |

> more props in [Container Props](/guide/elements/container/#container-props) and [PIXI.Sprite](https://pixijs.download/release/docs/PIXI.Sprite.html)

### Sprite Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: Sprite): void` | custom render function |

> more events in [Container Events](/guide/elements/container/#container-events)