import type { SplitTextOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { SplitText } from 'pixi.js'
import { patchProp, renderer, setters } from '../renderer'

export type SplitTextElement = DefineContainerElement<SplitText, SplitTextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SplitText: SplitTextElement
    PixiSplitText: SplitTextElement
  }
}

renderer.use({
  name: 'SplitText',
  createElement: props => new SplitText(props),
  patchProp(el: SplitText, key, prev, next) {
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
