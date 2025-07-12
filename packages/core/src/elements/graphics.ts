import type * as PIXI from 'pixi.js'
import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { PixiEvents } from './events'
import type { AllowedPixiProps } from './props'

export interface GraphicsProps {
  blendMode?: PIXI.BLEND_MODES
  geometry?: PIXI.GraphicsOptions | PIXI.GraphicsContext
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
