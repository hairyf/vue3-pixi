import type { DefineContainerAttributes } from '../types'
import { BitmapTextGraphics, GraphicsOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type BitmapTextGraphicsAttributes = DefineContainerAttributes<BitmapTextGraphics, GraphicsOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BitmapTextGraphics: BitmapTextGraphicsAttributes
    PixiBitmapTextGraphics: BitmapTextGraphicsAttributes
  }
}

renderer.use({
  name: 'BitmapTextGraphics',
  createElement: props => new BitmapTextGraphics(props),
})