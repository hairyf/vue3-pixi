import type { BLEND_MODES, ColorSource, Geometry, Shader } from 'pixi.js'
import type { AllowedEvents, AllowedProps, DefineElement } from '../types'
import { Graphics } from 'pixi.js'
import { renderer } from '../renderer'

renderer.use({
  name: 'Graphics',
  createElement: props => new Graphics(props.geometry),
})

export interface GraphicsProps extends AllowedProps {
  blendMode?: BLEND_MODES
  pluginName?: string
  shader?: Shader
  tint?: ColorSource
  geometry?: Geometry
  isMask?: boolean
}

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
