import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { BlurFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

interface Props extends ExtractFilterProps<BlurFilter> {
  strength?: number
  resolution?: number
  kernelSize?: number
}

interface Events {}

export type PixiBlurFilterComponent = DefineComponent<
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
