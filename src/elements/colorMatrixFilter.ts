import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { ColorMatrixFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

interface Props extends ExtractFilterProps<ColorMatrixFilter> {}

interface Events {}

export type PixiColorMatrixFilterComponent = DefineComponent<
  Props,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<Props> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
