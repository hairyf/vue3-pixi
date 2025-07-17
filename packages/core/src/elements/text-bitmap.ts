import type { TextOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { BitmapText } from 'pixi.js'
import { patchProp, renderer, setters } from '../renderer'

export type BitmapTextElement = DefineContainerElement<BitmapText, TextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BitmapText: BitmapTextElement
    PixiBitmapText: BitmapTextElement
  }
}

renderer.use({
  name: 'BitmapText',
  createElement: props => new BitmapText(props),
  patchProp(el: BitmapText, key, prev, next) {
    switch (key) {
      case 'text':
        setters.unfirst(el, key, () => el.text = next)
        break
      case 'style':
        break
      case 'sortDirty':
      case 'roundPixels':
        setters.boolean(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})
