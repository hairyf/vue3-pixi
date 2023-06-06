# SimpleRope

Creates a [SimpleRope](https://pixijs.download/release/docs/PIXI.SimpleRope.html)

The rope allows you to draw a texture across several points and then manipulate these points

<demo src="./demo/basic.vue" :width="400" />

## API

### SimpleRope Attributes

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| texture | ^[string] ^[object]`PIXI.Texture` | `undefined` | The texture to use on the SimpleRope. |
| points | ^[Array<object>]`PIXI.IPoint[]` | `undefined` | An array of points or point-like objects to construct this rope. |
