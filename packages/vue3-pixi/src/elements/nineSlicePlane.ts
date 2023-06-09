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

export interface NineSliceEvents extends PixiEvents {
  render: [NineSliceInst]
}

export type NineSliceInst = PIXI.NineSlicePlane & EventTarget

export type NineSlicePlaneComponent = DefineComponent<
NineSlicePlaneProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof NineSliceEvents)[],
  keyof NineSliceEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<NineSlicePlaneProps> & {
    [key in keyof NineSliceEvents as `on${Capitalize<key>}`]?:
    | ((...args: NineSliceEvents[key]) => any)
    | undefined;
  },
  {}
>
