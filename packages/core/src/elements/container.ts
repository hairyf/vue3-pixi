import type { AllowedContainerProps, DefineElement, ExtractContainerEvents } from '../types'
import { Container } from 'pixi.js'
import { renderer } from '../renderer'

export type ContainerElement = DefineElement<AllowedContainerProps, ExtractContainerEvents<Container>>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerElement
    PixiContainer: ContainerElement
  }
}

renderer.use({ name: 'Container', createElement: () => new Container() })
