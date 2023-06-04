# Usage

The Application component will create your PixiJS app and canvas for you.

All Vue3 Pixi elements should be children of Application.

<demo src="./demo/basic.vue" :app="false" />

## Sprites


Sprite component requires a `texture`, which can be a Texture object or a path to an image.

PixiJS will load the texture in the background and show it when it’s ready - similar to how an `img` tag works.


<demo src="./demo/sprite.vue" :app="false" />
