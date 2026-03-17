# Usage

The [Application](/guide/components/application) component will create your PixiJS app and canvas for you.

All Vue3 Pixi elements should be children of Application.

<demo src="./demo/basic.vue" :app="false" />

## Sprites

Sprite component requires a `texture`, which can be a Texture object or a path to an image.

PixiJS will load the texture in the background and show it when it's ready - similar to how an `img` tag works.

<demo src="./demo/sprite.vue" :app="false" />

## Assets

If you have a bunch of images or other resources, you may wish to show a loading screen until all images have finished loading (rather than have them pop in one after another).

> Note: You may want to enable network throttling in your browser dev tools to actually see the loading screen - these are small images!

<demo src="./demo/assets.vue" :app="false" />

You can have multiple Assets components as well, which could be useful if you want to render fallbacks at a component level instead.

## Ticker

Update loop for the `application`. The Application component will create one automatically, which means child components can hook into the loop with `onTick`.

In PixiJS v8, the `onTick` callback receives a Ticker instance. Use `ticker.deltaTime` for the frame delta:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { onTick } from 'vue3-pixi'

const x = ref(0)

onTick(({ deltaTime }) => {
  x.value += deltaTime * 0.05
})
</script>
```

<demo src="./demo/ticker.vue" />

## Filter

To use filters, you need to add the filter as a child element to the element where you want to apply the filtering effect.

<demo src="./demo/filter.vue" />

## Effect Events

All elements support the `@effect` event for manipulating elements directly. This is useful with `<graphics />` and other elements that need imperative drawing.

This sets up a `watchEffect` internally that re-runs the handler whenever its reactive dependencies change.

<demo src="./demo/render-event.vue" />

## Accessing PixiJS Instances

You can bind PixiJS instances through ref, It is like the HTML elements, so you can bind to it if you need to access it.

<demo src="./demo/refs.vue" />

## Using a Custom Instance

You can add custom PixiJS instances to the `renderer`, if you have a custom class (whether that be your own or from a third-party library).

```ts
// main.js
import { Text } from 'pixi.js'
import { patchProp as defPatchProp, renderer } from 'vue3-pixi'

class YellowText extends Text {
  constructor(options) {
    super(options)
    this.style.fill = 'yellow'
  }
}

renderer.use({
  name: 'YellowText',
  createElement: props => new YellowText({ text: props.text, style: props.style }),
  patchProp(el, key, prevValue, nextValue) {
    // handle special prop here..

    // or fallback to default
    return defPatchProp(el, key, prevValue, nextValue)
  },
})
```

<demo src="./demo/custom-instance.vue" :codesandbox="false" />
