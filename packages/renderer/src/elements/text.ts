import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type * as PIXI from 'pixi.js'
import type { AllowedPixiProps } from './props'
import type { PixiEvents } from './events'

export interface TextProps {
  text?: string | number
  style?: PIXI.TextStyle | Partial<PIXI.ITextStyle>

  canvas?: PIXI.ICanvas
  context?: PIXI.ICanvasRenderingContext2D
  resolution?: number

  width?: number
}

type Events = PixiEvents & {}

export type TextComponent = DefineComponent<
TextProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedPixiProps & ComponentCustomProps,
  Readonly<TextProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
