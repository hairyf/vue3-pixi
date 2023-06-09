import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

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

export interface SimpleRopeEvents extends PixiEvents {
  render: [SimpleRopeInst]
}

export type SimpleRopeInst = PIXI.SimpleRope & EventTarget

export type SimpleRopeComponent = DefineComponent<
SimpleRopeProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof SimpleRopeEvents)[],
  keyof SimpleRopeEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<SimpleRopeProps> & {
    [key in keyof SimpleRopeEvents as `on${Capitalize<key>}`]?:
    | ((...args: SimpleRopeEvents[key]) => any)
    | undefined;
  },
  {}
>
