import type { DefineContainerAttributes } from '../types'
import { Text, TextOptions } from 'pixi.js'
import { patchProp, renderer, setObjectProperty, setSkipFirstValue } from '../renderer'

export type TextAttributes = DefineContainerAttributes<Text, TextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Text: TextAttributes
    PixiText: TextAttributes
  }
}

renderer.use({
  name: 'Text',
  createElement: props => new Text({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: Text, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        setSkipFirstValue(el, key, () => setObjectProperty(el, key, prev, next))
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})
