import type { DefineContainerElement } from '../types'
import { Graphics, GraphicsContext } from 'pixi.js'
import { renderer } from '../renderer'

export type GraphicsContextElement = DefineContainerElement<Graphics>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    GraphicsContext: GraphicsContextElement
    PixiGraphicsContext: GraphicsContextElement
  }
}

renderer.use({
  name: 'GraphicsContext',
  createElement: () => {
    const context = new GraphicsContext()
    return new Graphics(context)
  },
})
