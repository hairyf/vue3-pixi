# Sprite

Creates a [Sprite](https://pixijs.download/release/docs/scene.Sprite.html)

Sprites are the base for all textured objects that are rendered to the screen

<demo src="./demo/sprite.vue" />

## API

### Sprite Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the sprite. |
| texture | ^[string] ^[object]`Texture` | `undefined` | The texture to use on the Sprite. |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |

> more props in [Container Props](/guide/elements/container#container-props) and [Sprite](https://pixijs.download/release/docs/scene.Sprite.html)

### Sprite Events

| Name | Type | Description |
| --- | --- | --- |
| effect | ^[function]`(el: Sprite): void` | custom render function |

> more events in [Container Events](/guide/elements/container#container-events)
