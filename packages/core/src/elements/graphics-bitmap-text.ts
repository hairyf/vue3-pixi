import type { GraphicsOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { BitmapTextGraphics } from 'pixi.js'
import { renderer } from '../renderer'

export type BitmapTextGraphicsElement = DefineContainerElement<BitmapTextGraphics, GraphicsOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BitmapTextGraphics: BitmapTextGraphicsElement
    PixiBitmapTextGraphics: BitmapTextGraphicsElement
  }
}

renderer.use({
  name: 'BitmapTextGraphics',
  createElement: props => new BitmapTextGraphics(props),
})
