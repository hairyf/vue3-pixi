import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface NineSlicePlaneProps {
  texture: PIXI.Texture | string
  leftWidth?: number
  rightWidth?: number
  topHeight?: number
  bottomHeight?: number
  verticesX?: number
  verticesY?: number

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

  autoResize?: boolean
}

type Events = PixiEvents

export type NineSlicePlaneComponent = DefineComponent<
NineSlicePlaneProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps,
  Readonly<NineSlicePlaneProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
