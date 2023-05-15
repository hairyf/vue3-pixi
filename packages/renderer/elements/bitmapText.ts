import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface BitmapTextProps {
  text?: string | number
  style?: Partial<PIXI.IBitmapTextStyle>

  align?: string

  anchor?: PIXI.IPointData | number
  anchorX?: number
  anchorY?: number

  dirty?: boolean

  fontName?: string
  fontSize?: number
  letterSpacing?: number
  maxWidth?: number
  resolution?: number
  roundPixels?: boolean

  tint?: PIXI.ColorSource
}

export type BitmapTextEvents = PixiEvents & {
  'update:dirty': [boolean]
}

export type BitmapTextComponent = DefineComponent<
BitmapTextProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof BitmapTextEvents)[],
  keyof BitmapTextEvents,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<BitmapTextProps> & {
    [key in keyof BitmapTextEvents as `on${Capitalize<key>}`]?:
    | ((...args: BitmapTextEvents[key]) => any)
    | undefined;
  },
  {}
>
