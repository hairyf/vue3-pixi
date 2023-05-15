import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'

export interface MeshProps {
  geometry: PIXI.Geometry
  shader: PIXI.Shader | PIXI.MeshMaterial
  blendMode?: PIXI.BLEND_MODES
  drawMode?: PIXI.DRAW_MODES
  material?: PIXI.Shader
  roundPixels?: boolean
  size?: number
  start?: number
  state?: PIXI.State
  texture?: string | PIXI.Texture
  tint?: PIXI.ColorSource
  canvasPadding?: number
}

type Events = PixiEvents

export type MeshComponent = DefineComponent<
MeshProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<MeshProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
