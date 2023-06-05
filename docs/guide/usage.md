# Usage

The [Application](/) component will create your PixiJS app and canvas for you.

All Vue3 Pixi elements should be children of Application.

<demo src="./demo/basic.vue" :app="false" />

## Sprites


Sprite component requires a `texture`, which can be a Texture object or a path to an image.

PixiJS will load the texture in the background and show it when it’s ready - similar to how an `img` tag works.


<demo src="./demo/sprite.vue" :app="false" />

## Loader

If you have a bunch of images or other resources, you may wish to show a loading screen until all images have finished loading (rather than have them pop in one after another).

> Note: You may want to enable network throttling in your browser dev tools to actually see the loading screen - these are small images!

<demo src="./demo/loader.vue" :app="false" />

You can have multiple Loader components as well, which could be useful if you wanted to render a fallbacks at a component-level instead.

## Ticker

A [Ticker](/) runs an update loop for the `application`. The Application component will create one automatically, which means child components can hook into the loop with `onTick`.

<demo src="./demo/ticker.vue" />

## Filter

To use filters, you need to add the filter as a child element to the element where you want to apply the filtering effect.

<demo src="./demo/filter.vue" />

## Render Events

all elements support render event, which allows for flexible manipulation of elements, For example, using on `<grahpics />` and `<particle-container />`

This will set up a `watchEffect` internally that will automatically call the event handler again if any dependencies on the render method have changed.

<demo src="./demo/render-event.vue" />

## Accessing PixiJS Instances

You can bind PixiJS instances through ref, It is like the HTML elements, so you can bind to it if you need to access it.

<demo src="./demo/refs.vue" />

## Using a Custom Instance

You can add custom `PIXI` instances to the `renderer`, if you have a custom class (whether that be your own or from a third-party library).

```ts
// main.js
import { Text } from 'pixi.js'
import { pathProp as defPathProp, renderer } from 'vue3-pixi'

class YellowText extends Text {
  constructor(text, style) {
    super(text, style)
    this.style.fill = 'yellow'
  }
}

renderer.use({
  name: 'YellowText',
  createElement: props => new YellowText(props.text, props.style),
  pathProp(el, key, prevValue, nextValue) {
    // handle special prop here..

    // or fallback to default
    return defPathProp(el, key, prevValue, nextValue)
  },
})

```

<demo src="./demo/custom-instance.vue" :codesandbox="false" />
