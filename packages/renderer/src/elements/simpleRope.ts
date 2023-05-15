import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'

export interface SimpleRopeProps {
  texture: string | PIXI.Texture
  points: PIXI.IPoint[]
  textureScale?: number
  autoUpdate?: number
  shader?: PIXI.Shader | PIXI.MeshMaterial
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.DRAW_MODES
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State
  tint?: PIXI.ColorSource
  canvasPadding?: number
}

type Events = PixiEvents

export type SimpleRopeComponent = DefineComponent<
SimpleRopeProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<SimpleRopeProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
