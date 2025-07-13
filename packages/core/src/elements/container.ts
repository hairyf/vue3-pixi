import type { DefineContainerAttributes } from '../types'
import { Container, ContainerOptions } from 'pixi.js'
import { renderer } from '../renderer'

export type ContainerAttributes = DefineContainerAttributes<Container, ContainerOptions>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerAttributes
    PixiContainer: ContainerAttributes
  }
}

renderer.use({ name: 'Container', createElement: () => new Container() })
