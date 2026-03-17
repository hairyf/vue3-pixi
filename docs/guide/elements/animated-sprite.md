# AnimatedSprite

Creates a [AnimatedSprite](https://pixijs.download/release/docs/scene.AnimatedSprite.html)

A simple way to display an animation depicted by a list of textures.

I recommend using spritesheets created by TexturePacker ([they have a great tutorial on it](https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs)). If you don’t want to use spritesheets, you can simply just pass in an array of your desired textures.

## Spritesheet

<demo src="./demo/spritesheet.vue" />

## Multiple Animations from Spritesheet

<demo src="./demo/multiple-animations.vue" />

## API

### AnimatedSprite Attributes

| Name | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| blend-mode | <api-blend-mode /> | `'normal'` | The blend mode to be applied to the sprite. |
| anchor | <api-point /> | `0` | The anchor sets the origin point of the text. |
| anchor-x | ^[number] | `0` | The x anchor sets the origin point of the text. |
| anchor-y | ^[number] | `0` | The y anchor sets the origin point of the text. |
| textures | ^[array]`Array<Texture \| FrameObject \| string>` | `undefined` | The textures to use for the animation |
| animation-speed | ^[number] | `1` | The speed that the AnimatedSprite will play at. Higher is faster, lower is slower |
| loop | ^[boolean] | `true` | Whether or not the animate sprite repeats after playing. |
| playing | ^[boolean] | `false` | Whether or not the animation is playing. |

> more attributes in [Container Attributes](/guide/elements/container#container-attributes) and [AnimatedSprite](https://pixijs.download/release/docs/scene.AnimatedSprite.html)

### AnimatedSprite Events

| Name | Type | Description |
| ---- | ---- | ---- |
| loop | ^[function]`():void` | when the AnimatedSprite finishes playing. |
| frame-change | ^[function]`(index: number):void` | when the AnimatedSprite changes to a new frame. |
| complete | ^[function]`():void` | when the AnimatedSprite finishes playing. |
| effect | ^[function]`(el: AnimatedSprite): void` | custom rendering listener |
<!-- | on-update:current-frame | ^[function]`(index: number):void` | when the AnimatedSprite changes to a new frame. | -->

> more events in [Container Events](/guide/elements/container#container-events)
