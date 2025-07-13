import type { DefineContainerElement } from '../types'
import { BitmapText, TextOptions } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

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
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        break
      case 'sortDirty':
      case 'roundPixels':
        patchBooleanProp(el, key, prev, next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})