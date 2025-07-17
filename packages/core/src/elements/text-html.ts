import type { HTMLTextOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { HTMLText } from 'pixi.js'
import { patchProp, renderer, setters } from '../renderer'

export type HTMLTextElement = DefineContainerElement<HTMLText, HTMLTextOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HTMLText: HTMLTextElement
    PixiHTMLText: HTMLTextElement
  }
}

renderer.use({
  name: 'HtmlText',
  createElement: props => new HTMLText(props),
  patchProp(el: HTMLText, key, prev, next) {
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
