# AnimatedSprite

Creates a [AnimatedSprite](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html)

A simple way to display an animation depicted by a list of textures.

I recommend using spritesheets created by TexturePacker ([they have a great tutorial on it](https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs)). If you don’t want to use spritesheets, you can simply just pass in an array of your desired textures.

## Spritesheet

<demo src="./demo/spritesheet.vue" />

## Multiple Animations from Spritesheet

<demo src="./demo/multiple-animations.vue" />

## API

### AnimatedSprite Props

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchorX | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchorY | ^[number] | `0` | The y anchor sets the origin point of the text. |
| textures | ^[array]`Array<Texture \| string>` | `undefined` | The textures to use for the animation |
| animationSpeed | ^[number] | `1` | The speed that the AnimatedSprite will play at. Higher is faster, lower is slower |
| blendMode | ^[number] [BLEND_MODES](https://pixijs.download/release/docs/PIXI.html#BLEND_MODES) | `BLEND_MODES.NORMAL` | The blend mode to be applied to the sprite. |
| loop | ^[boolean] | `true` | Whether or not the animate sprite repeats after playing. |
| playing | ^[boolean] | `false` | Whether or not the animation is playing. |

> more props in [Container Props](/guide/elements/container/#container-props) and [PIXI.AnimatedSprite](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html)

### AnimatedSprite Events

| Name | Type | Description |
| ---- | ---- | ---- |
| loop | ^[function]`():void` | when the AnimatedSprite finishes playing. |
| frame-change | ^[function]`(index: number):void` | when the AnimatedSprite changes to a new frame. |
| complete | ^[function]`():void` | when the AnimatedSprite finishes playing. |
| render | ^[function]`(inst: AnimatedSprite): void` | custom rendering listener |
<!-- | on-update:current-frame | ^[function]`(index: number):void` | when the AnimatedSprite changes to a new frame. | -->

> more events in [Container Events](/guide/elements/container/#container-events)

### AnimatedSprite Slots

| Name | Type | Description |
| ---- | ---- | ---- |
| default | |  |
