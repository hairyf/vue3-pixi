import type { AllowedContainerProps, DefinePIXIAttributes, ExtractContainerEvents } from '../types'
import { Container } from 'pixi.js'
import { renderer } from '../renderer'

export type ContainerAttributes = DefinePIXIAttributes<AllowedContainerProps, ExtractContainerEvents<Container>>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerAttributes
    PixiContainer: ContainerAttributes
  }
}

renderer.use({ name: 'Container', createElement: () => new Container() })
