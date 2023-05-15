import type { AllowedFilterProps, ExtractFilterProps } from './props'
import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { ColorMatrixFilter } from 'pixi.js'

export interface ColorMatrixFilterProps extends ExtractFilterProps<ColorMatrixFilter> {}

interface Events {}

export type ColorMatrixFilterComponent = DefineComponent<
ColorMatrixFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<ColorMatrixFilterProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
