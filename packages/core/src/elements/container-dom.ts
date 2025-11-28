import type { DOMContainerOptions } from 'pixi.js'
import type { DefineContainerElement } from '../types'
import { DOMContainer } from 'pixi.js'
import { renderer } from '../renderer'

export type DOMContainerElement = DefineContainerElement<DOMContainer, DOMContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    DomContainer: DOMContainerElement
    PixiDomContainer: DOMContainerElement
  }
}

renderer.use({
  name: 'DomContainer',
  createElement: props => new DOMContainer(props.geometry),
})
