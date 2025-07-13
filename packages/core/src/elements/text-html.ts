import type { DefineContainerAttributes } from '../types'
import { HTMLText, HTMLTextOptions } from 'pixi.js'
import { patchProp, renderer, setObjectProperty, setSkipFirstValue } from '../renderer'

export type HTMLTextAttributes = DefineContainerAttributes<HTMLText, HTMLTextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HTMLText: HTMLTextAttributes
    PixiHTMLText: HTMLTextAttributes
  }
}

renderer.use({
  name: 'HtmlText',
  createElement: props => new HTMLText({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: HTMLText, key, prev, next) {
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
