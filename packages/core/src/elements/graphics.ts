import type { DefineContainerElement } from '../types'
import { Graphics, GraphicsOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type GraphicsElement = DefineContainerElement<Graphics, GraphicsOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Graphics: GraphicsElement
    PixiGraphics: GraphicsElement
  }
}

renderer.use({
  name: 'Graphics',
  createElement: props => new Graphics(props),
})