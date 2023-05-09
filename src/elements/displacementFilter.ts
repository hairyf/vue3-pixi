import type {
  ComponentCustomProps,
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { DisplacementFilter, ISpriteMaskTarget } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

interface Props extends ExtractFilterProps<DisplacementFilter> {
  sprite: ISpriteMaskTarget
}

interface Events {}

export type PixiDisplacementFilterComponent = DefineComponent<
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
