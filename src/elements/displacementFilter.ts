import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { DisplacementFilter, ISpriteMaskTarget } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface DisplacementFilterProps extends ExtractFilterProps<DisplacementFilter> {
  sprite: ISpriteMaskTarget
}

interface Events {}

export type DisplacementFilterComponent = DefineComponent<
DisplacementFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof Events)[],
  keyof Events,
  VNodeProps & AllowedFilterProps & ComponentCustomProps,
  Readonly<DisplacementFilterProps> & {
    [key in keyof Events as `on${Capitalize<key>}`]?:
    | ((...args: Events[key]) => any)
    | undefined;
  },
  {}
>
