import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { ColorMatrixFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface ColorMatrixFilterProps extends ExtractFilterProps<ColorMatrixFilter> {}

export interface ColorMatrixFilterEvents {
  render: [ColorMatrixFilterInst]
}

export type ColorMatrixFilterInst = ColorMatrixFilter

export type ColorMatrixFilterComponent = DefineComponent<
ColorMatrixFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof ColorMatrixFilterEvents)[],
  keyof ColorMatrixFilterEvents,
  VNodeProps & AllowedFilterProps,
  Readonly<ColorMatrixFilterProps> & {
    [key in keyof ColorMatrixFilterEvents as `on${Capitalize<key>}`]?:
    | ((...args: ColorMatrixFilterEvents[key]) => any)
    | undefined;
  },
  {}
>
