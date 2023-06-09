import type {
  ComponentOptionsMixin,
  DefineComponent,
  VNodeProps,
} from 'vue-demi'
import type { AlphaFilter } from 'pixi.js'
import type { AllowedFilterProps, ExtractFilterProps } from './props'

export interface AlphaFilterProps extends ExtractFilterProps<AlphaFilter> {

}

export interface AlphaFilterEvents {
  render: [AlphaFilterInst]
}

export type AlphaFilterInst = AlphaFilter

export type AlphaFilterComponent = DefineComponent<
AlphaFilterProps,
  {},
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  (keyof AlphaFilterEvents)[],
  keyof AlphaFilterEvents,
  VNodeProps & AllowedFilterProps,
  Readonly<AlphaFilterProps> & {
    [key in keyof AlphaFilterEvents as `on${Capitalize<key>}`]?:
    | ((...args: AlphaFilterEvents[key]) => any)
    | undefined;
  },
  {}
>
