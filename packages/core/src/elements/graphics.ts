import type { DefineContainerAttributes } from '../types'
import { Graphics, GraphicsOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type GraphicsAttributes = DefineContainerAttributes<Graphics, GraphicsOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Graphics: GraphicsAttributes
    PixiGraphics: GraphicsAttributes
  }
}

renderer.use({
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
})