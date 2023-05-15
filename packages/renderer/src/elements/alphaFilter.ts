import type { AllowedFilterProps, ExtractFilterProps } from './props'
import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AlphaFilter } from 'pixi.js'

export interface AlphaFilterProps extends ExtractFilterProps<AlphaFilter> {

}

interface Events {}

export type AlphaFilterComponent = DefineComponent<
AlphaFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<AlphaFilterProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
