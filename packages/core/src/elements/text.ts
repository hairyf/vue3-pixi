import type { DefineContainerElement } from '../types'
import { Text, TextOptions } from 'pixi.js'
import { patchProp, renderer, setters } from '../renderer'

export type TextElement = DefineContainerElement<Text, TextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Text: TextElement
    PixiText: TextElement
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
        setters.unfirst(el, key, () => el.text = next)
        break
      case 'style':
        setters.unfirst(el, key, () => setters.object(el, key, prev, next))
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})
