import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { BitmapText } from 'pixi.js'
import { patchProp, renderer, setSkipFirstValue } from '../renderer'
import { patchBooleanProp } from '../renderer/patchProp'

export type BitmapTextProps = ExtractContainerProps<BitmapText>

export type BitmapTextEvents = ExtractContainerEvents<BitmapText, { render: [BitmapText] }>

export type BitmapTextAttributes = DefineAttributes<BitmapTextProps, BitmapTextEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BitmapText: BitmapTextAttributes
    PixiBitmapText: BitmapTextAttributes
  }
}

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