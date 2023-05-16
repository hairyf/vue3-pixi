import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'
export interface SpriteProps {
  texture: string | PIXI.Texture
  textureOptions?: PIXI.IBaseTextureOptions

  blendMode?: PIXI.BLEND_MODES

  width?: number
  height?: number

  pluginName?: string

  tint?: PIXI.ColorSource
}

type Events = PixiEvents

export type SpriteComponent = DefineComponent<
  SpriteProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<SpriteProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
