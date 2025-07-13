import type { DefineContainerAttributes } from '../types'
import { PerspectiveMesh, PerspectivePlaneOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type PerspectiveMeshAttributes = DefineContainerAttributes<PerspectiveMesh, PerspectivePlaneOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PerspectiveMesh: PerspectiveMeshAttributes
    PixiPerspectiveMesh: PerspectiveMeshAttributes
  }
}

renderer.use({
  name: 'PerspectiveMesh',
  createElement: props => new PerspectiveMesh(props),
})