import type { DefineContainerElement } from '../types'
import { RenderLayer } from 'pixi.js'
import { renderer } from '../renderer'

export type RenderLayerElement = DefineContainerElement<RenderLayer>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RenderLayer: RenderLayerElement
    PixiRenderLayer: RenderLayerElement
  }
}

renderer.use({
  name: 'RenderLayer',
  createElement: () => new RenderLayer(),
})
