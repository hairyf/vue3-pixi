# Renderer

vue3-pixi uses a custom Vue renderer to map tags to PixiJS instances.

The following PixiJS objects are supported out of the box:

- [Container](https://pixijs.download/release/docs/scene.Container.html)
- [Sprite](https://pixijs.download/release/docs/scene.Sprite.html)
- [Graphics](https://pixijs.download/release/docs/scene.Graphics.html)
- [Text](https://pixijs.download/release/docs/scene.Text.html)
- [BitmapText](https://pixijs.download/release/docs/scene.BitmapText.html)
- [AnimatedSprite](https://pixijs.download/release/docs/scene.AnimatedSprite.html)
- [Mesh](https://pixijs.download/release/docs/scene.Mesh.html)
- [MeshPlane](https://pixijs.download/release/docs/scene.MeshPlane.html)
- [MeshSimple](https://pixijs.download/release/docs/scene.MeshSimple.html)
- [MeshRope](https://pixijs.download/release/docs/scene.MeshRope.html)
- [TilingSprite](https://pixijs.download/release/docs/scene.TilingSprite.html)
- [NineSliceSprite](https://pixijs.download/release/docs/scene.NineSliceSprite.html)
- [ParticleContainer](https://pixijs.download/release/docs/scene.ParticleContainer.html)
- [RenderLayer](https://pixijs.download/release/docs/scene.RenderLayer.html)
- [GraphicsContext](https://pixijs.download/release/docs/scene.GraphicsContext.html)
- [BlurFilter](https://pixijs.download/release/docs/filters.BlurFilter.html)
- [AlphaFilter](https://pixijs.download/release/docs/filters.AlphaFilter.html)
- [DisplacementFilter](https://pixijs.download/release/docs/filters.DisplacementFilter.html)
- [ColorMatrixFilter](https://pixijs.download/release/docs/filters.ColorMatrixFilter.html)
- [NoiseFilter](https://pixijs.download/release/docs/filters.NoiseFilter.html)

## Namespaces

To avoid conflicts with other tags, such as `<filter>`, you can use the `pixi-` prefix or capitalize the first letter with `<Filter>`.

```html
<Filter />
<!-- or -->
<pixi-filter />
```

All elements (including custom elements) can use the `pixi-` prefix or capitalize the first letter to avoid conflicts with other tags.

## Using a Custom Element

You can add custom PixiJS instances to the `renderer` if you have a custom class (your own or from a third-party library).

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

> If you override any of these hooks, the default behavior for that hook is replaced entirely.

To suppress Vue warnings for the custom element tag, update the plugin configuration:

```ts
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { isCustomElement, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // support for custom elements and remove the unknown element warnings
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag === 'yellow-text' || isCustomElement(tag)
          }
        },
      },
    }),
  ],
})
```

## TypeScript

If you are using TypeScript, you can add types to custom elements by declaring `GlobalComponents` from the `@vue/runtime-core` module.

```ts
import type { TextProps } from 'vue3-pixi'

interface YellowTextProps extends TextProps {
  text: string
  style: TextStyle
  // ...
}

interface YellowTextComponent {
  (props: YellowTextProps): any
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    YellowText: YellowTextComponent
    PixiYellowText: YellowTextComponent
  }
}
```
