import type { AllowedEvents, DefineElement } from '../types'
import { Container } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({ name: 'Container', createElement: () => new Container() })


export interface ContainerEvents extends AllowedEvents {
  render: [Container]
}

export type ContainerElement = DefineElement<{}, ContainerEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Container: ContainerElement
    PixiContainer: ContainerElement
  }
}
