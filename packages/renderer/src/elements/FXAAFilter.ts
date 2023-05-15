import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { FXAAFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface FXAAFilterProps extends ExtractFilterProps<FXAAFilter> {}

interface Events {}

export type FXAAFilterComponent = DefineComponent<
FXAAFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<FXAAFilterProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
