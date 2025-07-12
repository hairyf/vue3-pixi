import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { Graphics } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
})

export type GraphicsProps = ExtractContainerProps<Graphics>

export interface GraphicsEvents extends AllowedEvents {
  render: [Graphics]
}

export type GraphicsElement = DefineElement<GraphicsProps, GraphicsEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Graphics: GraphicsElement
    PixiGraphics: GraphicsElement
  }
}
