import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

interface Props {
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

type Events = PixiEvents & {
  'update:dirty': [boolean]
}

export type PixiBitmapTextComponent = DefineComponent<
  Props,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<Props> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
