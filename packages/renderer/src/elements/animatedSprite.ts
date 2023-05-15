import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface AnimatedSpriteProps {
  textures: PIXI.Texture[]
  width?: number
  height?: number

  play?: boolean

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

  animationSpeed?: number
  autoUpdate?: number

  currentFrame?: number
  loop?: boolean

  updateAnchor?: boolean
}

type AnimatedSpriteEvents = PixiEvents & {
  complete: []
  frameChange: [number]
  'update:currentFrame': [number]
  loop: []
}

export type AnimatedSpriteComponent = DefineComponent<
  AnimatedSpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof AnimatedSpriteEvents)[],
  keyof AnimatedSpriteEvents,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<AnimatedSpriteProps> & {
    [key in keyof AnimatedSpriteEvents as `on${Capitalize<key>}`]?:
    | ((...args: AnimatedSpriteEvents[key]) => any)
    | undefined;
  },
  {}
>
