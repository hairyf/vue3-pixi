import type { DefineAttributes, ExtractContainerProps, ExtractContainerEvents } from '../types'
import { Graphics } from 'pixi.js'
import { renderer } from '../renderer'

export type GraphicsProps = ExtractContainerProps<Graphics>

export type GraphicsEvents = ExtractContainerEvents<Graphics, { render: [Graphics] }>

export type GraphicsAttributes = DefineAttributes<GraphicsProps, { render: [Graphics] }>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Graphics: GraphicsAttributes
    PixiGraphics: GraphicsAttributes
  }
}

renderer.use({
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
})