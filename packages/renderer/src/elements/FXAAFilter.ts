import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { FXAAFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface FXAAFilterProps extends ExtractFilterProps<FXAAFilter> {}

export interface FXAAFilterEvents {
  render: [FXAAFilterInst]
}

export type FXAAFilterInst = FXAAFilter

export type FXAAFilterComponent = DefineComponent<
FXAAFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof FXAAFilterEvents)[],
  keyof FXAAFilterEvents,
  VNodeProps & AllowedFilterProps,
  Readonly<FXAAFilterProps> & {
    [key in keyof FXAAFilterEvents as `on${Capitalize<key>}`]?:
    | ((...args: FXAAFilterEvents[key]) => any)
    | undefined;
  },
  {}
>
