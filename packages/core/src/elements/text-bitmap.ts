import type { ICanvasRenderingContext2D, TextStyle } from 'pixi.js'
import type { AllowedEvents, AllowedProps, DefineElement } from '../types'
import { BitmapText } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

renderer.use({
  name: 'BitmapText',
  createElement: props => new BitmapText({
    text: props.text,
    style: props.style,
  }),
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

export interface BitmapTextProps extends AllowedProps {
  text?: string | number
  style?: TextStyle | Partial<TextStyle>

  context?: ICanvasRenderingContext2D

  width?: number
}

export interface BitmapTextEvents extends AllowedEvents {
  render: [BitmapText]
}

export type BitmapTextElement = DefineElement<BitmapTextProps, BitmapTextEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BitmapText: BitmapTextElement
    PixiBitmapText: BitmapTextElement
  }
}
