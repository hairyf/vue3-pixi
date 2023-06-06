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
| `textures` | `Array<Texture \| string>` | `-` | The textures to use for the animation |

## API

### Attributes

| Name    | Description                                               | Type                                                              | Default |
| ------- | --------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| icon    | representation type to icon, more info on icon component. | ^[string\|Component]                                          | —       |
| size    | avatar size.                                              | ^[number]\|^[enum]`'large' \| 'default' \| 'small'`              | default |
| shape   | avatar shape.                                             | ^[enum]`'circle' \| 'square'`                                     | circle  |
| src     | the source of the image for an image avatar.              | `string`                                                          | —       |
| src-set | native attribute `srcset` of image avatar.                | `string`                                                          | —       |
| alt     | native attribute `alt` of image avatar.                   | `string`                                                          | —       |
| fit     | set how the image fit its container for an image avatar.  | ^[enum]`'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | cover   |

### Events

| Name  | Description                    | Type                            |
| ----- | ------------------------------ | ------------------------------- |
| error | trigger when image load error. | ^[Function]`(e: Event) => void` |

### Slots

| Name    | Description               |
| ------- | ------------------------- |
| default | customize avatar content. |