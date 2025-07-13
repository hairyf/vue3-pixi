import type { DefineContainerAttributes } from '../types'
import { SplitBitmapText, SplitBitmapTextOptions } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

export type SplitBitmapTextAttributes = DefineContainerAttributes<SplitBitmapText, SplitBitmapTextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SplitBitmapText: SplitBitmapTextAttributes
    PixiSplitBitmapText: SplitBitmapTextAttributes
  }
}

renderer.use({
  name: 'SplitBitmapText',
  createElement: props => new SplitBitmapText(props),
  patchProp(el: SplitBitmapText, key, prev, next) {
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