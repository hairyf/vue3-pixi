# Usage

The Application component will create your PixiJS app and canvas for you.

All Vue3 Pixi elements should be children of Application.

<demo src="./demo/basic.vue" :app="false" />

## Sprites


Sprite component requires a `texture`, which can be a Texture object or a path to an image.

PixiJS will load the texture in the background and show it when it’s ready - similar to how an `img` tag works.


<demo src="./demo/sprite.vue" :app="false" />

## Loaders

If you have a bunch of images or other resources, you may wish to show a loading screen until all images have finished loading (rather than have them pop in one after another).

> Note: You may want to enable network throttling in your browser dev tools to actually see the loading screen - these are small images!

<demo src="./demo/loader.vue" :app="false" />