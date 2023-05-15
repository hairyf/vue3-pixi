import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'

export interface GraphicsProps {
  blendMode?: PIXI.BLEND_MODES
  pluginName?: string
  shader?: PIXI.Shader
  tint?: PIXI.ColorSource
  geometry?: PIXI.GraphicsGeometry
  isMask?: boolean
}

type Events = PixiEvents & {
  draw: [PIXI.Graphics]
}

export type GraphicsComponent = DefineComponent<
GraphicsProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<GraphicsProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
