import type { DefineContainerAttributes } from '../types'
import { RenderContainer, RenderContainerOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type RenderContainerAttributes = DefineContainerAttributes<RenderContainer, RenderContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RenderContainer: RenderContainerAttributes
    PixiRenderContainer: RenderContainerAttributes
  }
}

renderer.use({
  name: 'RenderContainer',
  createElement: props => new RenderContainer(props),
})