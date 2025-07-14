import type { RenderContainerOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { RenderContainer } from 'pixi.js'
import { renderer } from '../renderer'

export type RenderContainerElement = DefineContainerElement<RenderContainer, RenderContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RenderContainer: RenderContainerElement
    PixiRenderContainer: RenderContainerElement
  }
}

renderer.use({
  name: 'RenderContainer',
  createElement: props => new RenderContainer(props),
})
