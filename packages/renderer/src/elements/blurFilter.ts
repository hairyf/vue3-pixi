import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { BlurFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface BlurFilterProps extends ExtractFilterProps<BlurFilter> {
  strength?: number
  resolution?: number
  kernelSize?: number
}

interface Events {}

export type BlurFilterComponent = DefineComponent<
BlurFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<BlurFilterProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
