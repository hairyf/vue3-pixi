# TilingSprite

Creates a [TilingSprite](https://pixijs.download/release/docs/PIXI.TilingSprite.html)

<demo src="./demo/basic.vue" />

## API

### TilingSprite Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the TilingSprite. |
| tile-scale | <api-point /> | `1` | The scale factor of the tile. |
| tile-scale-x | ^[number] | `1` | The scale factor of the tile's x axis. |
| tile-scale-y | ^[number] | `1` | The scale factor of the tile's y axis. |
| tile-position | <api-point /> | `0` | The offset position of the tile. |
| tile-position-x | ^[number] | `0` | The offset position of the tile's x axis. |
| tile-position-y | ^[number] | `0` | The offset position of the tile's y axis. |
| tile-transform | ^[object]`PIXI.Transform` | `false` | Whether or not anchor and position transforms should be applied to tiles. |

> more props in [Container Props](/guide/elements/container/#container-props) and [PIXI.TilingSprite](https://pixijs.download/release/docs/PIXI.TilingSprite.html)

### TilingSprite Events

| Name | Type | Description |
| --- | --- | --- |
| render | ^[function]`(el: TilingSprite): void` | custom render function |

> more events in [Container Events](/guide/elements/container/#container-events)
