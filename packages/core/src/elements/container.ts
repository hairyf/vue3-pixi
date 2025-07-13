import type { AllowedContainerProps, DefineAttributes, ExtractContainerEvents } from '../types'
import { Container } from 'pixi.js'
import { renderer } from '../renderer'

export type ContainerEvents = ExtractContainerEvents<Container>

export type ContainerAttributes = DefineAttributes<AllowedContainerProps, ContainerEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerAttributes
    PixiContainer: ContainerAttributes
  }
}

renderer.use({ name: 'Container', createElement: () => new Container() })
