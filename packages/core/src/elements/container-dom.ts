import type { DefineContainerAttributes } from '../types'
import { DOMContainer, DOMContainerOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type DOMContainerAttributes = DefineContainerAttributes<DOMContainer, DOMContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DomContainer: DOMContainerAttributes
    PixiDomContainer: DOMContainerAttributes
  }
}

renderer.use({
  name: 'DomContainer',
  createElement: props => new DOMContainer(props.geometry),
})