import type { DefineAttributes, ExtractContainerEvents } from '../types'
import { Container } from 'pixi.js'
import { renderer } from '../renderer'

export type ContainerEvents = ExtractContainerEvents<{ render: [Container] }>

export type ContainerAttributes = DefineAttributes<{}, ContainerEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerAttributes
    PixiContainer: ContainerAttributes
  }
}

renderer.use({ name: 'Container', createElement: () => new Container() })
