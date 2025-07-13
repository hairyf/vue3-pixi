import type { DefineContainerAttributes } from '../types'
import { SplitText, SplitTextOptions } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

export type SplitTextAttributes = DefineContainerAttributes<SplitText, SplitTextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SplitText: SplitTextAttributes
    PixiSplitText: SplitTextAttributes
  }
}

renderer.use({
  name: 'SplitText',
  createElement: props => new SplitText(props),
  patchProp(el: SplitText, key, prev, next) {
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