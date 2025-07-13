import type { DefineContainerElement } from '../types'
import { PerspectiveMesh, PerspectivePlaneOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type PerspectiveMeshElement = DefineContainerElement<PerspectiveMesh, PerspectivePlaneOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PerspectiveMesh: PerspectiveMeshElement
    PixiPerspectiveMesh: PerspectiveMeshElement
  }
}

renderer.use({
  name: 'PerspectiveMesh',
  createElement: props => new PerspectiveMesh(props),
})