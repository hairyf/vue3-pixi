import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface GraphicsProps {
  blendMode?: PIXI.BLEND_MODES
  pluginName?: string
  shader?: PIXI.Shader
  tint?: PIXI.ColorSource
  geometry?: PIXI.GraphicsGeometry
  isMask?: boolean
}

export interface GraphicsEvents extends PixiEvents {
  render: [GraphicsInst]
}

export type GraphicsInst = PIXI.Graphics & EventTarget

export type GraphicsComponent = DefineComponent<
GraphicsProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof GraphicsEvents)[],
  keyof GraphicsEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<GraphicsProps> & {
    [key in keyof GraphicsEvents as `on${Capitalize<key>}`]?:
    | ((...args: GraphicsEvents[key]) => any)
    | undefined;
  },
  {}
>
