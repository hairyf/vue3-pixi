import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface TilingSpriteProps {
  texture: string | PIXI.Texture
  textureOptions?: PIXI.IBaseTextureOptions
  width?: number
  height?: number

  anchor?: PIXI.IPointData | number
  anchorX?: number
  anchorY?: number

  blendMode?: PIXI.BLEND_MODES

  pluginName?: string

  tint?: PIXI.ColorSource

  clampMargin?: number

  tilePosition?: Partial<PIXI.IPointData> | number | [number, number]
  tilePositionX?: number
  tilePositionY?: number

  tileScale?: Partial<PIXI.IPointData> | number | [number, number]
  tileScaleX?: number
  tileScaleY?: number

  tileTransform?: PIXI.Transform

  uvMatrix?: PIXI.TextureMatrix
  uvRespectAnchor?: boolean
}

export interface TilingSpriteEvents extends PixiEvents {
  render: [TilingSpriteInst]
}

export type TilingSpriteInst = PIXI.TilingSprite & EventTarget

export type TilingSpriteComponent = DefineComponent<
  TilingSpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof TilingSpriteEvents)[],
  keyof TilingSpriteEvents,
  VNodeProps & AllowedPixiProps,
  Readonly<TilingSpriteProps> & {
    [key in keyof TilingSpriteEvents as `on${Capitalize<key>}`]?:
    | ((...args: TilingSpriteEvents[key]) => any)
    | undefined;
  },
  {}
>
